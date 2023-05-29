import { TypeOrmMysqlRepositoryContract } from '../Shared/Repositories/TypeOrmMysqlRepositoryContract'
import { Authentication } from './Models/Authentication'
import { AuthenticationDao } from './Models/AuthenticationDao'

export class AuthenticationRepository extends TypeOrmMysqlRepositoryContract<
  Authentication,
  AuthenticationDao
> {}
