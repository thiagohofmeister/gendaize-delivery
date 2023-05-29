import { FacadeContract } from '../Shared/Facades/FacadeContract'
import { RegisterCreateDto } from './Dto/RegisterCreateDto'

export class RegisterFacade extends FacadeContract {
  public async create(data: RegisterCreateDto) {
    return this.serviceFactory.buildTransactionalService().execute(async manager => {
      return await this.serviceFactory.buildRegisterService(manager).create(data)
    })
  }
}
