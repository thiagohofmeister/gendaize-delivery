import { TypeOrmMysqlRepositoryContract } from '../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { Organization } from './Models/Organization'
import { OrganizationDao } from './Models/OrganizationDao'

export class OrganizationRepository extends TypeOrmMysqlRepositoryContract<
  Organization,
  OrganizationDao
> {
  async findOneByDocumentNumber(documentNumber: string): Promise<Organization> {
    return this.getOne({ where: { documentNumber } })
  }
}
