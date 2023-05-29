import { RouteDto } from '../Shared/Dto/RouteDto'
import { HttpMethodEnum } from '../Shared/Enums/HttpMethodEnum'
import { RouteContract } from '../Shared/Routes/Contracts/RouteContract'
import { RegisterController } from './RegisterController'

export class RegisterRoutes extends RouteContract<RegisterController> {
  getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [new RouteDto(this.getFullEndpoint(), HttpMethodEnum.POST, controller.post)]
  }
}
