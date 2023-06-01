import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { OrganizationDao } from '../../Organization/Models/OrganizationDao'
import { ProductTypeDao } from '../../ProductType/Models/ProductTypeDao'
import { DaoModel } from '../../Shared/Models/DaoModel'
import { VariationDao } from '../../Variation/Models/VariationDao'
import { ProductVariationTemplateDto } from '../Dto/ProductVariationTemplateDto'
import { ProductStatusEnum } from '../Enums/ProductStatusEnum'
import { Product } from './Product'

@Entity('product')
export class ProductDao implements DaoModel {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column({
    name: 'variation_template',
    type: 'json'
  })
  variationTemplate: ProductVariationTemplateDto

  @Column({
    type: 'enum',
    enum: ProductStatusEnum
  })
  status: ProductStatusEnum

  @ManyToOne(() => ProductTypeDao, productType => productType.products)
  @JoinColumn({
    name: 'product_type_id'
  })
  productType: ProductTypeDao

  @ManyToOne(() => OrganizationDao, organization => organization.userOrganizations)
  @JoinColumn({
    name: 'organization_id'
  })
  organization: OrganizationDao

  @OneToMany(() => VariationDao, variation => variation.product, { cascade: true })
  @JoinColumn({
    name: 'product_id'
  })
  variations: VariationDao[]

  constructor(
    id: string,
    name: string,
    description: string,
    variationTemplate: ProductVariationTemplateDto,
    status: ProductStatusEnum,
    productType: ProductTypeDao,
    organization: OrganizationDao
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.variationTemplate = variationTemplate
    this.status = status
    this.productType = productType
    this.organization = organization
  }

  addVariation(variation: VariationDao) {
    if (!this.variations) this.variations = []
    this.variations.push(variation)
    return this
  }

  removeVariations(idsToKeep: string[]) {
    if (!this.variations) this.variations = []
    this.variations = this.variations.filter(variation => !idsToKeep.includes(variation.id))
    return this
  }

  toDomain() {
    const domain = new Product(
      this.name,
      this.description,
      this.variationTemplate,
      this.status,
      this.productType?.toDomain(),
      this.organization?.toDomain(),
      this.id
    )

    if (this.variations) {
      this.variations.forEach(variation => domain.addVariation(variation.toDomain()))
    }

    return domain
  }
}
