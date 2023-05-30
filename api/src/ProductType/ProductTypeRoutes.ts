import { BaseAuthRoute } from '../Base/BaseAuthRoute'
import { RouteDto } from '../Base/Dto/RouteDto'
import { HttpMethodEnum } from '../Base/Enums/HttpMethodEnum'
import { ProductTypeController } from './ProductTypeController'

export class ProductTypeRoutes extends BaseAuthRoute<ProductTypeController> {
  getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(this.getFullEndpoint(), HttpMethodEnum.POST, controller.post),
      new RouteDto(this.getFullEndpoint(), HttpMethodEnum.GET, controller.get),
      new RouteDto(this.getFullEndpoint(), HttpMethodEnum.GET, controller.getOne)
    ]
  }
}
