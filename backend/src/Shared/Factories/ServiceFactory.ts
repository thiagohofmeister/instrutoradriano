import { EntityManager } from 'typeorm'
import { ScheduleService } from '../../Domain/Schedule/ScheduleService'
import { ScheduleValidator } from '../../Domain/Schedule/ScheduleValidator'

import { StudentService } from '../../Domain/Student/StudentService'
import { StudentValidator } from '../../Domain/Student/StudentValidator'
import { TaxService } from '../../Domain/Tax/TaxService'
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
      this.buildZipCodeService(),
      new StudentValidator()
    )
  }

  public buildScheduleService(manager?: EntityManager) {
    return new ScheduleService(
      this.repositoryFactory.buildScheduleRepository(manager),
      parseFloat(process.env.APP_UNIT_CLASS_AMOUNT),
      parseInt(process.env.APP_UNIT_CLASS_MINUTES),
      this.buildStudentService(manager),
      this.buildTaxService(),
      new ScheduleValidator()
    )
  }

  public buildTaxService(manager?: EntityManager) {
    return new TaxService()
  }

  public buildZipCodeService() {
    return new ZipCodeService(
      {
        street: process.env.APP_ADDRESS_STREET,
        city: process.env.APP_ADDRESS_CITY,
        number: process.env.APP_ADDRESS_NUMBER,
        zipCode: process.env.APP_ADDRESS_ZIP_CODE
      },
      this.providerFactory.buildViaCepProvider(),
      this.providerFactory.buildGoogleDistanceMatrixProvider()
    )
  }

  public buildTransactionalService() {
    return new TransactionalService(this.repositoryFactory.getDataSource())
  }
}
