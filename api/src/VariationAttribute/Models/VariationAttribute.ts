import { randomUUID } from 'crypto'
import { Attribute } from '../../Attribute/Models/Attribute'
import { DomainModel } from '../../Shared/Models/DomainModel'
import { ResponseModel } from '../../Shared/Models/ResponseModel'
import { Variation } from '../../Variation/Models/Variation'
import { VariationAttributeDao } from './VariationAttributeDao'

export class VariationAttribute implements ResponseModel, DomainModel {
  constructor(
    private value: string,
    private variation?: Variation,
    private attribute?: Attribute,
    private id?: string
  ) {
    if (!id) this.id = randomUUID()
  }

  public getId(): string {
    return this.id
  }

  public getVariation(): Variation {
    return this.variation
  }

  public getAttribute(): Attribute {
    return this.attribute
  }

  public getValue(): string {
    return this.value
  }

  toView() {
    return {
      id: this.getId(),
      value: this.getValue(),
      variation: this.getVariation()?.toView(),
      attribute: this.getAttribute()?.toView()
    }
  }

  toDao() {
    return new VariationAttributeDao(
      this.getId(),
      this.getValue(),
      this.getVariation()?.toDao(),
      this.getAttribute()?.toDao()
    )
  }
}
