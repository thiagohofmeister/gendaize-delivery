export interface ApiContext {
  organizationId?: string
  isCustomer?: boolean
  user?: {
    id?: string
    email?: string
    roleType: string
  }
}
