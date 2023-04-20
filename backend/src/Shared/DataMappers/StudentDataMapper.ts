import { ObjectId } from 'mongodb'
import { Address } from '../../Domain/Student/Models/Address'
import { Student } from '../../Domain/Student/Models/Student'
import { StudentDao } from '../../Infra/Models/StudentDao'
import { EntityDataMapperContract } from './Contracts/EntityDataMapperContract'

export class StudentDataMapper extends EntityDataMapperContract<Student, StudentDao> {
  toDomainEntity(entity: StudentDao): Student {
    const { city, complement, distance, number, street, zipCode, distanceDuration } = entity.address
    const address = new Address(
      zipCode,
      street,
      city,
      number,
      distance,
      distanceDuration,
      complement
    )
    return new Student(entity.name, entity.phone, address, new ObjectId(entity._id))
  }

  toDaoEntity(domain: Student): StudentDao {
    const address: StudentDao['address'] = {
      city: domain.getAddress().getCity(),
      number: domain.getAddress().getNumber(),
      street: domain.getAddress().getStreet(),
      zipCode: domain.getAddress().getZipCode(),
      complement: domain.getAddress().getComplement(),
      distance: domain.getAddress().getDistance(),
      distanceDuration: domain.getAddress().getDistanceDuration()
    }

    return new StudentDao(domain.getId(), domain.getName(), domain.getPhone(), address)
  }
}
