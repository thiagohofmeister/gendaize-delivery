import { Organization } from '../../Domain/Organization/Models/Organization'
import { OrganizationRepository } from '../../Domain/Organization/Repositories/OrganizationRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { OrganizationDao } from '../Models/OrganizationDao'

export class OrganizationRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Organization, OrganizationDao>
  implements OrganizationRepository
{
  async findOneByDocumentNumber(documentNumber: string): Promise<Organization> {
    return this.getOne({ where: { documentNumber } })
  }
}
