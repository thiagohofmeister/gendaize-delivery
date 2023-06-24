import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { OrganizationDao } from '../../Organization/Models/OrganizationDao'
import { DaoModel } from '../../Shared/Models/DaoModel'
import { TaxTypeEnum } from '../Enums/TaxTypeEnum'
import { TaxValueTypeEnum } from '../Enums/TaxValueTypeEnum'
import { Tax } from './Tax'

@Entity('tax')
export class TaxDao implements DaoModel {
  @PrimaryColumn()
  id: string

  @Column()
  label: string

  @Column({
    type: 'enum',
    enum: TaxTypeEnum
  })
  type: TaxTypeEnum

  @Column({
    type: 'enum',
    enum: TaxValueTypeEnum,
    name: 'value_type'
  })
  valueType: TaxValueTypeEnum

  @Column()
  value: number

  @Column({
    name: 'value_details'
  })
  valueDetails: number

  @ManyToOne(() => OrganizationDao, organization => organization.taxes)
  @JoinColumn({
    name: 'organization_id'
  })
  organization: OrganizationDao

  constructor(
    id: string,
    label: string,
    type: TaxTypeEnum,
    valueType: TaxValueTypeEnum,
    value: number,
    valueDetails: number,
    organization?: OrganizationDao
  ) {
    this.id = id
    this.label = label
    this.type = type
    this.valueType = valueType
    this.value = value
    this.valueDetails = valueDetails
    this.organization = organization
  }

  toDomain() {
    return new Tax(
      this.label,
      this.type,
      this.valueType,
      this.value / 100,
      this.valueDetails,
      this.organization?.toDomain(),
      this.id
    )
  }
}
