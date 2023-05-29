import { IRepository } from '../../Shared/Models/Interfaces/IRepository'
import { UserOrganization } from '../Models/UserOrganization'

export interface UserOrganizationRepository extends IRepository<UserOrganization> {
  findByUserIdAndOrganizationId(userId: string, organizationId: string): Promise<UserOrganization[]>
}
