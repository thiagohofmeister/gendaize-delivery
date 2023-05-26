import { JWT } from '../../Shared/Modules/JWT'
import { UserRoleTypeEnum } from '../User/Enums/UserRoleTypeEnum'
import { UserService } from '../User/UserService'
import { UserOrganizationRepository } from '../UserOrganization/Repositories/UserOrganizationRepository'
import { AuthenticationCreateDto } from './Dto/AuthenticationCreateDto'
import { AuthenticationTokenDto } from './Dto/AuthenticationTokenDto'
import { AuthenticationStatusEnum } from './Enums/AuthenticationStatusEnum'
import { Authentication } from './Models/Authentication'
import { AuthenticationRepository } from './Repositories/AuthenticationRepository'

export class AuthenticationService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly userService: UserService,
    private readonly userOrganizationRepository: UserOrganizationRepository,
    private readonly jwt: JWT
  ) {}

  async create(data: AuthenticationCreateDto) {
    const user = await this.userService.findOneByAuthData(data)

    const userOrganization = user
      .getAllOrganizations()
      .filter(usrOrg =>
        data.isCustomer
          ? usrOrg.getRoleType() === UserRoleTypeEnum.CUSTOMER
          : usrOrg.getRoleType() !== UserRoleTypeEnum.CUSTOMER
      )?.[0]

    const jwtTokenData: AuthenticationTokenDto = {
      user: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        roleType: userOrganization.getRoleType()
      },
      organization: userOrganization
        ? {
            id: userOrganization.getOrganization().getId()
          }
        : null
    }

    const token = this.jwt.sign(jwtTokenData)

    return await this.authenticationRepository.create(
      new Authentication(token, data.device, AuthenticationStatusEnum.ENABLED, userOrganization)
    )
  }
}
