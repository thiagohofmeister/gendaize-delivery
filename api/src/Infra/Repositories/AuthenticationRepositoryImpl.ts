import { Authentication } from '../../Domain/Authentication/Models/Authentication'
import { AuthenticationRepository } from '../../Domain/Authentication/Repositories/AuthenticationRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { AuthenticationDao } from '../Models/AuthenticationDao'

export class AuthenticationRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Authentication, AuthenticationDao>
  implements AuthenticationRepository {}
