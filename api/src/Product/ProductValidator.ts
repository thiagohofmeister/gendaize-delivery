import * as Joi from 'joi'
import { Schema } from 'joi'

import { BaseValidator } from '../Base/BaseValidator'
import { InvalidDataException } from '../Shared/Models/Exceptions/InvalidDataException'
import { ErrorReason } from '../Shared/Models/Interfaces/ErrorReason'
import { VariationStatusEnum } from '../Variation/Enums/VariationStatusEnum'
import { ProductCreateDto } from './Dto/ProductCreateDto'
import { ProductVariationTemplateDto } from './Dto/ProductVariationTemplateDto'
import { ProductStatusEnum } from './Enums/ProductStatusEnum'

export class ProductValidator extends BaseValidator {
  private productCreateSchema: Schema

  constructor() {
    super()

    this.productCreateSchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().allow(null),
      variationTemplate: Joi.object({
        attributes: Joi.array()
          .items(
            Joi.object({
              id: Joi.string().required()
            }).required()
          )
          .min(1)
          .required(),
        images: Joi.string().allow(null)
      }).allow(null),
      status: Joi.valid(...Object.keys(ProductStatusEnum)).required(),
      productTypeId: Joi.string().required(),
      variations: Joi.array()
        .items(
          Joi.object({
            code: Joi.string().allow(null),
            priceList: Joi.number().required(),
            priceSale: Joi.number().required(),
            variationCombination: Joi.string().allow(),
            status: Joi.valid(...Object.keys(VariationStatusEnum)).required(),
            attributes: Joi.array().items(
              Joi.object({
                attribute: Joi.object({
                  id: Joi.string().required()
                }),
                value: Joi.string().required().allow(null)
              })
            )
          }).required()
        )
        .required()
        .min(1)
    })
  }

  public async productCreatePayloadValidate(payload: ProductCreateDto) {
    return this.validateBySchema<ProductCreateDto>(payload, this.productCreateSchema)
  }

  validateVariationsQuantityByVariationTemplate(
    quantity: number,
    variationTemplate: ProductVariationTemplateDto
  ) {
    if (quantity > 1 && !variationTemplate) {
      throw new InvalidDataException(
        'Product without variationTemplate cannot be created with more than one variation'
      ).setCode('VariationQuantityExceededByVariationTemplate')
    }
  }

  validateVariationHavingAttributesOfVariationTemplate(
    attributes: ProductCreateDto['variations'][0]['attributes'],
    variationTemplate: ProductVariationTemplateDto,
    errorReasons: ErrorReason[],
    variationIndex: number
  ) {
    if (!variationTemplate) {
      return
    }

    variationTemplate.attributes.forEach(attrTemplate => {
      if (!attributes.some(attr => attr.attribute.id === attrTemplate.id)) {
        errorReasons.push({
          id: `variations.${variationIndex}.attributes.[].attribute.id.${attrTemplate.id}`,
          message: `Attribute with id ${attrTemplate.id} is required.`
        })
      }
    })
  }

  validateIfValueExistsOnAttribute(
    value: string,
    values: string[],
    errorReasons: ErrorReason[],
    variationIndex: number,
    attrIndex: number
  ) {
    if (values.includes(value)) {
      return
    }

    errorReasons.push({
      id: `variations.${variationIndex}.attributes.${attrIndex}.attribute.value.${value}`,
      message: `Value ${value} not allowed.`,
      enum: values
    })
  }

  validateIfCombinationAttributeIdExistsOnVariationTemplateAttributes(
    variationTemplate: ProductVariationTemplateDto,
    fieldCombination: string
  ) {
    const attributeId = variationTemplate[fieldCombination]
    if (
      !variationTemplate ||
      !attributeId ||
      variationTemplate.attributes.some(attr => attr.id === attributeId)
    ) {
      return
    }

    throw new InvalidDataException('Error', [
      {
        id: `variationTemplate.${fieldCombination}.${attributeId}`,
        message: `The attribute used in the combination must be having in the attributes of variationTemplate.`
      }
    ])
  }

  validateIfCombinationIsAvailable(
    combination: string,
    variationAvailableCombinations: string[],
    fieldCombination: string,
    index: number
  ) {
    if (variationAvailableCombinations.includes(combination) || !combination) {
      return
    }

    throw new InvalidDataException('Error', [
      {
        id: `${fieldCombination}.${index}.value.${combination}`,
        message: `The combination does not available.`,
        enum: variationAvailableCombinations
      }
    ])
  }
}
