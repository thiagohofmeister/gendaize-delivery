import { InvalidDataException } from '../../Shared/Models/Exceptions/InvalidDataException'
import { OrganizationService } from '../Organization/OrganizationService'
import { UserService } from '../User/UserService'
import { RegisterCreateDto } from './Dto/RegisterCreateDto'
import { Register } from './Models/Register'
import { RegisterValidator } from './RegisterValidator'

export class RegisterService {
  constructor(
    private readonly userService: UserService,
    private readonly organizationService: OrganizationService,
    private readonly validator: RegisterValidator
  ) {}

  public async create(data: RegisterCreateDto) {
    await this.validator.registerCreatePayloadValidate(data)

    const invalidDataException = new InvalidDataException('Invalid data.')

    await this.validateIfUserAlreadyExists(data.user.documentNumber, invalidDataException)

    await this.validateIfOrganizationAlreadyExists(
      data.organization.document.number,
      invalidDataException
    )

    if (!!invalidDataException.getReasons().length) {
      throw invalidDataException
    }

    const organization = await this.organizationService.create(data.organization)

    const user = await this.userService.create(organization, data.user)

    return new Register(user, organization)
  }

  private async validateIfUserAlreadyExists(
    documentNumber: string,
    invalidDataException: InvalidDataException
  ) {
    if (!(await this.userService.findOneByDocumentNumber(documentNumber))) return

    invalidDataException.addReason({
      id: `user.documentNumber.${documentNumber}.alreadyExists`,
      message: `Field user.documentNumber.${documentNumber} is already exists.`
    })
  }

  private async validateIfOrganizationAlreadyExists(
    documentNumber: string,
    invalidDataException: InvalidDataException
  ) {
    if (!(await this.userService.findOneByDocumentNumber(documentNumber))) return

    invalidDataException.addReason({
      id: `organization.document.number.${documentNumber}.alreadyExists`,
      message: `Field organization.document.number.${documentNumber} is already exists.`
    })
  }
}
