import { Student } from '../Student/Models/Student'
import { StudentService } from '../Student/StudentService'
import { Tax } from '../Tax/Models/Tax'
import { TaxService } from '../Tax/TaxService'
import { ScheduleCreateDTO } from './DTO/ScheduleCreateDTO'
import { MinuteEnum, MinuteEnumLabel } from './Enums/MinuteEnum'
import { Price } from './Models/Price'
import { PriceOption } from './Models/PriceOption'
import { Schedule } from './Models/Schedule'
import { ScheduleRepository } from './Repositories/ScheduleRepository'
import { ScheduleValidator } from './ScheduleValidator'

export class ScheduleService {
  constructor(
    readonly scheduleRepository: ScheduleRepository,
    readonly unitClassAmount: number,
    readonly unitClassMinutes: number,
    readonly studentService: StudentService,
    readonly taxService: TaxService,
    readonly scheduleValidator: ScheduleValidator
  ) {}

  public async create(body: ScheduleCreateDTO): Promise<Schedule> {
    await this.scheduleValidator.validateScheduleCreatePayload(body)

    const student = await this.studentService.findOneById(body.studentId)

    const price = await this.calculatePriceByStudent(student)
    const option = price.getOptions().find(option => option.getMinutes() === body.duration)

    const classFinalDate = new Date(body.classInitialDate)
    classFinalDate.setMinutes(classFinalDate.getMinutes() + option.getMinutes())

    const reservationInitialDate: Date = new Date(body.classInitialDate)
    reservationInitialDate.setSeconds(
      reservationInitialDate.getSeconds() - price.getDistanceDuration()
    )

    const reservationFinalDate: Date = new Date(body.classInitialDate)
    reservationFinalDate.setSeconds(reservationFinalDate.getSeconds() + price.getDistanceDuration())

    const tax: number = price.getTax()
    const amount: number = option.getAmount()
    const duration: number = option.getMinutes()

    const schedule = new Schedule(
      student,
      body.classInitialDate,
      classFinalDate,
      reservationInitialDate,
      reservationFinalDate,
      tax,
      amount,
      duration
    )

    return this.scheduleRepository.create(schedule)
  }

  public async calculatePrice(studentId: string): Promise<Price> {
    const student = await this.studentService.findOneById(studentId)

    return this.calculatePriceByStudent(student)
  }

  private async calculatePriceByStudent(student: Student) {
    const distance = student.getAddress().getDistance()
    const tax = await this.calculateTax(distance)

    const options = Object.keys(MinuteEnum)
      .filter(m => !!m.replace(/\d+/, ''))
      .map(key => {
        const minutes = MinuteEnum[key]

        return new PriceOption(
          MinuteEnumLabel[key],
          (this.unitClassAmount * minutes) / this.unitClassMinutes + tax,
          minutes
        )
      })

    return new Price(
      distance,
      student.getAddress().getDistanceDuration(),
      tax,
      this.unitClassAmount,
      options
    )
  }

  private async calculateTax(distance: number): Promise<number> {
    const taxes: Tax[] = await (await this.taxService.list()).items

    return (
      taxes.find(tax => distance >= tax.getInitial() && distance <= tax.getFinal())?.getPrice() || 0
    )
  }
}
