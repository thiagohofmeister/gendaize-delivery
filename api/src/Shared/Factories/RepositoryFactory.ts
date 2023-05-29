import { DataSource, EntityManager } from 'typeorm'

import { AuthenticationDao } from '../../Authentication/Models/AuthenticationDao'
import { AuthenticationRepository } from '../../Authentication/Repositories/AuthenticationRepository'
import { OrganizationDao } from '../../Organization/Models/OrganizationDao'
import { OrganizationRepository } from '../../Organization/Repositories/OrganizationRepository'
import { ProductTypeDao } from '../../ProductType/Models/ProductTypeDao'
import { ProductTypeRepository } from '../../ProductType/Repositories/ProductTypeRepository'
import { UserDao } from '../../User/Models/UserDao'
import { UserRepository } from '../../User/Repositories/UserRepository'
import { UserOrganizationDao } from '../../UserOrganization/Models/UserOrganizationDao'
import { UserOrganizationRepository } from '../../UserOrganization/Repositories/UserOrganizationRepository'

export class RepositoryFactory {
  constructor(private readonly dataSource: DataSource, private readonly organizationId: string) {}

  public buildAuthenticationRepository(manager?: EntityManager): AuthenticationRepository {
    return new AuthenticationRepository(
      this.getManager(manager).getRepository(AuthenticationDao),
      this.organizationId
    )
  }

  public buildUserRepository(manager?: EntityManager): UserRepository {
    return new UserRepository(this.getManager(manager).getRepository(UserDao), this.organizationId)
  }

  public buildProductTypeRepository(manager?: EntityManager): ProductTypeRepository {
    return new ProductTypeRepository(
      this.getManager(manager).getRepository(ProductTypeDao),
      this.organizationId
    )
  }

  public buildOrganizationRepository(manager?: EntityManager): OrganizationRepository {
    return new OrganizationRepository(
      this.getManager(manager).getRepository(OrganizationDao),
      this.organizationId
    )
  }

  public buildUserOrganizationRepository(manager?: EntityManager): UserOrganizationRepository {
    return new UserOrganizationRepository(
      this.getManager(manager).getRepository(UserOrganizationDao),
      this.organizationId
    )
  }

  public getDataSource() {
    return this.dataSource
  }

  private getManager(manager?: EntityManager) {
    if (manager) return manager

    return this.dataSource.manager
  }
}
