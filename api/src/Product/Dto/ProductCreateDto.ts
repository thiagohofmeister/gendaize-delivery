import { VariationStatusEnum } from '../../Variation/Enums/VariationStatusEnum'
import { ProductStatusEnum } from '../Enums/ProductStatusEnum'
import { ProductVariationTemplateDto } from './ProductVariationTemplateDto'

export interface ProductCreateDto {
  name: string
  description: string
  variationTemplate: ProductVariationTemplateDto
  status: ProductStatusEnum
  productTypeId: string
  variations: {
    code: string
    priceList: number
    priceSale: number
    status: VariationStatusEnum
    attributes: {
      attribute: {
        id: string
      }
      value: string
    }[]
  }[]
}
