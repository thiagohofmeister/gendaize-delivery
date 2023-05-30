import { NextFunction, Response } from 'express'

import { BaseController } from '../Base/BaseController'
import { ResponseTypeEnum } from '../Base/Enums/ResponseTypeEnum'
import { CoreRequest } from '../Shared/Models/Request/CoreRequest'

export class ProductTypeController extends BaseController {
  constructor() {
    super()
    this.create = this.create.bind(this)
  }

  async create(request: CoreRequest, response: Response, next: NextFunction) {
    return this.responseHandler(
      response,
      next,
      (await this.getServiceFactory(request))
        .buildProductTypeService()
        .create(request.context.organization, request.body),
      ResponseTypeEnum.OK
    )
  }
}
