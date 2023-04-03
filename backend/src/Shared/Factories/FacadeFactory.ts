import { StudentFacade } from '../../Domain/Student/StudentFacade'
import { ServiceFactory } from './ServiceFactory'

export class FacadeFactory {
  constructor(private readonly serviceFactory: ServiceFactory) {}

  public buildStudentFacade() {
    return new StudentFacade(this.serviceFactory)
  }
}
