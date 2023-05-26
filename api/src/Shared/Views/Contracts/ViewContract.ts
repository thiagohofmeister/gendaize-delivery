import { IItemListModel } from '../../Models/Interfaces/IItemListModel'
import { ResponseModel } from '../../Models/ResponseModel'

export abstract class ViewContract<TDomainModel extends ResponseModel, TViewResponse = any> {
  public render(
    body: TDomainModel | TDomainModel[] | IItemListModel<TDomainModel>
  ): TViewResponse | TViewResponse[] | IItemListModel<TViewResponse> {
    if (!body) {
      return undefined
    }

    if (Array.isArray(body)) {
      return this.renderMany(body as TDomainModel[])
    }

    if (!!body && body.hasOwnProperty('items') && body.hasOwnProperty('total')) {
      return this.renderList(body as IItemListModel<TDomainModel>)
    }

    return this.renderOne(body as TDomainModel)
  }

  protected renderOne(entity: TDomainModel): TViewResponse {
    return entity.toView()
  }

  protected renderMany(entities: TDomainModel[]): TViewResponse[] {
    return entities.map(entity => this.renderOne(entity))
  }

  protected renderList(result: IItemListModel<TDomainModel>): IItemListModel<TViewResponse> {
    return {
      items: result.items.map(entity => this.renderOne(entity)),
      total: result.total
    }
  }
}
