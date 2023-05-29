import { RouteDto } from '../Shared/Dto/RouteDto'
import { AuthRouteContract } from '../Shared/Routes/Contracts/AuthRouteContract'
import { MethodEnum } from '../Shared/Routes/Enums/MethodEnum'
import { UserController } from './UserController'

export class UserRoutes extends AuthRouteContract<UserController> {
  getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [new RouteDto(this.getFullEndpoint('/me'), MethodEnum.GET, controller.getLogged)]
  }
}
