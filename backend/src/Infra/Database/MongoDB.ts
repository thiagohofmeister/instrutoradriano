import * as path from 'path'
import { DataSource } from 'typeorm'
import * as typeORM from 'typeorm'

export class MongoDB {
  private static dataSource: DataSource

  public async createDataSource() {
    let auth: any = {
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT) || 27017,
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASS
    }

    if (process.env.NODE_ENV !== 'dev') {
      auth = {
        url: process.env.MONGODB_URL,
        ssl: true
      }
    }

    MongoDB.dataSource = new typeORM.DataSource({
      type: 'mongodb',
      ...auth,
      database: process.env.MONGODB_DATABASE || 'instrutoradriano',
      entities: [
        path.join(__dirname, '..', 'Models', '*.ts'),
        path.join(__dirname, '..', 'Models', '*.js')
      ],
      logging: true
    })

    try {
      await MongoDB.dataSource.initialize()
      console.info('Database MongoDB initialized.')
    } catch (e) {
      console.error('Error to initialize Database MongoDB:', { e })
    }
  }

  public static getDataSource(): DataSource {
    return this.dataSource
  }
}
