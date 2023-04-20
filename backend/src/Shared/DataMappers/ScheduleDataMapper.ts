import { Schedule } from '../../Domain/Schedule/Models/Schedule'
import { Address } from '../../Domain/Student/Models/Address'
import { Student } from '../../Domain/Student/Models/Student'
import { ScheduleDao } from '../../Infra/Models/ScheduleDao'
import { EntityDataMapperContract } from './Contracts/EntityDataMapperContract'

export class ScheduleDataMapper extends EntityDataMapperContract<Schedule, ScheduleDao> {
  toDomainEntity(entity: ScheduleDao): Schedule {
    const { _id, name, phone } = entity.student
    const { city, complement, distance, number, street, zipCode, distanceDuration } =
      entity.student.address

    const address = new Address(
      zipCode,
      street,
      city,
      number,
      distance,
      distanceDuration,
      complement
    )

    const student = new Student(name, phone, address, _id)

    return new Schedule(
      student,
      entity.classInitialDate,
      entity.classFinalDate,
      entity.reservationInitialDate,
      entity.reservationFinalDate,
      entity.tax,
      entity.amount,
      entity.duration,
      entity._id
    )
  }

  toDaoEntity(domain: Schedule): ScheduleDao {
    const student: ScheduleDao['student'] = {
      _id: domain.getId(),
      name: domain.getStudent().getName(),
      phone: domain.getStudent().getPhone(),
      address: {
        city: domain.getStudent().getAddress().getCity(),
        number: domain.getStudent().getAddress().getNumber(),
        street: domain.getStudent().getAddress().getStreet(),
        zipCode: domain.getStudent().getAddress().getZipCode(),
        complement: domain.getStudent().getAddress().getComplement(),
        distance: domain.getStudent().getAddress().getDistance(),
        distanceDuration: domain.getStudent().getAddress().getDistanceDuration()
      }
    }

    return new ScheduleDao(
      domain.getId(),
      domain.getClassInitialDate(),
      domain.getClassFinalDate(),
      domain.getReservationInitialDate(),
      domain.getReservationFinalDate(),
      domain.getTax(),
      domain.getAmount(),
      domain.getDuration(),
      student
    )
  }
}
