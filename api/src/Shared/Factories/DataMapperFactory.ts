import { AuthenticationDataMapper } from '../../Infra/DataMappers/AuthenticationDataMapper'
import { OrganizationDataMapper } from '../../Infra/DataMappers/OrganizationDataMapper'
import { UserDataMapper } from '../../Infra/DataMappers/UserDataMapper'
import { UserDataMapperMediator } from '../../Infra/DataMappers/UserDataMapperMediator'
import { UserOrganizationDataMapper } from '../../Infra/DataMappers/UserOrganizationDataMapper'

export class DataMapperFactory {
  public buildUserDataMapper() {
    return new UserDataMapper()
  }

  public buildUserDataMapperMediator() {
    return new UserDataMapperMediator(
      this.buildUserDataMapper(),
      this.buildUserOrganizationDataMapper()
    )
  }

  public buildUserOrganizationDataMapper() {
    return new UserOrganizationDataMapper(
      this.buildUserDataMapper(),
      this.buildOrganizationDataMapper()
    )
  }

  public buildAuthenticationDataMapper() {
    return new AuthenticationDataMapper(this.buildUserOrganizationDataMapper())
  }

  public buildOrganizationDataMapper() {
    return new OrganizationDataMapper()
  }
}
