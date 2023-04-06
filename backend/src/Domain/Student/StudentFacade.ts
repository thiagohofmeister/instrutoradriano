import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { IItemListModel } from '../../Shared/Models/Interfaces/IItemListModel'
import { StudentCreateDto } from './Dto/StudentCreateDto'
import { StudentGetListFilterDto } from './Dto/StudentGetListFilterDto'
import { Student } from './Models/Student'

export class StudentFacade extends FacadeContract {
  public async list(data: StudentGetListFilterDto): Promise<IItemListModel<Student>> {
    return await this.serviceFactory.buildStudentService().list(data)
  }

  public async create(data: StudentCreateDto): Promise<Student> {
    return await this.serviceFactory.buildStudentService().create(data)
  }
}
