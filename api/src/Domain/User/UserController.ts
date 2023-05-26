import { NextFunction, Response } from 'express'

import { BaseController } from '../../Shared/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Shared/Enums/ResponseTypeEnum'
import { Factory } from '../../Shared/Factories/Factory'
import { CoreRequest } from '../../Shared/Models/Request/CoreRequest'
import { UserFacade } from './UserFacade'
import { UserView } from './Views/UserView'

export class UserController extends BaseController {
  constructor() {
    super()
    this.getLogged = this.getLogged.bind(this)
  }

  async getLogged(request: CoreRequest, response: Response, next: NextFunction) {
    return this.responseHandler(
      response,
      next,
      this.getFacade(request).getById(request.context?.user?.id),
      ResponseTypeEnum.OK
    )
  }

  protected getView() {
    return new UserView()
  }

  protected getFacade(request: CoreRequest): UserFacade {
    return Factory.getInstance().buildFacadeFactory(request.context?.storeId).buildUserFacade()
  }
}
