import { StudentFacade } from '../../Domain/Student/StudentFacade'
import { ZipCodeFacade } from '../../Domain/ZipCode/ZipCodeFacade'
import { ServiceFactory } from './ServiceFactory'

export class FacadeFactory {
  constructor(private readonly serviceFactory: ServiceFactory) {}

  public buildStudentFacade() {
    return new StudentFacade(this.serviceFactory)
  }

  public buildZipCodeFacade() {
    return new ZipCodeFacade(this.serviceFactory)
  }
}
