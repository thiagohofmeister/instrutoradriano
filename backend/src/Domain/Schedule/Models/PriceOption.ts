import { MinuteEnum } from '../Enums/MinuteEnum'

export class PriceOption {
  constructor(private description: string, private amount: number, private minutes: number) {}

  getDescription(): string {
    return this.description
  }

  getAmount(): number {
    return this.amount
  }

  getMinutes(): MinuteEnum {
    return this.minutes
  }
}
