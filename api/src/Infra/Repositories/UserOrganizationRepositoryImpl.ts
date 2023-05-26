import { UserOrganization } from '../../Domain/UserOrganization/Models/UserOrganization'
import { UserOrganizationRepository } from '../../Domain/UserOrganization/Repositories/UserOrganizationRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { UserOrganizationDao } from '../Models/UserOrganizationDao'

export class UserOrganizationRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<UserOrganization, UserOrganizationDao>
  implements UserOrganizationRepository
{
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
