import { randomUUID } from 'crypto'

import { Address } from './Address'

export class Student {
  constructor(
    private name: string,
    private phone: string,
    private address: Address,
    private id?: string
  ) {
    if (!id) this.id = randomUUID()
  }

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getPhone(): string {
    return this.phone
  }

  public getAddress(): Address {
    return this.address
  }
}
