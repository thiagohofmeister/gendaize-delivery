import { Organization } from '../../Domain/Organization/Models/Organization'
import { EntityDataMapperContract } from '../../Shared/DataMappers/Contracts/EntityDataMapperContract'
import { OrganizationDao } from '../Models/OrganizationDao'

export class OrganizationDataMapper extends EntityDataMapperContract<
  Organization,
  OrganizationDao
> {
  toDomainEntity(entity: OrganizationDao): Organization {
    return new Organization(
      entity.name,
      entity.documentType,
      entity.documentNumber,
      entity.documentName,
      entity.email,
      entity.phone,
      entity.id
    )
  }

  toDaoEntity(domain: Organization): OrganizationDao {
    return new OrganizationDao(
      domain.getId(),
      domain.getName(),
      domain.getDocumentType(),
      domain.getDocumentNumber(),
      domain.getDocumentName(),
      domain.getEmail(),
      domain.getPhone()
    )
  }
}
