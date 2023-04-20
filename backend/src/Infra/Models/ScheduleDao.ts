import { ObjectId } from 'mongodb'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity('schedule')
export class ScheduleDao {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  classInitialDate: Date

  @Column()
  classFinalDate: Date

  @Column()
  reservationInitialDate: Date

  @Column()
  reservationFinalDate: Date

  @Column()
  tax: number

  @Column()
  amount: number

  @Column()
  duration: number

  @Column()
  student: {
    _id: ObjectId
    name: string
    phone: string
    address: {
      zipCode: string
      street: string
      number: string
      city: string
      complement: string
      distance: number
      distanceDuration: number
    }
  }

  constructor(
    id: ObjectId,
    classInitialDate: Date,
    classFinalDate: Date,
    reservationInitialDate: Date,
    reservationFinalDate: Date,
    tax: number,
    amount: number,
    duration: number,
    student: {
      _id: ObjectId
      name: string
      phone: string
      address: {
        zipCode: string
        street: string
        number: string
        city: string
        complement: string
        distance: number
        distanceDuration: number
      }
    }
  ) {
    this._id = id
    this.classInitialDate = classInitialDate
    this.classFinalDate = classFinalDate
    this.reservationInitialDate = reservationInitialDate
    this.reservationFinalDate = reservationFinalDate
    this.tax = tax
    this.amount = amount
    this.duration = duration
    this.student = student
  }
}
