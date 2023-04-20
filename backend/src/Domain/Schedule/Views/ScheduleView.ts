import { ViewContract } from '../../../Shared/Views/Contracts/ViewContract'
import { Schedule } from '../Models/Schedule'

export class ScheduleView extends ViewContract<Schedule, ScheduleResponse> {
  protected renderOne(entity: Schedule) {
    return {
      zipCode: entity.getSchedule(),
      street: entity.getStreet(),
      complement: entity.getComplement(),
      district: entity.getDistrict(),
      city: entity.getCity(),
      state: entity.getState()
    }
  }
}

type ScheduleResponse = {
  zipCode: string
  street: string
  complement: string
  district: string
  city: string
  state: string
}
