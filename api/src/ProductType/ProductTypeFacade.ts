import { Organization } from '../Organization/Models/Organization'
import { FacadeContract } from '../Shared/Facades/FacadeContract'
import { ProductTypeCreateDto } from './Dto/ProductTypeCreateDto'

export class ProductTypeFacade extends FacadeContract {
  async create(organization: Organization, data: ProductTypeCreateDto) {
    return this.serviceFactory.buildProductTypeService().create(organization, data)
  }
}
