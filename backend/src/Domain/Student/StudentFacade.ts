import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { StudentGetListFilterDto } from './Dto/StudentGetListFilterDto'

export class StudentFacade extends FacadeContract {
  public async list(data: StudentGetListFilterDto) {
    return await this.serviceFactory.buildStudentService().list(data)
  }
}
