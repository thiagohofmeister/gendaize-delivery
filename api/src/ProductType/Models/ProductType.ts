import { randomUUID } from 'crypto'
import { Organization } from '../../Organization/Models/Organization'
import { DomainModel } from '../../Shared/Models/DomainModel'
import { ResponseModel } from '../../Shared/Models/ResponseModel'
import { ProductTypeDao } from './ProductTypeDao'

export class ProductType implements ResponseModel, DomainModel {
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

  toView() {
    return {
      id: this.getId(),
      name: this.getLabel(),
      organization: this.getOrganization()?.toView()
    }
  }

  toDao() {
    return new ProductTypeDao(this.getId(), this.getLabel(), this.getOrganization()?.toDao())
  }
}
