import { OrganizationCreateDto } from './Dto/OrganizationCreateDto'
import { Organization } from './Models/Organization'
import { OrganizationValidator } from './OrganizationValidator'
import { OrganizationRepository } from './Repositories/OrganizationRepository'

export class OrganizationService {
  constructor(
    private readonly repository: OrganizationRepository,
    private readonly validator: OrganizationValidator
  ) {}

  public async create(data: OrganizationCreateDto): Promise<Organization> {
    await this.validator.organizationCreatePayloadValidate(data)

    return this.repository.save(
      new Organization(
        data.name,
        data.document.type,
        data.document.number,
        data.document.name,
        data.email,
        data.phone
      )
    )
  }

  public async findOneByDocumentNumber(documentNumber: string): Promise<Organization> {
    return this.repository.findOneByDocumentNumber(documentNumber)
  }
}
