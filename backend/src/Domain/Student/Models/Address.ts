export class Address {
  constructor(
    private zipCode: string,
    private street: string,
    private city: string,
    private number: string,
    private distance: number,
    private distanceDuration: number,
    private complement: string
  ) {}

  public getZipCode(): string {
    return this.zipCode
  }

  public getStreet(): string {
    return this.street
  }

  public getCity(): string {
    return this.city
  }

  public getNumber(): string {
    return this.number
  }

  public getDistanceDuration(): number {
    return this.distanceDuration
  }

  public getDistance(): number {
    return this.distance
  }

  public getComplement(): string {
    return this.complement
  }
}
