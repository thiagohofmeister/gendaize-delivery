import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { OrganizationDao } from '../../Organization/Models/OrganizationDao'
import { ProductTypeDao } from '../../ProductType/Models/ProductTypeDao'
import { DaoModel } from '../../Shared/Models/DaoModel'
import { AttributeValuesType } from '../Dto/AttributeValuesDto'
import { AttributeTypeEnum } from '../Enums/AttributeTypeEnum'
import { Attribute } from './Attribute'

@Entity('attribute')
export class AttributeDao implements DaoModel {
  @PrimaryColumn()
  id: string

  @Column()
  label: string

  @Column({
    type: 'enum',
    enum: AttributeTypeEnum
  })
  type: AttributeTypeEnum

  @Column('json')
  values: AttributeValuesType

  @ManyToOne(() => OrganizationDao, organization => organization.attributes)
  @JoinColumn({
    name: 'organization_id'
  })
  organization: OrganizationDao

  @ManyToOne(() => ProductTypeDao, productType => productType.attributes)
  @JoinColumn({
    name: 'product_type_id'
  })
  productType: ProductTypeDao

  constructor(
    id: string,
    label: string,
    type: AttributeTypeEnum,
    values: AttributeValuesType,
    productType: ProductTypeDao,
    organization: OrganizationDao
  ) {
    this.id = id
    this.label = label
    this.type = type
    this.values = values
    this.productType = productType
    this.organization = organization
  }

  toDomain() {
    return new Attribute(
      this.label,
      this.type,
      this.values,
      this.productType?.toDomain(),
      this.organization?.toDomain(),
      this.id
    )
  }
}
