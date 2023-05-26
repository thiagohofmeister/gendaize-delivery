import { DataSource, EntityManager } from 'typeorm'

import { AuthenticationRepository } from '../../Domain/Authentication/Repositories/AuthenticationRepository'
import { OrganizationRepository } from '../../Domain/Organization/Repositories/OrganizationRepository'
import { UserRepository } from '../../Domain/User/Repositories/UserRepository'
import { UserOrganizationRepository } from '../../Domain/UserOrganization/Repositories/UserOrganizationRepository'
import { AuthenticationDao } from '../../Infra/Models/AuthenticationDao'
import { OrganizationDao } from '../../Infra/Models/OrganizationDao'
import { UserDao } from '../../Infra/Models/UserDao'
import { UserOrganizationDao } from '../../Infra/Models/UserOrganizationDao'
import { AuthenticationRepositoryImpl } from '../../Infra/Repositories/AuthenticationRepositoryImpl'
import { OrganizationRepositoryImpl } from '../../Infra/Repositories/OrganizationRepositoryImpl'
import { UserOrganizationRepositoryImpl } from '../../Infra/Repositories/UserOrganizationRepositoryImpl'
import { UserRepositoryImpl } from '../../Infra/Repositories/UserRepositoryImpl'
import { DataMapperFactory } from './DataMapperFactory'

export class RepositoryFactory {
  constructor(
    private readonly dataMapperFactory: DataMapperFactory,
    private readonly dataSource: DataSource,
    private readonly organizationId: string
  ) {}

  public buildAuthenticationRepository(manager?: EntityManager): AuthenticationRepository {
    return new AuthenticationRepositoryImpl(
      this.getManager(manager).getRepository(AuthenticationDao),
      this.dataMapperFactory.buildAuthenticationDataMapper(),
      this.organizationId
    )
  }

  public buildUserRepository(manager?: EntityManager): UserRepository {
    return new UserRepositoryImpl(
      this.getManager(manager).getRepository(UserDao),
      this.dataMapperFactory.buildUserDataMapperMediator(),
      this.organizationId
    )
  }

  public buildOrganizationRepository(manager?: EntityManager): OrganizationRepository {
    return new OrganizationRepositoryImpl(
      this.getManager(manager).getRepository(OrganizationDao),
      this.dataMapperFactory.buildOrganizationDataMapper(),
      this.organizationId
    )
  }

  public buildUserOrganizationRepository(manager?: EntityManager): UserOrganizationRepository {
    return new UserOrganizationRepositoryImpl(
      this.getManager(manager).getRepository(UserOrganizationDao),
      this.dataMapperFactory.buildUserOrganizationDataMapper(),
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
