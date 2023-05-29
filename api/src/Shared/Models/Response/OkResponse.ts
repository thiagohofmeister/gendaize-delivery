import { ResponseTypeEnum } from '../../Enums/ResponseTypeEnum'
import { SuccessContract } from './SuccessContract'

export class OkResponse extends SuccessContract {
  getStatus(): number {
    return ResponseTypeEnum.OK
  }
}
