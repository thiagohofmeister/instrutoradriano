import { ScheduleController } from '../../../Domain/Schedule/ScheduleController'
import { RouteDto } from '../../Dto/RouteDto'
import { RouteContract } from '../Contracts/RouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class ScheduleRoutes extends RouteContract<ScheduleController> {
  public getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(
        this.getFullEndpoint('/calculate-price/:userId'),
        MethodEnum.GET,
        controller.getPrice
      )
    ]
  }
}
