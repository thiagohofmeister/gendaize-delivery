import { Authentication } from '../../Domain/Authentication/Models/Authentication'
import { EntityDataMapperContract } from '../../Shared/DataMappers/Contracts/EntityDataMapperContract'
import { AuthenticationDao } from '../Models/AuthenticationDao'
import { UserOrganizationDataMapper } from './UserOrganizationDataMapper'

export class AuthenticationDataMapper extends EntityDataMapperContract<
  Authentication,
  AuthenticationDao
> {
  constructor(private readonly userOrganizationDataMapper: UserOrganizationDataMapper) {
    super()
  }

  toDomainEntity(entity: AuthenticationDao): Authentication {
    return new Authentication(
      entity.token,
      entity.device,
      entity.status,
      entity.userOrganization
        ? this.userOrganizationDataMapper.toDomainEntity(entity.userOrganization)
        : null,
      entity.id
    )
  }

  toDaoEntity(domain: Authentication): AuthenticationDao {
    return new AuthenticationDao(
      domain.getId(),
      domain.getDevice(),
      domain.getStatus(),
      domain.getToken(),
      domain.getUserOrganization()
        ? this.userOrganizationDataMapper.toDaoEntity(domain.getUserOrganization())
        : null
    )
  }
}
