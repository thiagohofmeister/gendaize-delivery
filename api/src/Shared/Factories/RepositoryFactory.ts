import { DataSource } from 'typeorm'

import { AuthenticationRepository } from '../../Authentication/AuthenticationRepository'
import { OrganizationRepository } from '../../Organization/OrganizationRepository'
import { ProductTypeRepository } from '../../ProductType/ProductTypeRepository'
import { UserRepository } from '../../User/UserRepository'
import { UserOrganizationRepository } from '../../UserOrganization/UserOrganizationRepository'

export class RepositoryFactory {
  constructor(private readonly dataSource: DataSource, private readonly organizationId: string) {}

  public buildAuthenticationRepository(): AuthenticationRepository {
    return new AuthenticationRepository(this.dataSource.manager, this.organizationId)
  }

  public buildUserRepository(): UserRepository {
    return new UserRepository(this.dataSource.manager, this.organizationId)
  }

  public buildProductTypeRepository(): ProductTypeRepository {
    return new ProductTypeRepository(this.dataSource.manager, this.organizationId)
  }

  public buildOrganizationRepository(): OrganizationRepository {
    return new OrganizationRepository(this.dataSource.manager, this.organizationId)
  }

  public buildUserOrganizationRepository(): UserOrganizationRepository {
    return new UserOrganizationRepository(this.dataSource.manager, this.organizationId)
  }

  public getDataSource(): DataSource {
    return this.dataSource
  }
}
