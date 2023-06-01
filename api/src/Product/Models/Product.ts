import { randomUUID } from 'crypto'
import { Organization } from '../../Organization/Models/Organization'
import { ProductType } from '../../ProductType/Models/ProductType'
import { DomainModel } from '../../Shared/Models/DomainModel'
import { ResponseModel } from '../../Shared/Models/ResponseModel'
import { ProductDao } from './ProductDao'

export class Product implements ResponseModel, DomainModel {
  constructor(
    private name: string,
    private description: string,
    private variationTemplate: string,
    private status: string,
    private productType: ProductType,
    private organization: Organization,
    private id?: string
  ) {
    if (!id) this.id = randomUUID()
  }

  public getId(): string {
    return this.id
  }

  public getStatus(): string {
    return this.status
  }

  public getVariationTemplate(): string {
    return this.variationTemplate
  }

  public getDescription(): string {
    return this.description
  }

  public getName(): string {
    return this.name
  }

  public getProductType(): ProductType {
    return this.productType
  }

  public getOrganization(): Organization {
    return this.organization
  }

  toView() {
    return {
      id: this.getId(),
      name: this.getName(),
      description: this.getDescription(),
      variationTemplate: this.getVariationTemplate(),
      status: this.getStatus(),
      productType: this.getProductType()?.toView(),
      organization: this.getOrganization()?.toView()
    }
  }

  toDao() {
    return new ProductDao(
      this.getId(),
      this.getName(),
      this.getDescription(),
      this.getVariationTemplate(),
      this.getStatus(),
      this.getProductType()?.toDao(),
      this.getOrganization()?.toDao()
    )
  }
}
