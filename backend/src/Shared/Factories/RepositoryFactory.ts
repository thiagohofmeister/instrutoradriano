import { DataSource, EntityManager } from 'typeorm'

import { StudentRepository } from '../../Domain/Student/Repositories/StudentRepository'
import { StudentDao } from '../../Infra/Models/StudentDao'
import { StudentRepositoryImpl } from '../../Infra/Repositories/StudentRepositoryImpl'
import { DataMapperFactory } from './DataMapperFactory'

export class RepositoryFactory {
  constructor(
    private readonly dataMapperFactory: DataMapperFactory,
    private readonly dataSource: DataSource
  ) {}

  public buildStudentRepository(manager?: EntityManager): StudentRepository {
    return new StudentRepositoryImpl(
      this.getManager(manager).getMongoRepository(StudentDao),
      this.dataMapperFactory.buildStudentDataMapper()
    )
  }

  public getDataSource() {
    return this.dataSource
  }

  private getManager(manager?: EntityManager) {
    if (manager) return manager

    return this.dataSource.manager
  }
}
