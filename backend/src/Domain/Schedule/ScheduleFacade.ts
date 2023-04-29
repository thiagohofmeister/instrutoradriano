import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { IItemListModel } from '../../Shared/Models/Interfaces/IItemListModel'
import { ScheduleCreateDTO } from './DTO/ScheduleCreateDTO'
import { Price } from './Models/Price'
import { Schedule } from './Models/Schedule'
import { ScheduleFilter } from './Repositories/ScheduleRepository'

export class ScheduleFacade extends FacadeContract {
  public async list(filter: ScheduleFilter): Promise<IItemListModel<Schedule>> {
    return await this.serviceFactory.buildScheduleService().list(filter)
  }

  public async calculatePrice(studentId: string): Promise<Price> {
    return await this.serviceFactory.buildScheduleService().calculatePrice(studentId)
  }

  public async create(body: ScheduleCreateDTO): Promise<Schedule> {
    return await this.serviceFactory.buildScheduleService().create(body)
  }
}
