import { RouteDto } from '../Shared/Dto/RouteDto'
import { RouteContract } from '../Shared/Routes/Contracts/RouteContract'
import { MethodEnum } from '../Shared/Routes/Enums/MethodEnum'
import { AuthenticationController } from './AuthenticationController'

export class AuthenticationRoutes extends RouteContract<AuthenticationController> {
  getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post)]
  }
}
