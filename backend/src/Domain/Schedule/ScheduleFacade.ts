import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { Price } from './Models/Price'

export class ScheduleFacade extends FacadeContract {
  public async calculatePrice(studentId: string): Promise<Price> {
    return await this.serviceFactory.buildScheduleService().calculatePrice(studentId)
  }
}
