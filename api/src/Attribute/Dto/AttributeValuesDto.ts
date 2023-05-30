export class AttributeValuesDto {
  label: string
  value: string
  increments: string[]
}

export type AttributeValuesType = (string | AttributeValuesDto)[]
