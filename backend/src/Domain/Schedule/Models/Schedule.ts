import { ObjectId } from 'mongodb'
import { Student } from '../../Student/Models/Student'

export class Schedule {
  constructor(
    private student: Student,
    private classInitialDate: Date,
    private classFinalDate: Date,
    private reservationInitialDate: Date,
    private reservationFinalDate: Date,
    private tax: number,
    private amount: number,
    private duration: number,
    private id?: ObjectId
  ) {
    if (!id) this.id = new ObjectId()
  }

  public getId(): ObjectId {
    return this.id
  }

  public getStudent(): Student {
    return this.student
  }

  public getClassInitialDate(): Date {
    return this.classInitialDate
  }

  public getClassFinalDate(): Date {
    return this.classFinalDate
  }

  public getReservationInitialDate(): Date {
    return this.reservationInitialDate
  }

  public getReservationFinalDate(): Date {
    return this.reservationFinalDate
  }

  public getTax(): number {
    return this.tax
  }

  public getAmount(): number {
    return this.amount
  }

  public getDuration(): number {
    return this.duration
  }
}
