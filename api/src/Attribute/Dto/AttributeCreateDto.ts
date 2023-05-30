import { AttributeTypeEnum } from '../Enums/AttributeTypeEnum'
import { AttributeValuesType } from './AttributeValuesDto'

export interface AttributeCreateDto {
  label: string
  type: AttributeTypeEnum
  values?: AttributeValuesType
  productTypeId: string
}
