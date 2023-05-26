import { ViewContract } from '../../../Shared/Views/Contracts/ViewContract'
import { DocumentTypeEnum } from '../../Organization/Enums/DocumentTypeEnum'
import { UserStatusEnum } from '../../User/Enums/UserStatusEnum'
import { Register } from '../Models/Register'

export class RegisterView extends ViewContract<Register, RegisterResponse> {
  protected renderOne(entity: Register): RegisterResponse {
    return entity.toView()
  }
}

export interface RegisterResponse {
  user: {
    id: string
    name: string
    documentNumber: string
    email: string
    status: UserStatusEnum
  }
  organization: {
    id: string
    name: string
    document: {
      type: DocumentTypeEnum
      number: string
      name: string
    }
    email: string
    phone: string
  }
}
