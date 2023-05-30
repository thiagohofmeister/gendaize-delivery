import { Router } from 'express'
import * as fs from 'fs'
import * as path from 'path'

import { AuthMiddleware } from '../../Authentication/Middlewares/AuthMiddleware'
import { BaseAuthRoute } from '../../Base/BaseAuthRoute'
import { BaseRoute } from '../../Base/BaseRoute'

export class RoutesHandler {
  private authRoutes: BaseAuthRoute<any>[]
  private noAuthRoutes: BaseRoute<any>[]

  constructor() {
    this.initializeRoutes = this.initializeRoutes.bind(this)
    this.getAuthMiddlewares = this.getAuthMiddlewares.bind(this)
    this.getDefaultMiddlewares = this.getDefaultMiddlewares.bind(this)
    this.getRouter = this.getRouter.bind(this)

    this.authRoutes = []
    this.noAuthRoutes = []

    this.initializeRoutes()
  }

  private initializeRoutes() {
    const rootDir = path.join(__dirname, '..', '..')

    const domainsPath = fs
      .readdirSync(rootDir, { withFileTypes: true })
      .filter(dir => dir.isDirectory() && dir.name !== 'Shared')
      .map(dir => dir.name)

    domainsPath.forEach(domainName => {
      const domainPath = path.join(rootDir, domainName)

      const files = fs
        .readdirSync(domainPath, { withFileTypes: true })
        .filter(file => !file.isDirectory())
        .map(file => file.name)
        .reduce((prev, curr) => {
          const slices = curr.split(/(?=[A-Z\.])/)
          const type = slices[slices.length - 2]

          prev = {
            ...prev,
            [type.toLocaleLowerCase()]: path.join(domainPath, slices.join(''))
          }

          return prev
        }, {})

      if (!fs.existsSync(files['controller']) || !fs.existsSync(files['routes'])) {
        return
      }

      const Route = require(files['routes'])[`${domainName}Routes`]

      const Controller = require(files['controller'])[`${domainName}Controller`]

      const route = new Route(new Controller())

      if (route instanceof BaseAuthRoute) {
        this.authRoutes.push(route)
        return
      }

      this.noAuthRoutes.push(route)
    })
  }

  private getAuthMiddlewares() {
    return [new AuthMiddleware().forAll]
  }

  private getDefaultMiddlewares() {
    return []
  }

  public getRouter() {
    const router = Router()

    this.getDefaultMiddlewares().forEach(middleware => router.use(middleware))

    for (let i = 0; i < this.noAuthRoutes.length; i++) {
      const route = this.noAuthRoutes[i]
      const routes = route.getRoutes()

      for (let j = 0; j < routes.length; j++) {
        const route = routes[j]
        router[route.getMethod()](route.getPath(), route.getHandle())
      }
    }

    this.getAuthMiddlewares().forEach(middleware => router.use(middleware))

    for (let i = 0; i < this.authRoutes.length; i++) {
      const route = this.authRoutes[i]
      const routes = route.getRoutes()

      for (let j = 0; j < routes.length; j++) {
        const route = routes[j]
        router[route.getMethod()](route.getPath(), route.getHandle())
      }
    }

    return router
  }
}
