import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { AttributeDao } from '../../Attribute/Models/AttributeDao'
import { OrganizationDao } from '../../Organization/Models/OrganizationDao'
import { DaoModel } from '../../Shared/Models/DaoModel'
import { ProductType } from './ProductType'

@Entity('product_type')
export class ProductTypeDao implements DaoModel {
  @PrimaryColumn()
  id: string

  @Column()
  label: string

  @ManyToOne(() => OrganizationDao, organization => organization.userOrganizations)
  @JoinColumn({
    name: 'organization_id'
  })
  organization: OrganizationDao

  @OneToMany(() => AttributeDao, attribute => attribute.organization)
  @JoinColumn({
    name: 'organization_id'
  })
  attributes: AttributeDao[]

  constructor(id: string, label: string, organization: OrganizationDao) {
    this.id = id
    this.label = label
    this.organization = organization
  }

  toDomain() {
    return new ProductType(this.label, this.organization?.toDomain(), this.id)
  }
}
