import { AuthenticationFacade } from '../../Authentication/AuthenticationFacade'
import { OrganizationFacade } from '../../Organization/OrganizationFacade'
import { ProductTypeFacade } from '../../ProductType/ProductTypeFacade'
import { RegisterFacade } from '../../Register/RegisterFacade'
import { UserFacade } from '../../User/UserFacade'
import { ServiceFactory } from './ServiceFactory'

export class FacadeFactory {
  constructor(private readonly serviceFactory: ServiceFactory) {}

  public buildRegisterFacade() {
    return new RegisterFacade(this.serviceFactory)
  }

  public buildAuthenticationFacade() {
    return new AuthenticationFacade(this.serviceFactory)
  }

  public buildOrganizationFacade() {
    return new OrganizationFacade(this.serviceFactory)
  }

  public buildUserFacade() {
    return new UserFacade(this.serviceFactory)
  }

  public buildProductTypeFacade() {
    return new ProductTypeFacade(this.serviceFactory)
  }
}
