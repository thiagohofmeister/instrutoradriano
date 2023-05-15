export class State {
  constructor(private readonly uf: string, private readonly cities: string[]) {}

  getUf(): string {
    return this.uf
  }

  getCities(): string[] {
    return this.cities
  }
}
