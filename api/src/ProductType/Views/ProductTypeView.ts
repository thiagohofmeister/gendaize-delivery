import { ViewContract } from '../../Shared/Views/Contracts/ViewContract'
import { ProductType } from '../Models/ProductType'

export class ProductTypeView extends ViewContract<ProductType, ProductTypeResponse> {}

interface ProductTypeResponse {
  id: string
  name: string
  documentNumber: string
  email: string
}
