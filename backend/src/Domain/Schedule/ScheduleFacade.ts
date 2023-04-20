import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { ScheduleCreateDTO } from './DTO/ScheduleCreateDTO'
import { Price } from './Models/Price'
import { Schedule } from './Models/Schedule'

export class ScheduleFacade extends FacadeContract {
  public async calculatePrice(studentId: string): Promise<Price> {
    return await this.serviceFactory.buildScheduleService().calculatePrice(studentId)
  }

  public async create(body: ScheduleCreateDTO): Promise<Schedule> {
    return await this.serviceFactory.buildScheduleService().create(body)
  }
}
