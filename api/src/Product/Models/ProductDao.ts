import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { OrganizationDao } from '../../Organization/Models/OrganizationDao'
import { ProductTypeDao } from '../../ProductType/Models/ProductTypeDao'
import { DaoModel } from '../../Shared/Models/DaoModel'
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
    name: 'variation_template'
  })
  variationTemplate: string

  @Column()
  status: string

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

  constructor(
    id: string,
    name: string,
    description: string,
    variationTemplate: string,
    status: string,
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

  toDomain() {
    return new Product(
      this.name,
      this.description,
      this.variationTemplate,
      this.status,
      this.productType?.toDomain(),
      this.organization?.toDomain(),
      this.id
    )
  }
}
