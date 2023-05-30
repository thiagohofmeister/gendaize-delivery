import { TypeOrmMysqlRepositoryContract } from '../Shared/Modules/Repositories/TypeOrmMysqlRepositoryContract'
import { Attribute } from './Models/Attribute'
import { AttributeDao } from './Models/AttributeDao'

export class AttributeRepository extends TypeOrmMysqlRepositoryContract<Attribute, AttributeDao> {
  getRepository() {
    return this.getManager().getRepository(AttributeDao)
  }
}
