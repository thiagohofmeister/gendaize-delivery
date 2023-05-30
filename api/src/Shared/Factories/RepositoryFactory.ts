import { EntityManager } from 'typeorm'

import { AuthenticationRepository } from '../../Authentication/AuthenticationRepository'
import { OrganizationRepository } from '../../Organization/OrganizationRepository'
import { ProductTypeRepository } from '../../ProductType/ProductTypeRepository'
import { UserRepository } from '../../User/UserRepository'
import { UserOrganizationRepository } from '../../UserOrganization/UserOrganizationRepository'

export class RepositoryFactory {
  constructor(private readonly manager: EntityManager, private readonly organizationId: string) {}

  public buildAuthenticationRepository(): AuthenticationRepository {
    return new AuthenticationRepository(this.manager, this.organizationId)
  }

  public buildUserRepository(): UserRepository {
    return new UserRepository(this.manager, this.organizationId)
  }

  public buildProductTypeRepository(): ProductTypeRepository {
    return new ProductTypeRepository(this.manager, this.organizationId)
  }

  public buildOrganizationRepository(): OrganizationRepository {
    return new OrganizationRepository(this.manager, this.organizationId)
  }

  public buildUserOrganizationRepository(): UserOrganizationRepository {
    return new UserOrganizationRepository(this.manager, this.organizationId)
  }
}
