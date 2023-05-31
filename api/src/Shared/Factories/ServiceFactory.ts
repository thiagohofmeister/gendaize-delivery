import { AttributeService } from '../../Attribute/AttributeService'
import { AttributeValidator } from '../../Attribute/AttributeValidator'
import { AuthenticationService } from '../../Authentication/AuthenticationService'
import { CustomerService } from '../../Customer/CustomerService'
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
      this.repositoryFactory.getDataSource(),
      this.repositoryFactory.buildRepository('Authentication'),
      this.buildUserService(),
      this.buildCustomerService(),
      new JWT(process.env.JWT_KEY)
    )
  }

  public buildOrganizationService() {
    return new OrganizationService(
      this.repositoryFactory.getDataSource(),
      this.repositoryFactory.buildRepository('Organization'),
      new OrganizationValidator()
    )
  }

  public buildRegisterService() {
    return new RegisterService(
      this.repositoryFactory.getDataSource(),
      this.buildUserService(),
      this.buildOrganizationService(),
      new RegisterValidator()
    )
  }

  public buildUserService() {
    return new UserService(
      this.repositoryFactory.getDataSource(),
      this.repositoryFactory.buildRepository('User'),
      new UserValidator()
    )
  }

  public buildCustomerService() {
    return new CustomerService(
      this.repositoryFactory.getDataSource(),
      this.repositoryFactory.buildRepository('Customer')
    )
  }

  public buildProductTypeService() {
    return new ProductTypeService(
      this.repositoryFactory.getDataSource(),
      this.repositoryFactory.buildRepository('ProductType'),
      new ProductTypeValidator()
    )
  }

  public buildAttributeService() {
    return new AttributeService(
      this.repositoryFactory.getDataSource(),
      this.repositoryFactory.buildRepository('Attribute'),
      new AttributeValidator(),
      this.buildProductTypeService()
    )
  }
}
