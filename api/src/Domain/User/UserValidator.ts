import * as Joi from 'joi'
import { Schema } from 'joi'

import { JoiSchemaValidatorContract } from '../../Shared/Validators/JoiSchemaValidatorContract'
import { UserCreateDto } from './Dto/UserCreateDto'

export class UserValidator extends JoiSchemaValidatorContract {
  private userCreateSchema: Schema

  constructor() {
    super()

    this.userCreateSchema = Joi.object({
      name: Joi.string().required(),
      documentNumber: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    })
  }

  public async userCreatePayloadValidate(payload: UserCreateDto) {
    return this.validateBySchema<UserCreateDto>(payload, this.userCreateSchema)
  }
}
