import { DataSource } from 'typeorm'
import { BaseService } from '../Base/BaseService'
import { CustomerService } from '../Customer/CustomerService'
import { JWT } from '../Shared/Modules/JWT'
import { UserService } from '../User/UserService'
import { AuthenticationRepository } from './AuthenticationRepository'
import { AuthenticationCreateDto } from './Dto/AuthenticationCreateDto'
import { AuthenticationTokenDto } from './Dto/AuthenticationTokenDto'
import { AuthenticationStatusEnum } from './Enums/AuthenticationStatusEnum'
import { Authentication } from './Models/Authentication'

export class AuthenticationService extends BaseService {
  constructor(
    dataSource: DataSource,
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly userService: UserService,
    private readonly customerService: CustomerService,
    private readonly jwt: JWT
  ) {
    super(dataSource)
  }

  async logout(id: string) {
    await this.authenticationRepository.delete(id)
  }

  async authenticate(data: AuthenticationCreateDto) {
    const authenticate = data.isCustomer
      ? await this.authenticateCustomer(data)
      : await this.authenticateUser(data)

    return await this.authenticationRepository.create(authenticate)
  }

  private async authenticateCustomer(data: AuthenticationCreateDto): Promise<Authentication> {
    const customer = await this.customerService.findOneByAuthData(data)

    const jwtTokenData: AuthenticationTokenDto = {
      customer: {
        id: customer.getId(),
        name: customer.getName(),
        email: customer.getEmail(),
        phone: customer.getPhone()
      },
      organization: {
        id: customer.getOrganization().getId()
      }
    }

    const token = this.jwt.sign(jwtTokenData)

    return new Authentication(token, data.device, AuthenticationStatusEnum.ENABLED, null, customer)
  }

  private async authenticateUser(data: AuthenticationCreateDto): Promise<Authentication> {
    const user = await this.userService.findOneByAuthData(data)

    const userOrganization = user.getAllOrganizations()?.[0]

    const jwtTokenData: AuthenticationTokenDto = {
      user: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        roleType: userOrganization.getRoleType()
      },
      organization: {
        id: userOrganization.getOrganization().getId()
      }
    }

    const token = this.jwt.sign(jwtTokenData)

    return new Authentication(
      token,
      data.device,
      AuthenticationStatusEnum.ENABLED,
      userOrganization
    )
  }
}
