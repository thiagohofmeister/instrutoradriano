import { EntityManager } from 'typeorm'

import { StudentService } from '../../Domain/Student/StudentService'
import { StudentValidator } from '../../Domain/Student/StudentValidator'
import { ZipCodeService } from '../../Domain/ZipCode/ZipCodeService'
import { TransactionalService } from '../Services/TransactionalService'
import { ProviderFactory } from './ProviderFactory'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly providerFactory: ProviderFactory
  ) {}

  public buildStudentService(manager?: EntityManager) {
    return new StudentService(
      this.repositoryFactory.buildStudentRepository(manager),
      new StudentValidator()
    )
  }

  public buildZipCodeService() {
    return new ZipCodeService(this.providerFactory.buildViaCepProvider())
  }

  public buildTransactionalService() {
    return new TransactionalService(this.repositoryFactory.getDataSource())
  }
}
