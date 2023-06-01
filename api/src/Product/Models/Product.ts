import { randomUUID } from 'crypto'
import { Organization } from '../../Organization/Models/Organization'
import { ProductType } from '../../ProductType/Models/ProductType'
import { DomainModel } from '../../Shared/Models/DomainModel'
import { ResponseModel } from '../../Shared/Models/ResponseModel'
import { Variation } from '../../Variation/Models/Variation'
import { ProductStatusEnum } from '../Enums/ProductStatusEnum'
import { ProductDao } from './ProductDao'
import { ProductVariationTemplateDto } from '../Dto/ProductVariationTemplateDto'

export class Product implements ResponseModel, DomainModel {
  private variations: Variation[]

  constructor(
    private name: string,
    private description: string,
    private variationTemplate: ProductVariationTemplateDto,
    private status: ProductStatusEnum,
    private productType: ProductType,
    private organization: Organization,
    private id?: string
  ) {
    if (!id) this.id = randomUUID()
  }

  public getId(): string {
    return this.id
  }

  public getStatus(): ProductStatusEnum {
    return this.status
  }

  public getVariationTemplate(): ProductVariationTemplateDto {
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

  public getVariations(): Variation[] {
    return this.variations
  }

  addVariation(variation: Variation) {
    if (!this.variations) this.variations = []
    this.variations.push(variation)
    return this
  }

  removeVariations(idsToKeep: string[]) {
    if (!this.variations) this.variations = []
    this.variations = this.variations.filter(variation => !idsToKeep.includes(variation.getId()))
    return this
  }

  toView() {
    return {
      id: this.getId(),
      name: this.getName(),
      description: this.getDescription(),
      variationTemplate: this.getVariationTemplate(),
      status: this.getStatus(),
      variations: this.getVariations()?.map(variation => variation.toView()),
      productType: this.getProductType()?.toView(),
      organization: this.getOrganization()?.toView()
    }
  }

  toDao() {
    const entity = new ProductDao(
      this.getId(),
      this.getName(),
      this.getDescription(),
      this.getVariationTemplate(),
      this.getStatus(),
      this.getProductType()?.toDao(),
      this.getOrganization()?.toDao()
    )

    if (this.getVariations()) {
      entity.variations = this.getVariations().map(variation => variation.toDao())
    }

    console.log({ entity })

    return entity
  }
}
