import * as Joi from 'joi'
import { Schema } from 'joi'

import { BaseValidator } from '../Base/BaseValidator'
import { AttributeCreateDto } from './Dto/AttributeCreateDto'
import { AttributeTypeEnum } from './Enums/AttributeTypeEnum'

export class AttributeValidator extends BaseValidator {
  private attributeCreateSchema: Schema

  constructor() {
    super()

    this.attributeCreateSchema = Joi.object({
      label: Joi.string().required(),
      type: Joi.valid(...Object.keys(AttributeTypeEnum)).required(),
      values: Joi.when('type', [
        {
          is: AttributeTypeEnum.SELECT_WITH_INCREMENTS,
          then: Joi.array()
            .items(
              Joi.object({
                label: Joi.string().required(),
                value: Joi.string().required(),
                increments: Joi.array().items(Joi.string())
              })
            )
            .required()
        },
        {
          is: AttributeTypeEnum.TEXT,
          then: Joi.forbidden(),
          otherwise: Joi.array().items(Joi.string()).required()
        }
      ]),
      productTypeId: Joi.string().required()
    })
  }

  public async attributeCreatePayloadValidate(payload: AttributeCreateDto) {
    return this.validateBySchema<AttributeCreateDto>(payload, this.attributeCreateSchema)
  }
}
