import { FacadeContract } from '../Shared/Facades/Contracts/FacadeContract'
import { OrganizationCreateDto } from './Dto/OrganizationCreateDto'
import { Organization } from './Models/Organization'

export class OrganizationFacade extends FacadeContract {
  public async create(data: OrganizationCreateDto): Promise<Organization> {
    return await this.serviceFactory.buildTransactionalService().execute(async manager => {
      return await this.serviceFactory.buildOrganizationService(manager).create(data)
    })
  }
}
