import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { ProductDao } from '../../Product/Models/ProductDao'
import { DaoModel } from '../../Shared/Models/DaoModel'
import { VariationAttributeDao } from '../../VariationAttribute/Models/VariationAttributeDao'
import { VariationStatusEnum } from '../Enums/VariationStatusEnum'
import { Variation } from './Variation'

@Entity('variation')
export class VariationDao implements DaoModel {
  @PrimaryColumn()
  id: string

  @Column()
  code: string

  @Column({
    name: 'price_list'
  })
  priceList: number

  @Column({
    name: 'price_sale'
  })
  priceSale: number

  @Column({
    type: 'enum',
    enum: VariationStatusEnum
  })
  status: VariationStatusEnum

  @ManyToOne(() => ProductDao, product => product.variations)
  @JoinColumn({
    name: 'product_id'
  })
  product: ProductDao

  @OneToMany(() => VariationAttributeDao, variationAttribute => variationAttribute.variation, {
    cascade: true
  })
  @JoinColumn({
    name: 'variation_id'
  })
  variationAttributes: VariationAttributeDao[]

  constructor(
    id: string,
    code: string,
    priceList: number,
    priceSale: number,
    status: VariationStatusEnum,
    product: ProductDao
  ) {
    this.id = id
    this.code = code
    this.priceList = priceList
    this.priceSale = priceSale
    this.status = status
    this.product = product
  }

  toDomain() {
    const domain = new Variation(
      this.code,
      this.priceList,
      this.priceSale,
      this.status,
      this.product?.toDomain(),
      this.id
    )

    if (this.variationAttributes) {
      this.variationAttributes.forEach(attribute => domain.addAttribute(attribute.toDomain()))
    }

    return domain
  }
}
