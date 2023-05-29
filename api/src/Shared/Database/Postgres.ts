import * as path from 'path'
import * as typeORM from 'typeorm'
import { DataSource } from 'typeorm'

export class Postgres {
  private static dataSource: DataSource

  constructor() {}

  public async createDataSource() {
    Postgres.dataSource = new typeORM.DataSource({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        path.join(__dirname, '..', '..', 'Infra', 'Models', '*.ts'),
        path.join(__dirname, '..', '..', 'Infra', 'Models', '*.js')
      ],
      logging: true
    })

    try {
      await Postgres.dataSource.initialize()
      console.info('Database Postgres initialized.')
    } catch (e) {
      console.error('Error to initialize Database Postgres:', { e })
    }
  }

  public static getDataSource(): DataSource {
    return this.dataSource
  }
}
