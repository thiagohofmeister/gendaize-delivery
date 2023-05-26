import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { UserRoleTypeEnum } from '../../Domain/User/Enums/UserRoleTypeEnum'
import { UserOrganizationStatusEnum } from '../../Domain/UserOrganization/Enums/UserOrganizationStatusEnum'
import { AuthenticationDao } from './AuthenticationDao'
import { OrganizationDao } from './OrganizationDao'
import { UserDao } from './UserDao'

@Entity('user_organization')
export class UserOrganizationDao {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => UserDao, user => user.userOrganizations)
  @JoinColumn({
    name: 'user_id'
  })
  user: UserDao

  @ManyToOne(() => OrganizationDao, organization => organization.userOrganizations)
  @JoinColumn({
    name: 'organization_id'
  })
  organization: OrganizationDao

  @Column({
    type: 'enum',
    enum: UserRoleTypeEnum,
    name: 'role_type'
  })
  roleType: UserRoleTypeEnum

  @Column({
    type: 'enum',
    enum: UserOrganizationStatusEnum
  })
  status: UserOrganizationStatusEnum

  @OneToMany(() => AuthenticationDao, authentication => authentication.userOrganization)
  @JoinColumn({
    name: 'user_organization_id'
  })
  authentications: AuthenticationDao[]

  constructor(
    id: string,
    status: UserOrganizationStatusEnum,
    roleType: UserRoleTypeEnum,
    user: UserDao,
    organization: OrganizationDao
  ) {
    this.id = id
    this.status = status
    this.roleType = roleType
    this.user = user
    this.organization = organization
  }
}
