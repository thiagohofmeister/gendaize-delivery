import * as fs from 'fs'
import * as path from 'path'

export abstract class Database {
  protected getEntities() {
    const rootDir = path.join(__dirname, '..')
    const entities = []

    const domainsPath = fs
      .readdirSync(rootDir, { withFileTypes: true })
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name)

    domainsPath.forEach(domainName => {
      const domainPath = path.join(rootDir, domainName, 'Models')

      if (!fs.existsSync(domainPath)) {
        return
      }

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

      if (!fs.existsSync(files['dao'])) {
        return
      }

      entities.push(files['dao'])
    })

    return entities
  }
}
