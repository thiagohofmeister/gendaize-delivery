import { FindOptionsWhere, ObjectID, SelectQueryBuilder } from 'typeorm'

import { IFilterDefault } from '../../Models/Interfaces/IFilterDefault'
import { IItemListModel } from '../../Models/Interfaces/IItemListModel'
import { IRepository } from '../../Models/Interfaces/IRepository'

export abstract class RepositoryContract<TDomainEntity, TDaoEntity>
  implements IRepository<TDomainEntity>
{
  abstract delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindOptionsWhere<TDaoEntity>
  ): Promise<boolean>

  abstract save(entity: TDomainEntity, withFindBeforeReturn: boolean): Promise<TDomainEntity>

  abstract create(entity: TDomainEntity): Promise<TDomainEntity>

  abstract findOneByPrimaryColumn(id: string): Promise<TDomainEntity>

  abstract findAll(filter: IFilterDefault): Promise<IItemListModel<TDomainEntity>>

  protected abstract getOne(query: SelectQueryBuilder<TDaoEntity>): Promise<TDomainEntity | null>

  protected abstract getMany(
    query: SelectQueryBuilder<TDaoEntity>
  ): Promise<IItemListModel<TDomainEntity>>
}
