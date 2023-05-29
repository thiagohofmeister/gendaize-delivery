import { DataSource, EntityManager } from 'typeorm'

import { AuthenticationDao } from '../../Authentication/Models/AuthenticationDao'
import { AuthenticationRepository } from '../../Authentication/Repositories/AuthenticationRepository'
import { AuthenticationRepositoryImpl } from '../../Authentication/Repositories/AuthenticationRepositoryImpl'
import { OrganizationDao } from '../../Organization/Models/OrganizationDao'
import { OrganizationRepository } from '../../Organization/Repositories/OrganizationRepository'
import { OrganizationRepositoryImpl } from '../../Organization/Repositories/OrganizationRepositoryImpl'
import { ProductTypeDao } from '../../ProductType/Models/ProductTypeDao'
import { ProductTypeRepository } from '../../ProductType/Repositories/ProductTypeRepository'
import { ProductTypeRepositoryImpl } from '../../ProductType/Repositories/ProductTypeRepositoryImpl'
import { UserDao } from '../../User/Models/UserDao'
import { UserRepository } from '../../User/Repositories/UserRepository'
import { UserRepositoryImpl } from '../../User/Repositories/UserRepositoryImpl'
import { UserOrganizationDao } from '../../UserOrganization/Models/UserOrganizationDao'
import { UserOrganizationRepository } from '../../UserOrganization/Repositories/UserOrganizationRepository'
import { UserOrganizationRepositoryImpl } from '../../UserOrganization/Repositories/UserOrganizationRepositoryImpl'

export class RepositoryFactory {
  constructor(private readonly dataSource: DataSource, private readonly organizationId: string) {}

  public buildAuthenticationRepository(manager?: EntityManager): AuthenticationRepository {
    return new AuthenticationRepositoryImpl(
      this.getManager(manager).getRepository(AuthenticationDao),
      this.organizationId
    )
  }

  public buildUserRepository(manager?: EntityManager): UserRepository {
    return new UserRepositoryImpl(
      this.getManager(manager).getRepository(UserDao),
      this.organizationId
    )
  }

  public buildProductTypeRepository(manager?: EntityManager): ProductTypeRepository {
    return new ProductTypeRepositoryImpl(
      this.getManager(manager).getRepository(ProductTypeDao),
      this.organizationId
    )
  }

  public buildOrganizationRepository(manager?: EntityManager): OrganizationRepository {
    return new OrganizationRepositoryImpl(
      this.getManager(manager).getRepository(OrganizationDao),
      this.organizationId
    )
  }

  public buildUserOrganizationRepository(manager?: EntityManager): UserOrganizationRepository {
    return new UserOrganizationRepositoryImpl(
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
