import { ObjectId } from 'mongodb'

export class ClassOption {
  private totalAmount: number

  constructor(private label: string, private amount: number, private duration: number) {
    this.totalAmount = amount
  }

  getLabel(): string {
    return this.label
  }

  getAmount(): number {
    return this.amount
  }

  getDuration(): number {
    return this.duration
  }

  addTax(amount: number): this {
    this.totalAmount += amount
    return this
  }

  getTotalAmount(): number {
    return this.totalAmount
  }
}
