import * as Joi from 'joi'
import { Schema } from 'joi'

import { BaseValidator } from '../Base/BaseValidator'
import { ProductTypeCreateDto } from './Dto/ProductTypeCreateDto'

export class ProductTypeValidator extends BaseValidator {
  private productTypeCreateSchema: Schema

  constructor() {
    super()

    this.productTypeCreateSchema = Joi.object({
      label: Joi.string().required()
    })
  }

  public async productTypeCreatePayloadValidate(payload: ProductTypeCreateDto) {
    return this.validateBySchema<ProductTypeCreateDto>(payload, this.productTypeCreateSchema)
  }
}
