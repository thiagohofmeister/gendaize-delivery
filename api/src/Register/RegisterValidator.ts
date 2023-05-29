import * as Joi from 'joi'
import { Schema } from 'joi'

import { DocumentTypeEnum } from '../Organization/Enums/DocumentTypeEnum'
import { JoiSchemaValidatorContract } from '../Shared/JoiSchemaValidatorContract'
import { RegisterCreateDto } from './Dto/RegisterCreateDto'

export class RegisterValidator extends JoiSchemaValidatorContract {
  private registerCreateSchema: Schema

  constructor() {
    super()

    this.registerCreateSchema = Joi.object({
      user: Joi.object({
        name: Joi.string().required(),
        documentNumber: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
      }).required(),
      organization: Joi.object({
        name: Joi.string().required(),
        document: Joi.object({
          type: Joi.valid(...Object.keys(DocumentTypeEnum)).required(),
          number: Joi.string().required(),
          name: Joi.string().required()
        }).required(),
        email: Joi.string().required(),
        phone: Joi.string().required()
      }).required()
    })
  }

  public async registerCreatePayloadValidate(payload: RegisterCreateDto) {
    return this.validateBySchema<RegisterCreateDto>(payload, this.registerCreateSchema)
  }
}
