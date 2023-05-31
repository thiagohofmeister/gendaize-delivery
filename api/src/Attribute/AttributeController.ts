import { NextFunction, Response } from 'express'

import { BaseController } from '../Base/BaseController'
import { ResponseTypeEnum } from '../Base/Enums/ResponseTypeEnum'
import { CoreRequest } from '../Shared/Models/Request/CoreRequest'

export class AttributeController extends BaseController {
  constructor() {
    super()
    this.post = this.post.bind(this)
    this.get = this.get.bind(this)
    this.getOne = this.getOne.bind(this)
    this.delete = this.delete.bind(this)
  }

  async post(request: CoreRequest, response: Response, next: NextFunction) {
    return this.responseHandler(
      response,
      next,
      (await this.getServiceFactory(request))
        .buildAttributeService()
        .create(request.context.organization, request.body),
      ResponseTypeEnum.OK
    )
  }

  async get(request: CoreRequest, response: Response, next: NextFunction) {
    return this.responseHandler(
      response,
      next,
      (await this.getServiceFactory(request)).buildAttributeService().get(request.query),
      ResponseTypeEnum.OK
    )
  }

  async getOne(request: CoreRequest, response: Response, next: NextFunction) {
    return this.responseHandler(
      response,
      next,
      (await this.getServiceFactory(request)).buildAttributeService().getById(request.params.id),
      ResponseTypeEnum.OK
    )
  }

  async delete(
    request: CoreRequest,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    return this.responseHandler(
      response,
      next,
      (await this.getServiceFactory(request)).buildAttributeService().delete(request.params.id),
      ResponseTypeEnum.NO_CONTENT
    )
  }
}