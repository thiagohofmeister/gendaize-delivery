import { DataSource } from 'typeorm'
import { BaseService } from '../Base/BaseService'
import { Organization } from '../Organization/Models/Organization'
import { ProductTypeService } from '../ProductType/ProductTypeService'
import { DataNotFoundException } from '../Shared/Models/Exceptions/DataNotFoundException'
import { FilterDefault } from '../Shared/Models/Interfaces/FilterDefault'
import { AttributeRepository } from './AttributeRepository'
import { AttributeValidator } from './AttributeValidator'
import { AttributeCreateDto } from './Dto/AttributeCreateDto'
import { Attribute } from './Models/Attribute'

export class AttributeService extends BaseService {
  constructor(
    dataSource: DataSource,
    private readonly repository: AttributeRepository,
    private readonly validator: AttributeValidator,
    private readonly productTypeService: ProductTypeService
  ) {
    super(dataSource)
  }

  async getById(id: string) {
    const result = await this.repository.findOneByPrimaryColumn(id)

    if (!result) throw new DataNotFoundException()

    return result
  }

  async get(filter: FilterDefault) {
    return this.repository.findAll(filter)
  }

  async delete(id: string) {
    await this.repository.delete(id)
  }

  public async create(organization: Organization, data: AttributeCreateDto): Promise<Attribute> {
    await this.validator.attributeCreatePayloadValidate(data)

    const productType = await this.productTypeService.getById(data.productTypeId)

    const attribute = new Attribute(
      data.label,
      data.type,
      data.subType,
      data.subTypeValues,
      data.values,
      productType,
      organization
    )

    return this.repository.save(attribute)
  }
}
