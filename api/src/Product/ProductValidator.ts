import * as Joi from 'joi'
import { Schema } from 'joi'

import { BaseValidator } from '../Base/BaseValidator'
import { ProductCreateDto } from './Dto/ProductCreateDto'
import { ProductStatusEnum } from './Enums/ProductStatusEnum'

export class ProductValidator extends BaseValidator {
  private productCreateSchema: Schema

  constructor() {
    super()

    this.productCreateSchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().allow(null),
      variationTemplate: Joi.string().allow(null),
      status: Joi.valid(...Object.keys(ProductStatusEnum)).required(),
      productTypeId: Joi.string().required()
    })
  }

  public async productCreatePayloadValidate(payload: ProductCreateDto) {
    return this.validateBySchema<ProductCreateDto>(payload, this.productCreateSchema)
  }
}
