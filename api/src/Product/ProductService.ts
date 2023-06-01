import { DataSource } from 'typeorm'
import { BaseService } from '../Base/BaseService'
import { Organization } from '../Organization/Models/Organization'
import { ProductTypeService } from '../ProductType/ProductTypeService'
import { DataNotFoundException } from '../Shared/Models/Exceptions/DataNotFoundException'
import { FilterDefault } from '../Shared/Models/Interfaces/FilterDefault'
import { ProductCreateDto } from './Dto/ProductCreateDto'
import { Product } from './Models/Product'
import { ProductRepository } from './ProductRepository'
import { ProductValidator } from './ProductValidator'

export class ProductService extends BaseService {
  constructor(
    dataSource: DataSource,
    private readonly repository: ProductRepository,
    private readonly validator: ProductValidator,
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

  public async create(organization: Organization, data: ProductCreateDto): Promise<Product> {
    await this.validator.productCreatePayloadValidate(data)

    const productType = await this.productTypeService.getById(data.productTypeId)

    const product = new Product(
      data.name,
      data.description,
      data.variationTemplate,
      data.status,
      productType,
      organization
    )

    return this.repository.save(product)
  }
}
