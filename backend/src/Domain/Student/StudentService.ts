import { IItemListModel } from '../../Shared/Models/Interfaces/IItemListModel'
import { StudentGetListFilterDto } from './Dto/StudentGetListFilterDto'
import { Student } from './Models/Student'
import { StudentRepository } from './Repositories/StudentRepository'
import { StudentValidator } from './StudentValidator'

export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly studentValidator: StudentValidator
  ) {}

  public async list(filter: StudentGetListFilterDto): Promise<IItemListModel<Student>> {
    return this.studentRepository.findAll(filter)
  }
}
