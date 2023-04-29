import { ConfigurationService } from '../Configuration/ConfigurationService'
import { ConfigurationDictionary } from '../Configuration/DTO/ConfigurationDictionaryDTO'
import { Student } from '../Student/Models/Student'
import { StudentService } from '../Student/StudentService'
import { ScheduleCreateDTO } from './DTO/ScheduleCreateDTO'
import { ClassOption } from './Models/ClassOption'
import { Price } from './Models/Price'
import { Schedule } from './Models/Schedule'
import { ScheduleFilter, ScheduleRepository } from './Repositories/ScheduleRepository'
import { ScheduleValidator } from './ScheduleValidator'

export class ScheduleService {
  constructor(
    readonly configs: ConfigurationDictionary,
    readonly scheduleRepository: ScheduleRepository,
    readonly studentService: StudentService,
    readonly configurationService: ConfigurationService,
    readonly scheduleValidator: ScheduleValidator
  ) {}

  public async list(filter: ScheduleFilter) {
    return this.scheduleRepository.findAll(filter)
  }

  public async create(body: ScheduleCreateDTO): Promise<Schedule> {
    await this.scheduleValidator.validateScheduleCreatePayload(body)

    const student = await this.studentService.findOneById(body.studentId)

    const price = await this.calculatePriceByStudent(student)
    const option = price.getOptions().find(option => option.getDuration() === body.duration)

    const classFinalDate = new Date(body.classInitialDate)
    classFinalDate.setMinutes(classFinalDate.getMinutes() + option.getDuration())

    const reservationInitialDate: Date = new Date(body.classInitialDate)
    reservationInitialDate.setSeconds(
      reservationInitialDate.getSeconds() - price.getDistanceDuration()
    )

    const reservationFinalDate: Date = new Date(body.classInitialDate)
    reservationFinalDate.setSeconds(reservationFinalDate.getSeconds() + price.getDistanceDuration())

    const tax: number = price.getTax()
    const amount: number = option.getAmount()
    const duration: number = option.getDuration()

    const schedule = new Schedule(
      student,
      new Date(body.classInitialDate),
      classFinalDate,
      reservationInitialDate,
      reservationFinalDate,
      tax,
      amount,
      duration
    )

    await this.validateDuplicateSchedule(schedule)

    return this.scheduleRepository.create(schedule)
  }

  public async calculatePrice(studentId: string): Promise<Price> {
    const student = await this.studentService.findOneById(studentId)

    return this.calculatePriceByStudent(student)
  }

  private async calculatePriceByStudent(student: Student) {
    const distance = Math.floor(student.getAddress().getDistance() / 1000)
    const taxPerKm = this.configs.TAX_PER_KM
    const tax = distance > 3 ? distance * taxPerKm : 0

    const options = this.configs.CLASS_OPTIONS.map(option =>
      new ClassOption(option.label, option.amount, option.duration).addTax(tax)
    )

    return new Price(
      student.getAddress().getDistance(),
      student.getAddress().getDistanceDuration(),
      tax,
      options
    )
  }

  private async validateDuplicateSchedule(schedule: Schedule) {
    // TODO: Check duplicates
  }
}
