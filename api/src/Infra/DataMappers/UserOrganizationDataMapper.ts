import { UserOrganization } from '../../Domain/UserOrganization/Models/UserOrganization'
import { EntityDataMapperContract } from '../../Shared/DataMappers/Contracts/EntityDataMapperContract'
import { UserOrganizationDao } from '../Models/UserOrganizationDao'
import { OrganizationDataMapper } from './OrganizationDataMapper'
import { UserDataMapper } from './UserDataMapper'

export class UserOrganizationDataMapper extends EntityDataMapperContract<
  UserOrganization,
  UserOrganizationDao
> {
  constructor(
    private readonly userDataMapper: UserDataMapper,
    private readonly organizationDataMapper: OrganizationDataMapper
  ) {
    super()
  }

  toDomainEntity(entity: UserOrganizationDao): UserOrganization {
    return new UserOrganization(
      entity.roleType,
      entity.status,
      entity.user ? this.userDataMapper.toDomainEntity(entity.user) : null,
      entity.organization ? this.organizationDataMapper.toDomainEntity(entity.organization) : null,
      entity.id
    )
  }

  toDaoEntity(domain: UserOrganization): UserOrganizationDao {
    return new UserOrganizationDao(
      domain.getId(),
      domain.getStatus(),
      domain.getRoleType(),
      domain.getUser() ? this.userDataMapper.toDaoEntity(domain.getUser()) : null,
      domain.getOrganization()
        ? this.organizationDataMapper.toDaoEntity(domain.getOrganization())
        : null
    )
  }
}
