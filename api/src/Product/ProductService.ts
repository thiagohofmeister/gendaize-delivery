import { DataSource } from 'typeorm'
import { AttributeService } from '../Attribute/AttributeService'
import { BaseService } from '../Base/BaseService'
import { Organization } from '../Organization/Models/Organization'
import { ProductTypeService } from '../ProductType/ProductTypeService'
import { DataNotFoundException } from '../Shared/Models/Exceptions/DataNotFoundException'
import { InvalidDataException } from '../Shared/Models/Exceptions/InvalidDataException'
import { ErrorReason } from '../Shared/Models/Interfaces/ErrorReason'
import { FilterDefault } from '../Shared/Models/Interfaces/FilterDefault'
import { Variation } from '../Variation/Models/Variation'
import { VariationAttribute } from '../VariationAttribute/Models/VariationAttribute'
import { ProductCreateDto } from './Dto/ProductCreateDto'
import { ProductVariationTemplateDto } from './Dto/ProductVariationTemplateDto'
import { Product } from './Models/Product'
import { ProductRepository } from './ProductRepository'
import { ProductValidator } from './ProductValidator'

export class ProductService extends BaseService {
  constructor(
    dataSource: DataSource,
    private readonly repository: ProductRepository,
    private readonly validator: ProductValidator,
    private readonly productTypeService: ProductTypeService,
    private readonly attributeService: AttributeService
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

    // Product without variationTemplate cannot be created with more than one variation
    this.validator.validateVariationsQuantityByVariationTemplate(
      data.variations.length,
      data.variationTemplate
    )

    const productType = await this.productTypeService.getById(data.productTypeId)

    const product = new Product(
      data.name,
      data.description,
      data.variationTemplate,
      data.status,
      productType,
      organization
    )

    await this.fillVariations(product, data.variationTemplate, data.variations)

    return this.repository.save(product)
  }

  private async fillVariations(
    product: Product,
    variationTemplate: ProductVariationTemplateDto,
    variations: ProductCreateDto['variations']
  ) {
    const errorReasons: ErrorReason[] = []

    await Promise.all(
      variations.map(async (variationDto, variationIndex) => {
        const variation = new Variation(
          variationDto.code,
          variationDto.priceList,
          variationDto.priceSale,
          variationDto.status
        )

        // When the product has variationTemplate
        // then each variation must have attributes contained in the templateVariation
        await this.validator.validateVariationHavingAttributesOfVariationTemplate(
          variationDto.attributes,
          variationTemplate,
          errorReasons,
          variationIndex
        )

        await this.fillAttributes(
          variation,
          variationTemplate,
          variationDto.attributes,
          errorReasons,
          variationIndex
        )

        product.addVariation(variation)
      })
    )

    if (!!errorReasons.length) {
      throw new InvalidDataException('Error', errorReasons)
    }
  }

  private async getVariationCombinations(
    variationTemplate: ProductVariationTemplateDto,
    variations: Variation[],
    fieldCombination: 'images'
  ): Promise<string[]> {
    const variationCombinations = []

    // The attribute used in the combination must be having in the attributes of variationTemplate
    this.validator.validateIfCombinationAttributeIdExistsOnVariationTemplateAttributes(
      variationTemplate,
      fieldCombination
    )

    const partialCombinations = []
    for (const attr of variationTemplate.attributes) {
      partialCombinations.push(attr.id)
      if (attr.id === variationTemplate[fieldCombination]) {
        break
      }
    }

    return variations.map(variation => {
      const combination = []

      for (const partialCombination of partialCombinations) {
        combination.push(
          variation
            .getAttributes()
            .find(attr => attr.getAttribute().getId() === partialCombination)
            .getValue()
        )
      }

      return combination.join('+')
    })
  }

  private async fillAttributes(
    variation: Variation,
    variationTemplate: ProductVariationTemplateDto,
    attributes: ProductCreateDto['variations'][0]['attributes'],
    errorReasons: ErrorReason[],
    variationIndex: number
  ) {
    if (!attributes) {
      return
    }

    await Promise.all(
      attributes.map(async (attributeDto, attrIndex) => {
        try {
          const attribute = await this.attributeService.getById(attributeDto.attribute.id)

          // The value must be a one of the attribute values
          this.validator.validateIfValueExistsOnAttribute(
            attributeDto.value,
            attribute.getValues(),
            errorReasons,
            variationIndex,
            attrIndex
          )

          const variationAttribute = new VariationAttribute(attributeDto.value, null, attribute)

          // Fill label of attribute in the variationTemplate
          variationTemplate.attributes.find(attr => attr.id === attribute.getId()).label =
            attribute.getLabel()

          variation.addAttribute(variationAttribute)
        } catch (e) {
          errorReasons.push({
            id: `variations.${variationIndex}.attributes.${attrIndex}.attribute.id.${attributeDto.attribute.id}`,
            message: e.message
          })
        }
      })
    )
  }
}
