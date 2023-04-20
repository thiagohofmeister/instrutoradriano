import { DataSource, EntityManager } from 'typeorm'
import { ScheduleRepository } from '../../Domain/Schedule/Repositories/ScheduleRepository'

import { StudentRepository } from '../../Domain/Student/Repositories/StudentRepository'
import { ScheduleDao } from '../../Infra/Models/ScheduleDao'
import { StudentDao } from '../../Infra/Models/StudentDao'
import { ScheduleRepositoryImpl } from '../../Infra/Repositories/ScheduleRepositoryImpl'
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

  public buildScheduleRepository(manager?: EntityManager): ScheduleRepository {
    return new ScheduleRepositoryImpl(
      this.getManager(manager).getMongoRepository(ScheduleDao),
      this.dataMapperFactory.buildScheduleDataMapper()
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
