import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { Organization } from '../Models/Organization'
import { OrganizationDao } from '../Models/OrganizationDao'
import { OrganizationRepository } from './OrganizationRepository'

export class OrganizationRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Organization, OrganizationDao>
  implements OrganizationRepository
{
  async findOneByDocumentNumber(documentNumber: string): Promise<Organization> {
    return this.getOne({ where: { documentNumber } })
  }
}
