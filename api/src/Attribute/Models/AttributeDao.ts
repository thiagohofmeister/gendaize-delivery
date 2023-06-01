import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { OrganizationDao } from '../../Organization/Models/OrganizationDao'
import { ProductTypeDao } from '../../ProductType/Models/ProductTypeDao'
import { DaoModel } from '../../Shared/Models/DaoModel'
import { VariationAttributeDao } from '../../VariationAttribute/Models/VariationAttributeDao'
import { AttributeSubTypeValuesType } from '../Dto/AttributeValuesDto'
import { AttributeSubTypeEnum } from '../Enums/AttributeSubTypeEnum'
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

  @Column({
    type: 'enum',
    enum: AttributeSubTypeEnum,
    name: 'sub_type'
  })
  subType: AttributeSubTypeEnum

  @Column({
    type: 'json',
    name: 'sub_type_values'
  })
  subTypeValues: AttributeSubTypeValuesType[]

  @Column('json')
  values: string[]

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

  @OneToMany(() => VariationAttributeDao, variationAttribute => variationAttribute.attribute)
  @JoinColumn({
    name: 'attribute_id'
  })
  variationAttributes: VariationAttributeDao[]

  constructor(
    id: string,
    label: string,
    type: AttributeTypeEnum,
    subType: AttributeSubTypeEnum,
    subTypeValues: AttributeSubTypeValuesType[],
    values: string[],
    productType: ProductTypeDao,
    organization: OrganizationDao
  ) {
    this.id = id
    this.label = label
    this.type = type
    this.subType = subType
    this.subTypeValues = subTypeValues
    this.values = values
    this.productType = productType
    this.organization = organization
  }

  toDomain() {
    return new Attribute(
      this.label,
      this.type,
      this.subType,
      this.subTypeValues,
      this.values,
      this.productType?.toDomain(),
      this.organization?.toDomain(),
      this.id
    )
  }
}
