import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { AttributeDao } from '../../Attribute/Models/AttributeDao'
import { OrganizationDao } from '../../Organization/Models/OrganizationDao'
import { ProductDao } from '../../Product/Models/ProductDao'
import { DaoModel } from '../../Shared/Models/DaoModel'
import { ProductType } from './ProductType'

@Entity('product_type')
export class ProductTypeDao implements DaoModel {
  @PrimaryColumn()
  id: string

  @Column()
  label: string

  @ManyToOne(() => OrganizationDao, organization => organization.productTypes)
  @JoinColumn({
    name: 'organization_id'
  })
  organization: OrganizationDao

  @OneToMany(() => AttributeDao, attribute => attribute.organization)
  @JoinColumn({
    name: 'organization_id'
  })
  attributes: AttributeDao[]

  @OneToMany(() => ProductDao, product => product.productType)
  @JoinColumn({
    name: 'product_type_id'
  })
  products: ProductDao[]

  constructor(id: string, label: string, organization: OrganizationDao) {
    this.id = id
    this.label = label
    this.organization = organization
  }

  addProduct(product: ProductDao) {
    if (!this.products) this.products = []
    this.products.push(product)
    return this
  }

  removeProducts(idsToKeep: string[]) {
    if (!this.products) this.products = []
    this.products = this.products.filter(product => !idsToKeep.includes(product.id))
    return this
  }

  toDomain() {
    const domain = new ProductType(this.label, this.organization?.toDomain(), this.id)

    if (this.products) {
      this.products.forEach(product => domain.addProduct(product.toDomain()))
    }

    return domain
  }
}
