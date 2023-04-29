import { ScheduleController } from '../../../Domain/Schedule/ScheduleController'
import { RouteDto } from '../../Dto/RouteDto'
import { RouteContract } from '../Contracts/RouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class ScheduleRoutes extends RouteContract<ScheduleController> {
  public getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(
        this.getFullEndpoint('/calculate-price/:studentId'),
        MethodEnum.GET,
        controller.getPrice
      ),
      new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post),
      new RouteDto(this.getFullEndpoint(), MethodEnum.GET, controller.get)
    ]
  }
}
