import { TypeOrmMysqlRepositoryContract } from '../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { Authentication } from './Models/Authentication'
import { AuthenticationDao } from './Models/AuthenticationDao'

export class AuthenticationRepository extends TypeOrmMysqlRepositoryContract<
  Authentication,
  AuthenticationDao
> {}
