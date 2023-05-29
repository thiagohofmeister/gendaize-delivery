import { NextFunction, Response } from 'express'

import { BaseController } from '../Shared/Controllers/BaseController'
import { ResponseTypeEnum } from '../Shared/Enums/ResponseTypeEnum'
import { Factory } from '../Shared/Factories/Factory'
import { CoreRequest } from '../Shared/Models/Request/CoreRequest'
import { ProductTypeFacade } from './ProductTypeFacade'

export class ProductTypeController extends BaseController {
  constructor() {
    super()
    this.create = this.create.bind(this)
  }

  async create(request: CoreRequest, response: Response, next: NextFunction) {
    return this.responseHandler(
      response,
      next,
      this.getFacade(request).create(request.context.organization, request.body),
      ResponseTypeEnum.OK
    )
  }

  protected getFacade(request: CoreRequest): ProductTypeFacade {
    return Factory.getInstance()
      .buildFacadeFactory(request.context?.organizationId)
      .buildProductTypeFacade()
  }
}
