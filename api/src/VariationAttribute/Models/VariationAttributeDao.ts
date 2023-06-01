import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { AttributeDao } from '../../Attribute/Models/AttributeDao'
import { DaoModel } from '../../Shared/Models/DaoModel'
import { VariationDao } from '../../Variation/Models/VariationDao'
import { VariationAttribute } from './VariationAttribute'

@Entity('variation_attribute')
export class VariationAttributeDao implements DaoModel {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => AttributeDao, attribute => attribute.variationAttributes)
  @JoinColumn({
    name: 'attribute_id'
  })
  attribute: AttributeDao

  @ManyToOne(() => VariationDao, variation => variation.variationAttributes)
  @JoinColumn({
    name: 'variation_id'
  })
  variation: VariationDao

  @Column()
  value: string

  constructor(id: string, value: string, variation: VariationDao, attribute: AttributeDao) {
    this.id = id
    this.value = value
    this.variation = variation
    this.attribute = attribute
  }

  toDomain() {
    return new VariationAttribute(
      this.value,
      this.variation?.toDomain(),
      this.attribute?.toDomain(),
      this.id
    )
  }
}
