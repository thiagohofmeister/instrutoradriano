import { IItemListModel } from '../../Shared/Models/Interfaces/IItemListModel'
import { StudentCreateDto } from './Dto/StudentCreateDto'
import { StudentGetListFilterDto } from './Dto/StudentGetListFilterDto'
import { Address } from './Models/Address'
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

  public async create(body: StudentCreateDto): Promise<Student> {
    await this.studentValidator.validateStudentCreatePayload(body)

    const distance = 0 // TODO: Calculate distance between origin zipCode and "destination" zipCode

    const { zipCode, street, city, number, complement } = body.address
    const student = new Student(
      body.name,
      body.phone,
      new Address(zipCode, street, city, number, distance, complement)
    )

    return this.studentRepository.save(student)
  }
}
