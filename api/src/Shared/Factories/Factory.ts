import { Postgres } from '../../Database/Postgres'
import { ProviderFactory } from './ProviderFactory'
import { RepositoryFactory } from './RepositoryFactory'
import { ServiceFactory } from './ServiceFactory'

export class Factory {
  private static instance: Factory

  private constructor() {}

  public buildProviderFactory() {
    return new ProviderFactory()
  }

  public buildRepositoryFactory(organizationId: string) {
    return new RepositoryFactory(Postgres.getDataSource(), organizationId)
  }

  public async buildServiceFactory(organizationId: string) {
    return new ServiceFactory(await this.buildRepositoryFactory(organizationId))
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Factory()
    }

    return this.instance
  }
}
