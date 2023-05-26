import { randomUUID } from 'crypto'
import { ResponseModel } from '../../../Shared/Models/ResponseModel'
import { UserOrganization } from '../../UserOrganization/Models/UserOrganization'
import { AuthenticationStatusEnum } from '../Enums/AuthenticationStatusEnum'

export class Authentication implements ResponseModel {
  constructor(
    private token: string,
    private device: string,
    private status: AuthenticationStatusEnum,
    private userOrganization: UserOrganization,
    private id?: string
  ) {
    if (!id) this.id = randomUUID()
  }

  public getToken(): string {
    return this.token
  }

  public getDevice(): string {
    return this.device
  }

  public getStatus(): AuthenticationStatusEnum {
    return this.status
  }

  public getUserOrganization(): UserOrganization {
    return this.userOrganization
  }

  public getId(): string {
    return this.id
  }

  public toView() {
    return {
      id: this.getId(),
      token: this.getToken(),
      device: this.getDevice(),
      status: this.getStatus(),
      userOrganization: this.getUserOrganization()?.toView()
    }
  }
}
