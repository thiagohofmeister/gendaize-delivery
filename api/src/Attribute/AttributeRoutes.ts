import { BaseRoute } from '../Base/BaseRoute'
import { AuthRouteDto } from '../Base/Dto/AuthRouteDto'
import { RouteDto } from '../Base/Dto/RouteDto'
import { HttpMethodEnum } from '../Base/Enums/HttpMethodEnum'
import { AttributeController } from './AttributeController'

export class AttributeRoutes extends BaseRoute<AttributeController> {
  getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new AuthRouteDto(this.getFullEndpoint(), HttpMethodEnum.POST, controller.post),
      new AuthRouteDto(this.getFullEndpoint(), HttpMethodEnum.GET, controller.get),
      new AuthRouteDto(this.getFullEndpoint(':id'), HttpMethodEnum.GET, controller.getOne),
      new AuthRouteDto(this.getFullEndpoint(':id'), HttpMethodEnum.DELETE, controller.delete)
    ]
  }
}
