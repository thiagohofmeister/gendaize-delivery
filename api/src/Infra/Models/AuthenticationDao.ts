import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { AuthenticationStatusEnum } from '../../Domain/Authentication/Enums/AuthenticationStatusEnum'
import { UserOrganizationDao } from './UserOrganizationDao'

@Entity('authentication')
export class AuthenticationDao {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => UserOrganizationDao, userOrganization => userOrganization.authentications)
  @JoinColumn({
    name: 'user_organization_id'
  })
  userOrganization: UserOrganizationDao

  @Column()
  device: string

  @Column()
  token: string

  @Column({
    type: 'enum',
    enum: AuthenticationStatusEnum
  })
  status: AuthenticationStatusEnum

  constructor(
    id: string,
    device: string,
    status: AuthenticationStatusEnum,
    token: string,
    userOrganization: UserOrganizationDao
  ) {
    this.id = id
    this.device = device
    this.status = status
    this.token = token
    this.userOrganization = userOrganization
  }
}
