import { TypeOrmMysqlRepositoryContract } from '../Shared/Modules/Repositories/TypeOrmMysqlRepositoryContract'
import { VariationAttribute } from './Models/VariationAttribute'
import { VariationAttributeDao } from './Models/VariationAttributeDao'

export class VariationAttributeRepository extends TypeOrmMysqlRepositoryContract<
  VariationAttribute,
  VariationAttributeDao
> {
  getRepository() {
    return this.getManager().getRepository(VariationAttributeDao)
  }
}
