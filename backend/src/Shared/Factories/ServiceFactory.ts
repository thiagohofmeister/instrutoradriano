import { EntityManager } from 'typeorm'
import { ConfigurationService } from '../../Domain/Configuration/ConfigurationService'
import { ConfigurationDictionary } from '../../Domain/Configuration/DTO/ConfigurationDictionaryDTO'
import { ScheduleService } from '../../Domain/Schedule/ScheduleService'
import { ScheduleValidator } from '../../Domain/Schedule/ScheduleValidator'

import { StudentService } from '../../Domain/Student/StudentService'
import { StudentValidator } from '../../Domain/Student/StudentValidator'
import { ZipCodeService } from '../../Domain/ZipCode/ZipCodeService'
import { TransactionalService } from '../Services/TransactionalService'
import { ProviderFactory } from './ProviderFactory'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly providerFactory: ProviderFactory,
    private readonly configs?: ConfigurationDictionary
  ) {}

  public buildStudentService(manager?: EntityManager) {
    return new StudentService(
      this.repositoryFactory.buildStudentRepository(manager),
      this.buildZipCodeService(),
      new StudentValidator()
    )
  }

  public buildScheduleService(manager?: EntityManager) {
    return new ScheduleService(
      this.configs,
      this.repositoryFactory.buildScheduleRepository(manager),
      this.buildStudentService(manager),
      this.buildConfigurationService(manager),
      new ScheduleValidator()
    )
  }

  public buildConfigurationService(manager?: EntityManager) {
    return new ConfigurationService(this.repositoryFactory.buildConfigurationRepository(manager))
  }

  public buildZipCodeService() {
    return new ZipCodeService(
      this.configs?.ORIGIN_ADDRESS,
      this.providerFactory.buildViaCepProvider(),
      this.providerFactory.buildGoogleDistanceMatrixProvider()
    )
  }

  public buildTransactionalService() {
    return new TransactionalService(this.repositoryFactory.getDataSource())
  }
}
