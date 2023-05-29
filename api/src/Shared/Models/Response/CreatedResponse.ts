import { ResponseTypeEnum } from '../../Enums/ResponseTypeEnum'
import { SuccessContract } from './SuccessContract'

export class CreatedResponse extends SuccessContract {
  getStatus(): number {
    return ResponseTypeEnum.CREATED
  }
}
