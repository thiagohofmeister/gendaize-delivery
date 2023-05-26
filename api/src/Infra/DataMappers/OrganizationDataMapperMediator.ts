import { Organization } from '../../Domain/Organization/Models/Organization'
import { EntityDataMapperContract } from '../../Shared/DataMappers/Contracts/EntityDataMapperContract'
import { OrganizationDao } from '../Models/OrganizationDao'
import { OrganizationDataMapper } from './OrganizationDataMapper'
import { UserDataMapper } from './UserDataMapper'

export class OrganizationDataMapperMediator extends EntityDataMapperContract<
  Organization,
  OrganizationDao
> {
  constructor(
    private readonly organizationDataMapper: OrganizationDataMapper,
    private readonly userDataMapper: UserDataMapper
  ) {
    super()
  }

  toDomainEntity(entity: OrganizationDao): Organization {
    const organization = this.organizationDataMapper.toDomainEntity(entity)

    if (entity.owner) {
      organization.setOwner(this.userDataMapper.toDomainEntity(entity.owner))
    }

    return organization
  }

  toDaoEntity(domain: Organization): OrganizationDao {
    const organization = this.organizationDataMapper.toDaoEntity(domain)

    if (domain.getOwner()) {
      organization.owner = this.userDataMapper.toDaoEntity(domain.getOwner())
    }

    return organization
  }
}
