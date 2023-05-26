import { CategorySavedEventDto } from '../../Domain/Category/Dto/CategorySavedEventDto'
import { AmqpQueueContract } from '../../Shared/Modules/Queue/AmqpQueueContract'

export class CategoryQueue extends AmqpQueueContract<CategorySavedEventDto> {
  constructor(url: string) {
    super(url, 'category')
  }
}
