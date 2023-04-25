import { ConfigurationController } from '../../../Domain/Configuration/ConfigurationController'
import { RouteDto } from '../../Dto/RouteDto'
import { RouteContract } from '../Contracts/RouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class ConfigurationRoutes extends RouteContract<ConfigurationController> {
  public getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [new RouteDto(this.getFullEndpoint(), MethodEnum.GET, controller.get)]
  }
}
