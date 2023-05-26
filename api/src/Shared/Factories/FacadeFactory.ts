import { AuthenticationFacade } from '../../Domain/Authentication/AuthenticationFacade'
import { OrganizationFacade } from '../../Domain/Organization/OrganizationFacade'
import { RegisterFacade } from '../../Domain/Register/RegisterFacade'
import { UserFacade } from '../../Domain/User/UserFacade'
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
}
