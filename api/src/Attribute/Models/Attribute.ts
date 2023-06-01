import { randomUUID } from 'crypto'
import { Organization } from '../../Organization/Models/Organization'
import { ProductType } from '../../ProductType/Models/ProductType'
import { DomainModel } from '../../Shared/Models/DomainModel'
import { ResponseModel } from '../../Shared/Models/ResponseModel'
import { AttributeSubTypeValuesType } from '../Dto/AttributeValuesDto'
import { AttributeSubTypeEnum } from '../Enums/AttributeSubTypeEnum'
import { AttributeTypeEnum } from '../Enums/AttributeTypeEnum'
import { AttributeDao } from './AttributeDao'

export class Attribute implements ResponseModel, DomainModel {
  constructor(
    private label: string,
    private type: AttributeTypeEnum,
    private subType: AttributeSubTypeEnum,
    private subTypeValues: AttributeSubTypeValuesType[],
    private values: string[],
    private productType: ProductType,
    private organization: Organization,
    private id?: string
  ) {
    if (!id) this.id = randomUUID()
  }

  public getId(): string {
    return this.id
  }

  public getOrganization(): Organization {
    return this.organization
  }

  public getProductType(): ProductType {
    return this.productType
  }

  public getLabel(): string {
    return this.label
  }

  public getType(): AttributeTypeEnum {
    return this.type
  }

  public getSubType(): AttributeSubTypeEnum {
    return this.subType
  }

  public getSubTypeValues(): AttributeSubTypeValuesType[] {
    return this.subTypeValues
  }

  public getValues(): string[] {
    return this.values
  }

  toView() {
    return {
      id: this.getId(),
      label: this.getLabel(),
      type: this.getType(),
      subType: this.getSubType(),
      subTypeValues: this.getSubTypeValues(),
      values: this.getValues(),
      organization: this.getOrganization()?.toView(),
      productType: this.getProductType()?.toView()
    }
  }

  toDao() {
    return new AttributeDao(
      this.getId(),
      this.getLabel(),
      this.getType(),
      this.getSubType(),
      this.getSubTypeValues(),
      this.getValues(),
      this.getProductType()?.toDao(),
      this.getOrganization()?.toDao()
    )
  }
}
