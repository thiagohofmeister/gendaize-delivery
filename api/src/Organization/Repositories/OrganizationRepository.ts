import { IRepository } from '../../Shared/Models/Interfaces/IRepository'
import { Organization } from '../Models/Organization'

export interface OrganizationRepository extends IRepository<Organization> {
  findOneByDocumentNumber(documentNumber: string): Promise<Organization>
}
