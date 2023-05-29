import { RouteDto } from '../Shared/Dto/RouteDto'
import { HttpMethodEnum } from '../Shared/Enums/HttpMethodEnum'
import { RouteContract } from '../Shared/Routes/Contracts/RouteContract'
import { AuthenticationController } from './AuthenticationController'

export class AuthenticationRoutes extends RouteContract<AuthenticationController> {
  getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [new RouteDto(this.getFullEndpoint(), HttpMethodEnum.POST, controller.post)]
  }
}
