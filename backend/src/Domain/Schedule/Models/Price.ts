import { ClassOption } from './ClassOption'

export class Price {
  constructor(
    private distance: number,
    private distanceDuration: number,
    private tax: number,
    private options: ClassOption[]
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

  getOptions(): ClassOption[] {
    return this.options
  }
}
