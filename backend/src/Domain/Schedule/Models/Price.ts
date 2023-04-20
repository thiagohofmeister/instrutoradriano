import { PriceOption } from './PriceOption'

export class Price {
  constructor(
    private distance: number,
    private tax: number,
    private unitAmount: number,
    private options: PriceOption[]
  ) {}

  getDistance(): number {
    return this.distance
  }

  getTax(): number {
    return this.tax
  }

  getUnitAmount(): number {
    return this.unitAmount
  }

  getOptions(): PriceOption[] {
    return this.options
  }
}
