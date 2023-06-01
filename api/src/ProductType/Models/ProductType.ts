import { randomUUID } from 'crypto'
import { Organization } from '../../Organization/Models/Organization'
import { Product } from '../../Product/Models/Product'
import { DomainModel } from '../../Shared/Models/DomainModel'
import { ResponseModel } from '../../Shared/Models/ResponseModel'
import { ProductTypeDao } from './ProductTypeDao'

export class ProductType implements ResponseModel, DomainModel {
  private products: Product[]

  constructor(private label: string, private organization: Organization, private id?: string) {
    if (!id) this.id = randomUUID()
  }

  public getId(): string {
    return this.id
  }

  public getOrganization(): Organization {
    return this.organization
  }

  public getLabel(): string {
    return this.label
  }

  public getProducts(): Product[] {
    return this.products
  }

  addProduct(product: Product) {
    if (!this.products) this.products = []
    this.products.push(product)
    return this
  }

  removeProducts(idsToKeep: string[]) {
    if (!this.products) this.products = []
    this.products = this.products.filter(product => !idsToKeep.includes(product.getId()))
    return this
  }

  toView() {
    return {
      id: this.getId(),
      name: this.getLabel(),
      organization: this.getOrganization()?.toView(),
      products: this.products?.map(product => product.toView())
    }
  }

  toDao() {
    const entity = new ProductTypeDao(
      this.getId(),
      this.getLabel(),
      this.getOrganization()?.toDao()
    )

    if (this.getProducts()) {
      entity.products = this.getProducts().map(product => product.toDao())
    }

    return entity
  }
}
