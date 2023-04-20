import { ViewContract } from '../../../Shared/Views/Contracts/ViewContract'
import { IViewResponse } from '../../../Shared/Views/Interfaces/IViewResponse'
import { Student } from '../Models/Student'

export class StudentView extends ViewContract<Student, StudentResponse> {
  protected renderOne(entity: Student): StudentResponse {
    return {
      id: entity.getId().toHexString(),
      name: entity.getName(),
      phone: entity.getPhone(),
      address: {
        zipCode: entity.getAddress().getZipCode(),
        street: entity.getAddress().getStreet(),
        number: entity.getAddress().getNumber(),
        city: entity.getAddress().getCity(),
        distance: entity.getAddress().getDistance(),
        distanceDuration: entity.getAddress().getDistanceDuration(),
        complement: entity.getAddress().getComplement()
      }
    }
  }
}

export interface StudentResponse extends IViewResponse {
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
