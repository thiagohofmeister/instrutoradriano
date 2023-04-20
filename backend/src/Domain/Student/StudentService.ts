import { IItemListModel } from '../../Shared/Models/Interfaces/IItemListModel'
import { ZipCodeService } from '../ZipCode/ZipCodeService'
import { StudentCreateDto } from './Dto/StudentCreateDto'
import { StudentGetListFilterDto } from './Dto/StudentGetListFilterDto'
import { Address } from './Models/Address'
import { Student } from './Models/Student'
import { StudentRepository } from './Repositories/StudentRepository'
import { StudentValidator } from './StudentValidator'

export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly zipCodeService: ZipCodeService,
    private readonly studentValidator: StudentValidator
  ) {}

  public async list(filter: StudentGetListFilterDto): Promise<IItemListModel<Student>> {
    return this.studentRepository.findAll(filter)
  }

  public async findOneById(id: string): Promise<Student> {
    return this.studentRepository.findOneByPrimaryColumn(id)
  }

  public async create(body: StudentCreateDto): Promise<Student> {
    await this.studentValidator.validateStudentCreatePayload(body)

    const zipCode = await this.zipCodeService.findOneByZipCode(body.address.zipCode)
    const distance = await this.zipCodeService.calculateDistance({
      city: zipCode.getCity(),
      number: body.address.number,
      street: zipCode.getStreet(),
      zipCode: zipCode.getZipCode()
    })

    const student = new Student(
      body.name,
      body.phone,
      new Address(
        zipCode.getCity(),
        zipCode.getStreet(),
        zipCode.getCity(),
        body.address.number,
        distance.getDistance(),
        body.address.complement
      )
    )

    return this.studentRepository.save(student)
  }
}
