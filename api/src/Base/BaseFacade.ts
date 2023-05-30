import { ServiceFactory } from '../Shared/Factories/ServiceFactory'

export abstract class BaseFacade {
  constructor(protected readonly serviceFactory: ServiceFactory) {}
}
