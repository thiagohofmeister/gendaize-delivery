import { createHash } from 'crypto'

import { TypeOrmMysqlRepositoryContract } from '../Shared/Repositories/TypeOrmMysqlRepositoryContract'
import { User } from './Models/User'
import { UserDao } from './Models/UserDao'

export class UserRepository extends TypeOrmMysqlRepositoryContract<User, UserDao> {
  async findOneByAuthData(login: string, password: string): Promise<User> {
    const query = await this.repository
      .createQueryBuilder()
      .innerJoinAndSelect('UserDao.userOrganizations', 'userOrganizations')
      .innerJoinAndSelect('userOrganizations.organization', 'organization')
      .where('(UserDao.email = :login or UserDao.document_number = :login)', { login })
      .andWhere('UserDao.password = :password', {
        password: this.createHash256(this.createHash256(password))
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
