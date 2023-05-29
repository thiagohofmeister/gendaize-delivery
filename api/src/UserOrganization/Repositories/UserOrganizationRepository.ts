import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { UserOrganization } from '../Models/UserOrganization'
import { UserOrganizationDao } from '../Models/UserOrganizationDao'

export class UserOrganizationRepository extends TypeOrmMysqlRepositoryContract<
  UserOrganization,
  UserOrganizationDao
> {
  async findByUserIdAndOrganizationId(
    userId: string,
    organizationId: string
  ): Promise<UserOrganization[]> {
    return (
      await this.getMany({
        where: {
          user: { id: userId },
          organization: { id: organizationId }
        }
      })
    ).items
  }
}
