import { BaseAuthRoute } from '../Base/BaseAuthRoute'
import { RouteDto } from '../Base/Dto/RouteDto'
import { HttpMethodEnum } from '../Base/Enums/HttpMethodEnum'
import { AttributeController } from './AttributeController'

export class AttributeRoutes extends BaseAuthRoute<AttributeController> {
  getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(this.getFullEndpoint(), HttpMethodEnum.POST, controller.post),
      new RouteDto(this.getFullEndpoint(), HttpMethodEnum.GET, controller.get),
      new RouteDto(this.getFullEndpoint(':id'), HttpMethodEnum.GET, controller.getOne),
      new RouteDto(this.getFullEndpoint(':id'), HttpMethodEnum.DELETE, controller.delete)
    ]
  }
}
