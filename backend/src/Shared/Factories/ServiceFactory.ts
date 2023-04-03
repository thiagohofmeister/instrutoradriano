import { EntityManager } from 'typeorm'

import { StudentService } from '../../Domain/Student/StudentService'
import { StudentValidator } from '../../Domain/Student/StudentValidator'
import { TransactionalService } from '../Services/TransactionalService'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  public buildStudentService(manager?: EntityManager) {
    return new StudentService(
      this.repositoryFactory.buildStudentRepository(manager),
      new StudentValidator()
    )
  }

  public buildTransactionalService() {
    return new TransactionalService(this.repositoryFactory.getDataSource())
  }
}
