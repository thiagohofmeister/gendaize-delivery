import { Postgres } from '../../Infra/Database/Postgres'
import { DataMapperFactory } from './DataMapperFactory'
import { FacadeFactory } from './FacadeFactory'
import { ProviderFactory } from './ProviderFactory'
import { QueueFactory } from './QueueFactory'
import { RepositoryFactory } from './RepositoryFactory'
import { ServiceFactory } from './ServiceFactory'

export class Factory {
  private static instance: Factory

  private constructor() {}

  public buildFacadeFactory(organizationId: string) {
    return new FacadeFactory(this.buildServiceFactory(organizationId))
  }

  public buildProviderFactory() {
    return new ProviderFactory()
  }

  public buildRepositoryFactory(organizationId: string) {
    return new RepositoryFactory(
      this.buildDataMapperFactory(),
      Postgres.getDataSource(),
      organizationId
    )
  }

  public buildServiceFactory(organizationId: string) {
    return new ServiceFactory(this.buildRepositoryFactory(organizationId), this.buildQueueFactory())
  }

  public buildDataMapperFactory() {
    return new DataMapperFactory()
  }

  public buildQueueFactory() {
    return new QueueFactory(process.env.QUEUE_URL)
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Factory()
    }

    return this.instance
  }
}
