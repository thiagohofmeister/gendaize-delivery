import { NextFunction, Response } from 'express'

import { BaseController } from '../Shared/Controllers/BaseController'
import { ResponseTypeEnum } from '../Shared/Enums/ResponseTypeEnum'
import { Factory } from '../Shared/Factories/Factory'
import { CoreRequest } from '../Shared/Models/Request/CoreRequest'

export class RegisterController extends BaseController {
  constructor() {
    super()
    this.post = this.post.bind(this)
  }

  public async post(req: CoreRequest, res: Response, next: NextFunction) {
    await this.responseHandler(
      res,
      next,
      this.getFacade(req).create(req.body),
      ResponseTypeEnum.CREATED
    )
  }

  protected getFacade(req: CoreRequest) {
    return Factory.getInstance()
      .buildFacadeFactory(req.context?.organizationId)
      .buildRegisterFacade()
  }
}
