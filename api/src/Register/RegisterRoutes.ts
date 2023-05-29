import { RouteDto } from '../Shared/Dto/RouteDto'
import { RouteContract } from '../Shared/Routes/Contracts/RouteContract'
import { MethodEnum } from '../Shared/Routes/Enums/MethodEnum'
import { RegisterController } from './RegisterController'

export class RegisterRoutes extends RouteContract<RegisterController> {
  getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post)]
  }
}
