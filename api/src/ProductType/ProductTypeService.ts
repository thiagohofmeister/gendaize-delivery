import { DataSource } from 'typeorm'
import { BaseService } from '../Base/BaseService'
import { Organization } from '../Organization/Models/Organization'
import { DataNotFoundException } from '../Shared/Models/Exceptions/DataNotFoundException'
import { FilterDefault } from '../Shared/Models/Interfaces/FilterDefault'
import { ProductTypeCreateDto } from './Dto/ProductTypeCreateDto'
import { ProductType } from './Models/ProductType'
import { ProductTypeRepository } from './ProductTypeRepository'
import { ProductTypeValidator } from './ProductTypeValidator'

export class ProductTypeService extends BaseService {
  constructor(
    dataSource: DataSource,
    private readonly repository: ProductTypeRepository,
    private readonly validator: ProductTypeValidator
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

  public async create(
    organization: Organization,
    data: ProductTypeCreateDto
  ): Promise<ProductType> {
    await this.validator.productTypeCreatePayloadValidate(data)

    const productType = new ProductType(data.label, organization)

    return this.repository.save(productType)
  }
}
