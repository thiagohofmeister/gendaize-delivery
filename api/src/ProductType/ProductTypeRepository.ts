import { TypeOrmMysqlRepositoryContract } from '../Shared/Repositories/TypeOrmMysqlRepositoryContract'
import { ProductType } from './Models/ProductType'
import { ProductTypeDao } from './Models/ProductTypeDao'

export class ProductTypeRepository extends TypeOrmMysqlRepositoryContract<
  ProductType,
  ProductTypeDao
> {}
