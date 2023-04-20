import { DataNotFoundException } from '../../Shared/Models/Exceptions/DataNotFoundException'
import { StudentService } from '../Student/StudentService'
import { Tax } from '../Tax/Models/Tax'
import { TaxService } from '../Tax/TaxService'
import { MinuteEnum, MinuteEnumLabel } from './Enums/MinuteEnum'
import { Price } from './Models/Price'
import { PriceOption } from './Models/PriceOption'

export class ScheduleService {
  constructor(
    readonly unitClassAmount: number,
    readonly unitClassMinutes: number,
    readonly studentService: StudentService,
    readonly taxService: TaxService
  ) {}

  public async calculatePrice(studentId: string): Promise<Price> {
    const student = await this.studentService.findOneById(studentId)

    if (!student) {
      throw new DataNotFoundException('Student not found')
    }

    const distance = student.getAddress().getDistance()
    const tax = await this.calculateTax(distance)

    const options = []

    Object.keys(MinuteEnum)
      .filter(m => !!m.replace(/\d+/, ''))
      .forEach(key => {
        const minutes = MinuteEnum[key]

        options.push(
          new PriceOption(
            MinuteEnumLabel[key],
            (this.unitClassAmount * minutes) / this.unitClassMinutes + tax,
            minutes
          )
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
