import { Organization } from '../Organization/Models/Organization'
import { DataNotFoundException } from '../Shared/Models/Exceptions/DataNotFoundException'
import { ProductTypeCreateDto } from './Dto/ProductTypeCreateDto'
import { ProductType } from './Models/ProductType'
import { ProductTypeValidator } from './ProductTypeValidator'
import { ProductTypeRepository } from './Repositories/ProductTypeRepository'

export class ProductTypeService {
  constructor(
    private readonly repository: ProductTypeRepository,
    private readonly validator: ProductTypeValidator
  ) {}

  async getById(id: string) {
    const result = await this.repository.findOneByPrimaryColumn(id)

    if (!result) throw new DataNotFoundException()

    return result
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
