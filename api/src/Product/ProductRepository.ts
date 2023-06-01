import { TypeOrmMysqlRepositoryContract } from '../Shared/Modules/Repositories/TypeOrmMysqlRepositoryContract'
import { Product } from './Models/Product'
import { ProductDao } from './Models/ProductDao'

export class ProductRepository extends TypeOrmMysqlRepositoryContract<Product, ProductDao> {
  getRepository() {
    return this.getManager().getRepository(ProductDao)
  }
}
