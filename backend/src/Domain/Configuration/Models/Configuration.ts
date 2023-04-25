import { ObjectId } from 'mongodb'

export class Configuration {
  constructor(private key: string, private value: any, private id?: ObjectId) {
    if (!id) this.id = new ObjectId()
  }

  getKey(): string {
    return this.key
  }

  getValue(): any {
    return this.value
  }

  getId(): ObjectId {
    return this.id
  }
}
