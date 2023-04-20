export class Distance {
  constructor(
    private originAddress: string,
    private destinationAddress: string,
    private distance: number,
    private duration: number
  ) {}

  public getOriginAddress(): string {
    return this.originAddress
  }

  public getDestinationAddress(): string {
    return this.destinationAddress
  }

  public getDistance(): number {
    return this.distance
  }

  public getDuration(): number {
    return this.duration
  }
}
