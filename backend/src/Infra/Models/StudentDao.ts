import { ObjectId } from 'mongodb'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity('student')
export class StudentDao {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  name: string

  @Column()
  phone: string

  @Column()
  address: {
    zipCode: string
    street: string
    number: string
    city: string
    complement: string
    distance: number
    distanceDuration: number
  }

  constructor(
    id: ObjectId,
    name: string,
    phone: string,
    address: {
      zipCode: string
      street: string
      number: string
      city: string
      distance: number
      distanceDuration: number
      complement: string
    }
  ) {
    this._id = id
    this.name = name
    this.phone = phone
    this.address = address
  }
}
