export class AttributeSubTypeValuesDto {
  label: string
  value: string[]
}

export type AttributeSubTypeValuesType = (string | AttributeSubTypeValuesDto)[]
