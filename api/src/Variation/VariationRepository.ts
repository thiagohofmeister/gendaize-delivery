import { TypeOrmMysqlRepositoryContract } from '../Shared/Modules/Repositories/TypeOrmMysqlRepositoryContract'
import { Variation } from './Models/Variation'
import { VariationDao } from './Models/VariationDao'

export class VariationRepository extends TypeOrmMysqlRepositoryContract<Variation, VariationDao> {
  getRepository() {
    return this.getManager().getRepository(VariationDao)
  }
}
