import { IRepository } from '../../Shared/Models/Interfaces/IRepository'
import { User } from '../Models/User'

export interface UserRepository extends IRepository<User> {
  findOneByAuthData(login: string, password: string): Promise<User>
  findOneByDocumentNumber(documentNumber: string): Promise<User>
}
