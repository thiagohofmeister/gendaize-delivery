import { ViewContract } from '../../Shared/Views/Contracts/ViewContract'
import { UserStatusEnum } from '../Enums/UserStatusEnum'
import { User } from '../Models/User'

export class UserView extends ViewContract<User, UserResponse> {}

interface UserResponse {
  id: string
  name: string
  documentNumber: string
  email: string
  status: UserStatusEnum
}
