import { AuthenticationService } from '../../Authentication/AuthenticationService'
import { EndpointPermissionsService } from '../../EndpointPermissions/EndpointPermissionsService'
import { OrganizationService } from '../../Organization/OrganizationService'
import { OrganizationValidator } from '../../Organization/OrganizationValidator'
import { ProductTypeService } from '../../ProductType/ProductTypeService'
import { ProductTypeValidator } from '../../ProductType/ProductTypeValidator'
import { RegisterService } from '../../Register/RegisterService'
import { RegisterValidator } from '../../Register/RegisterValidator'
import { UserService } from '../../User/UserService'
import { UserValidator } from '../../User/UserValidator'
import { JWT } from '../Modules/JWT'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  public buildEndpointPermissionsService() {
    return new EndpointPermissionsService()
  }

  public buildAuthenticationService() {
    return new AuthenticationService(
      this.repositoryFactory.buildAuthenticationRepository(),
      this.buildUserService(),
      this.repositoryFactory.buildUserOrganizationRepository(),
      new JWT(process.env.JWT_KEY)
    )
  }

  public buildOrganizationService() {
    return new OrganizationService(
      this.repositoryFactory.buildOrganizationRepository(),
      new OrganizationValidator()
    )
  }

  public buildRegisterService() {
    return new RegisterService(
      this.buildUserService(),
      this.buildOrganizationService(),
      new RegisterValidator()
    )
  }

  public buildUserService() {
    return new UserService(this.repositoryFactory.buildUserRepository(), new UserValidator())
  }

  public buildProductTypeService() {
    return new ProductTypeService(
      this.repositoryFactory.buildProductTypeRepository(),
      new ProductTypeValidator()
    )
  }
}
