import { EntityManager } from 'typeorm'

import { AuthenticationService } from '../../Domain/Authentication/AuthenticationService'
import { EndpointPermissionsService } from '../../Domain/EndpointPermissions/EndpointPermissionsService'
import { OrganizationService } from '../../Domain/Organization/OrganizationService'
import { OrganizationValidator } from '../../Domain/Organization/OrganizationValidator'
import { RegisterService } from '../../Domain/Register/RegisterService'
import { RegisterValidator } from '../../Domain/Register/RegisterValidator'
import { UserService } from '../../Domain/User/UserService'
import { UserValidator } from '../../Domain/User/UserValidator'
import { JWT } from '../Modules/JWT'
import { TransactionalService } from '../Services/TransactionalService'
import { QueueFactory } from './QueueFactory'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly queueFactory: QueueFactory
  ) {}

  public buildEndpointPermissionsService() {
    return new EndpointPermissionsService()
  }

  public buildAuthenticationService(manager?: EntityManager) {
    return new AuthenticationService(
      this.repositoryFactory.buildAuthenticationRepository(manager),
      this.buildUserService(manager),
      this.repositoryFactory.buildUserOrganizationRepository(manager),
      new JWT(process.env.JWT_KEY)
    )
  }

  public buildOrganizationService(manager?: EntityManager) {
    return new OrganizationService(
      this.repositoryFactory.buildOrganizationRepository(manager),
      new OrganizationValidator()
    )
  }

  public buildRegisterService(manager?: EntityManager) {
    return new RegisterService(
      this.buildUserService(manager),
      this.buildOrganizationService(manager),
      new RegisterValidator()
    )
  }

  public buildUserService(manager?: EntityManager) {
    return new UserService(this.repositoryFactory.buildUserRepository(manager), new UserValidator())
  }

  public buildTransactionalService() {
    return new TransactionalService(this.repositoryFactory.getDataSource())
  }
}
