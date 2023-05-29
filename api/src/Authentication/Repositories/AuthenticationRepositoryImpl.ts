import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { Authentication } from '../Models/Authentication'
import { AuthenticationDao } from '../Models/AuthenticationDao'
import { AuthenticationRepository } from './AuthenticationRepository'

export class AuthenticationRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Authentication, AuthenticationDao>
  implements AuthenticationRepository {}
