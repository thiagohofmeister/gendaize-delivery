import { SelectQueryBuilder } from 'typeorm'
import { TypeOrmMysqlRepositoryContract } from '../Shared/Modules/Repositories/TypeOrmMysqlRepositoryContract'
import { Product } from './Models/Product'
import { ProductDao } from './Models/ProductDao'

export class ProductRepository extends TypeOrmMysqlRepositoryContract<Product, ProductDao> {
  protected customToFindOneByPrimaryColumn(
    query: SelectQueryBuilder<ProductDao>
  ): SelectQueryBuilder<ProductDao> {
    return query
      .innerJoinAndSelect('ProductDao.variations', 'variations')
      .leftJoinAndSelect('variations.variationAttributes', 'variationAttributes')
      .leftJoinAndSelect('variationAttributes.attribute', 'attribute')
  }

  getRepository() {
    return this.getManager().getRepository(ProductDao)
  }
}
