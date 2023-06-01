import * as Joi from 'joi'
import { Schema } from 'joi'

import { BaseValidator } from '../Base/BaseValidator'
import { AttributeCreateDto } from './Dto/AttributeCreateDto'
import { AttributeSubTypeEnum } from './Enums/AttributeSubTypeEnum'
import { AttributeTypeEnum } from './Enums/AttributeTypeEnum'

export class AttributeValidator extends BaseValidator {
  private attributeCreateSchema: Schema

  constructor() {
    super()

    this.attributeCreateSchema = Joi.object({
      label: Joi.string().required(),
      type: Joi.valid(...Object.keys(AttributeTypeEnum)).required(),
      subType: Joi.valid(...Object.keys(AttributeSubTypeEnum)).allow(null),
      values: Joi.when('type', {
        is: AttributeTypeEnum.TEXT,
        then: Joi.forbidden(),
        otherwise: Joi.array().items(Joi.string()).required()
      }),
      subTypeValues: Joi.when('subType', {
        is: AttributeSubTypeEnum.SELECT_WITH_INCREMENTS,
        then: Joi.array()
          .items(
            Joi.object({
              label: Joi.string().required(),
              value: Joi.array().items(Joi.string()).min(1).required()
            })
          )
          .required(),
        otherwise: Joi.forbidden()
      }).allow(null),
      productTypeId: Joi.string().required()
    })
  }

  public async attributeCreatePayloadValidate(payload: AttributeCreateDto) {
    return this.validateBySchema<AttributeCreateDto>(payload, this.attributeCreateSchema)
  }
}
