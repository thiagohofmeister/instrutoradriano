export class Tax {
  constructor(private initial: number, private final: number, private price: number) {}

  getInitial(): number {
    return this.initial
  }

  getFinal(): number {
    return this.final
  }

  getPrice(): number {
    return this.price
  }
}
