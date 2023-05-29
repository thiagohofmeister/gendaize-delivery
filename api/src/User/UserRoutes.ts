import { RouteDto } from '../Shared/Dto/RouteDto'
import { HttpMethodEnum } from '../Shared/Enums/HttpMethodEnum'
import { AuthRouteContract } from '../Shared/Routes/Contracts/AuthRouteContract'
import { UserController } from './UserController'

export class UserRoutes extends AuthRouteContract<UserController> {
  getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [new RouteDto(this.getFullEndpoint('/me'), HttpMethodEnum.GET, controller.getLogged)]
  }
}
