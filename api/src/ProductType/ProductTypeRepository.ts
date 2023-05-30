import { TypeOrmMysqlRepositoryContract } from '../Shared/Modules/Repositories/TypeOrmMysqlRepositoryContract'
import { ProductType } from './Models/ProductType'
import { ProductTypeDao } from './Models/ProductTypeDao'

export class ProductTypeRepository extends TypeOrmMysqlRepositoryContract<
  ProductType,
  ProductTypeDao
> {
  getRepository() {
    return this.getManager().getRepository(ProductTypeDao)
  }
}
