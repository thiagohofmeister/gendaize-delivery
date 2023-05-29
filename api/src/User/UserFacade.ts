import { FacadeContract } from '../Shared/Facades/FacadeContract'

export class UserFacade extends FacadeContract {
  async getById(id: string) {
    return this.serviceFactory.buildUserService().getById(id)
  }
}
