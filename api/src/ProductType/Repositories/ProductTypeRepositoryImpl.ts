import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { ProductType } from '../Models/ProductType'
import { ProductTypeDao } from '../Models/ProductTypeDao'
import { ProductTypeRepository } from './ProductTypeRepository'

export class ProductTypeRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<ProductType, ProductTypeDao>
  implements ProductTypeRepository {}
