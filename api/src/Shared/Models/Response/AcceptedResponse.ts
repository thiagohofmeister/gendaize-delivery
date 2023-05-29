import { ResponseTypeEnum } from '../../Enums/ResponseTypeEnum'
import { SuccessContract } from './SuccessContract'

export class AcceptedResponse extends SuccessContract {
  getStatus(): number {
    return ResponseTypeEnum.ACCEPTED
  }
}
