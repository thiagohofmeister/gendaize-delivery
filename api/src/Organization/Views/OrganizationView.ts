import { ViewContract } from '../../Shared/Views/Contracts/ViewContract'
import { DocumentTypeEnum } from '../Enums/DocumentTypeEnum'
import { Organization } from '../Models/Organization'

export class OrganizationView extends ViewContract<Organization, OrganizationResponse> {}

export interface OrganizationResponse {
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
