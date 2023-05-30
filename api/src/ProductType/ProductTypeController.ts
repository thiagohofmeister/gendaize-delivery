import { NextFunction, Response } from 'express'

import { BaseController } from '../Base/BaseController'
import { ResponseTypeEnum } from '../Base/Enums/ResponseTypeEnum'
import { CoreRequest } from '../Shared/Models/Request/CoreRequest'

export class ProductTypeController extends BaseController {
  constructor() {
    super()
    this.post = this.post.bind(this)
    this.get = this.get.bind(this)
    this.getOne = this.getOne.bind(this)
  }

  async post(request: CoreRequest, response: Response, next: NextFunction) {
    return this.responseHandler(
      response,
      next,
      (await this.getServiceFactory(request))
        .buildProductTypeService()
        .create(request.context.organization, request.body),
      ResponseTypeEnum.OK
    )
  }

  async get(request: CoreRequest, response: Response, next: NextFunction) {
    return this.responseHandler(
      response,
      next,
      (await this.getServiceFactory(request)).buildProductTypeService().get(request.query),
      ResponseTypeEnum.OK
    )
  }

  async getOne(request: CoreRequest, response: Response, next: NextFunction) {
    return this.responseHandler(
      response,
      next,
      (await this.getServiceFactory(request)).buildProductTypeService().getById(request.params.id),
      ResponseTypeEnum.OK
    )
  }
}
