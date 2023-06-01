import { randomUUID } from 'crypto'
import { Product } from '../../Product/Models/Product'
import { DomainModel } from '../../Shared/Models/DomainModel'
import { ResponseModel } from '../../Shared/Models/ResponseModel'
import { VariationAttribute } from '../../VariationAttribute/Models/VariationAttribute'
import { VariationStatusEnum } from '../Enums/VariationStatusEnum'
import { VariationDao } from './VariationDao'

export class Variation implements ResponseModel, DomainModel {
  private attributes: VariationAttribute[]

  constructor(
    private code: string,
    private priceList: number,
    private priceSale: number,
    private status: VariationStatusEnum,
    private product?: Product,
    private id?: string
  ) {
    if (!id) this.id = randomUUID()
  }

  public getId(): string {
    return this.id
  }

  public getStatus(): VariationStatusEnum {
    return this.status
  }

  public getPriceSale(): number {
    return this.priceSale
  }

  public getPriceList(): number {
    return this.priceList
  }

  public getCode(): string {
    return this.code
  }

  public getProduct(): Product {
    return this.product
  }

  public getAttributes(): VariationAttribute[] {
    return this.attributes
  }

  public removeAttributes(idsToKeep: string[]) {
    if (!this.attributes) this.attributes = []

    this.attributes = this.attributes.filter(attr => !idsToKeep.includes(attr.getId()))

    return this.attributes
  }

  public addAttribute(attribute: VariationAttribute) {
    if (!this.attributes) this.attributes = []
    this.attributes.push(attribute)
    return this
  }

  toView() {
    return {
      id: this.getId(),
      code: this.getCode(),
      priceList: this.getPriceList(),
      priceSale: this.getPriceSale(),
      status: this.getStatus(),
      attributes: this.getAttributes()?.map(attr => attr.toView()),
      organization: this.getProduct()?.toView()
    }
  }

  toDao() {
    const entity = new VariationDao(
      this.getId(),
      this.getCode(),
      this.getPriceList(),
      this.getPriceSale(),
      this.getStatus(),
      this.getProduct()?.toDao()
    )

    if (this.getAttributes()) {
      entity.variationAttributes = this.getAttributes().map(attr => attr.toDao())
    }

    return entity
  }
}
