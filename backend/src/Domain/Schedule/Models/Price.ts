import { PriceOption } from './PriceOption'

export class Price {
  constructor(
    private distance: number,
    private distanceDuration: number,
    private tax: number,
    private unitAmount: number,
    private options: PriceOption[]
  ) {}

  getDistance(): number {
    return this.distance
  }

  getDistanceDuration(): number {
    return this.distanceDuration
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
