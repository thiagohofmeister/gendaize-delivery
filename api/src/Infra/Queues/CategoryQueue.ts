import { AmqpQueueContract } from '../../Shared/Modules/Queue/AmqpQueueContract'

export class CategoryQueue extends AmqpQueueContract<any> {
  constructor(url: string) {
    super(url, 'category')
  }
}
