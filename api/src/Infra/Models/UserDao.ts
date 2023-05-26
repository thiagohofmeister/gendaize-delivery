import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm'
import { UserStatusEnum } from '../../Domain/User/Enums/UserStatusEnum'
import { UserOrganizationDao } from './UserOrganizationDao'

@Entity('user')
export class UserDao {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({
    name: 'document_number'
  })
  documentNumber: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: UserStatusEnum
  })
  status: UserStatusEnum

  @OneToMany(() => UserOrganizationDao, userOrganization => userOrganization.user, {
    cascade: true
  })
  @JoinColumn({
    name: 'user_id'
  })
  userOrganizations: UserOrganizationDao[]

  constructor(
    id: string,
    name: string,
    documentNumber: string,
    email: string,
    password: string,
    status: UserStatusEnum
  ) {
    this.id = id
    this.name = name
    this.documentNumber = documentNumber
    this.email = email
    this.password = password
    this.status = status
  }
}
