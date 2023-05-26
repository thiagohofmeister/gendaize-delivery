import { User } from '../../Domain/User/Models/User'
import { EntityDataMapperContract } from '../../Shared/DataMappers/Contracts/EntityDataMapperContract'
import { UserDao } from '../Models/UserDao'
import { UserDataMapper } from './UserDataMapper'
import { UserOrganizationDataMapper } from './UserOrganizationDataMapper'

export class UserDataMapperMediator extends EntityDataMapperContract<User, UserDao> {
  constructor(
    private readonly userDataMapper: UserDataMapper,
    private readonly userOrganizationDataMapper: UserOrganizationDataMapper
  ) {
    super()
  }

  toDomainEntity(entity: UserDao): User {
    const user = this.userDataMapper.toDomainEntity(entity)

    if (entity.userOrganizations) {
      user.removeOrganizations([])
      this.userOrganizationDataMapper
        .toDomainEntityMany(entity.userOrganizations)
        .map(store => user.addOrganization(store))
    }

    return user
  }

  toDaoEntity(domain: User): UserDao {
    const user = this.userDataMapper.toDaoEntity(domain)

    if (domain.getAllOrganizations()) {
      user.userOrganizations = this.userOrganizationDataMapper.toDaoEntityMany(
        domain.getAllOrganizations()
      )
    }

    return user
  }
}
