import { ResponseTypeEnum } from '../../../Base/Enums/ResponseTypeEnum'
import { BaseError } from './BaseError'

export class ConflictException extends BaseError {
  constructor(message: string = 'Item already exists.') {
    super(message)
  }

  getHttpStatusCode(): ResponseTypeEnum {
    return ResponseTypeEnum.CONFLICT
  }
}
