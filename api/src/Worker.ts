import * as dotenv from 'dotenv'
import { Postgres } from './Shared/Database/Postgres'
import { Factory } from './Shared/Factories/Factory'
import { QueueFactory } from './Shared/Factories/QueueFactory'

class Worker {
  private queueFactory: QueueFactory

  constructor() {
    dotenv.config()

    this.queueFactory = Factory.getInstance().buildQueueFactory()
  }

  private async beforeStart() {
    await new Postgres().createDataSource()
  }

  public async start() {
    await this.beforeStart()

    // const categoryQueue = this.queueFactory.buildCategoryQueue()
    // categoryQueue.consume(Consumer.getInstance().consume)
  }
}

new Worker().start()
