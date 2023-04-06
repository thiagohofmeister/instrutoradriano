export class ZipCode {
  constructor(
    private zipCode: string,
    private street: string,
    private complement: string,
    private district: string,
    private city: string,
    private state: string
  ) {}

  public getState(): string {
    return this.state
  }

  public getCity(): string {
    return this.city
  }

  public getDistrict(): string {
    return this.district
  }

  public getComplement(): string {
    return this.complement
  }

  public getStreet(): string {
    return this.street
  }

  public getZipCode(): string {
    return this.zipCode
  }
}
