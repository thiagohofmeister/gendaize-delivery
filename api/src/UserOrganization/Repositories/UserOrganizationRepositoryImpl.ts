import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { UserOrganization } from '../Models/UserOrganization'
import { UserOrganizationDao } from '../Models/UserOrganizationDao'
import { UserOrganizationRepository } from './UserOrganizationRepository'

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
