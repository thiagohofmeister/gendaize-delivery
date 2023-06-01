import { AttributeSubTypeEnum } from '../Enums/AttributeSubTypeEnum'
import { AttributeTypeEnum } from '../Enums/AttributeTypeEnum'
import { AttributeSubTypeValuesType } from './AttributeValuesDto'

export interface AttributeCreateDto {
  label: string
  type: AttributeTypeEnum
  values?: string[]
  subType?: AttributeSubTypeEnum
  subTypeValues?: AttributeSubTypeValuesType[]
  productTypeId: string
}
