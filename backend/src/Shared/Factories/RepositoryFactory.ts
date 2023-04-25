import { DataSource, EntityManager } from 'typeorm'
import { ConfigurationRepository } from '../../Domain/Configuration/Repositories/ConfigurationRepository'
import { ScheduleRepository } from '../../Domain/Schedule/Repositories/ScheduleRepository'

import { StudentRepository } from '../../Domain/Student/Repositories/StudentRepository'
import { ConfigurationDao } from '../../Infra/Models/ConfigurationDao'
import { ScheduleDao } from '../../Infra/Models/ScheduleDao'
import { StudentDao } from '../../Infra/Models/StudentDao'
import { ConfigurationRepositoryImpl } from '../../Infra/Repositories/ConfigurationRepositoryImpl'
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

  public buildConfigurationRepository(manager?: EntityManager): ConfigurationRepository {
    return new ConfigurationRepositoryImpl(
      this.getManager(manager).getMongoRepository(ConfigurationDao),
      this.dataMapperFactory.buildConfigurationDataMapper()
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
