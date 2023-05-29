import { DocumentTypeEnum } from '../../Organization/Enums/DocumentTypeEnum'
import { ViewContract } from '../../Shared/Views/Contracts/ViewContract'
import { UserRoleTypeEnum } from '../../User/Enums/UserRoleTypeEnum'
import { UserStatusEnum } from '../../User/Enums/UserStatusEnum'
import { UserOrganizationStatusEnum } from '../../UserOrganization/Enums/UserOrganizationStatusEnum'
import { AuthenticationStatusEnum } from '../Enums/AuthenticationStatusEnum'
import { Authentication } from '../Models/Authentication'

export class AuthenticationView extends ViewContract<Authentication, AuthenticationResponse> {}

export interface AuthenticationResponse {
  id: string
  token: string
  device: string
  status: AuthenticationStatusEnum
  userOrganization: {
    id: string
    roleType: UserRoleTypeEnum
    status: UserOrganizationStatusEnum
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
}
