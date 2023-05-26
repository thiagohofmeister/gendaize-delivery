import { NextFunction, Response } from 'express'

import { BaseController } from '../../Shared/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Shared/Enums/ResponseTypeEnum'
import { Factory } from '../../Shared/Factories/Factory'
import { UnauthorizedException } from '../../Shared/Models/Exceptions/UnauthorizedException'
import { CoreRequest } from '../../Shared/Models/Request/CoreRequest'
import { AuthenticationView } from './Views/AuthenticationView'

export class AuthenticationController extends BaseController {
  constructor() {
    super()
    this.post = this.post.bind(this)
  }

  post(req: CoreRequest, res: Response, next: NextFunction) {
    const [tokenType, tokenBase64] = req.header('authorization')?.split(' ') || []

    if (tokenType !== 'Basic') {
      next(new UnauthorizedException())
    }

    const [login, password] = Buffer.from(tokenBase64, 'base64').toString().split(':')

    if (!login || !password) {
      next(new UnauthorizedException())
    }

    return this.responseHandler(
      res,
      next,
      this.getFacade(req).create({ device: 'device', isCustomer: false, login, password }),
      ResponseTypeEnum.CREATED
    )
  }

  protected getView() {
    return new AuthenticationView()
  }

  protected getFacade(req: CoreRequest) {
    return Factory.getInstance()
      .buildFacadeFactory(req.context?.storeId)
      .buildAuthenticationFacade()
  }
}
