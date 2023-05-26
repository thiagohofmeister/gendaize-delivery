import { createHash } from 'crypto'

import { User } from '../../Domain/User/Models/User'
import { UserRepository } from '../../Domain/User/Repositories/UserRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { UserDao } from '../Models/UserDao'

export class UserRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<User, UserDao>
  implements UserRepository
{
  async findOneByAuthData(login: string, password: string): Promise<User> {
    const query = await this.repository
      .createQueryBuilder()
      .innerJoinAndSelect('UserDao.userOrganizations', 'userOrganizations')
      .innerJoinAndSelect('userOrganizations.organization', 'organization')
      .where('(UserDao.email = :login or UserDao.document_number = :password)', { login })
      .andWhere('UserDao.password = :password', {
        //password: this.createHash256(this.createHash256(password))
        password
      })

    return this.getOne(query)
  }

  async findOneByDocumentNumber(documentNumber: string): Promise<User> {
    return this.getOne({ where: { documentNumber } })
  }

  private createHash256(str: string): string {
    return createHash('sha256').update(str).digest('hex')
  }
}
