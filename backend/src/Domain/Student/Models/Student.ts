import { ObjectId } from 'mongodb'

import { Address } from './Address'

export class Student {
  constructor(
    private name: string,
    private phone: string,
    private address: Address,
    private id?: ObjectId
  ) {
    if (!id) this.id = new ObjectId()
  }

  public getId(): ObjectId {
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
