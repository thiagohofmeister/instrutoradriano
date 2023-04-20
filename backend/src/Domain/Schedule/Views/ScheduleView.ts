import { ViewContract } from '../../../Shared/Views/Contracts/ViewContract'
import { IViewResponse } from '../../../Shared/Views/Interfaces/IViewResponse'
import { Schedule } from '../Models/Schedule'

export class ScheduleView extends ViewContract<Schedule, ScheduleResponse> {
  protected renderOne(entity: Schedule): ScheduleResponse {
    const student = entity.getStudent()
    return {
      id: entity.getId().toHexString(),
      classInitialDate: entity.getClassInitialDate(),
      classFinalDate: entity.getClassFinalDate(),
      reservationInitialDate: entity.getReservationInitialDate(),
      reservationFinalDate: entity.getReservationFinalDate(),
      tax: entity.getTax(),
      amount: entity.getAmount(),
      duration: entity.getDuration(),
      student: {
        id: student.getId().toHexString(),
        name: student.getName(),
        phone: student.getPhone(),
        address: {
          zipCode: student.getAddress().getZipCode(),
          street: student.getAddress().getStreet(),
          number: student.getAddress().getNumber(),
          city: student.getAddress().getCity(),
          distance: student.getAddress().getDistance(),
          distanceDuration: student.getAddress().getDistanceDuration(),
          complement: student.getAddress().getComplement()
        }
      }
    }
  }
}

interface ScheduleResponse extends IViewResponse {
  student: {
    id: string
    name: string
    phone: string
    address: {
      zipCode: string
      street: string
      number: string
      city: string
      distance: number
      distanceDuration: number
      complement: string
    }
  }
  classInitialDate: Date
  classFinalDate: Date
  reservationInitialDate: Date
  reservationFinalDate: Date
  tax: number
  amount: number
  duration: number
  id: string
}
