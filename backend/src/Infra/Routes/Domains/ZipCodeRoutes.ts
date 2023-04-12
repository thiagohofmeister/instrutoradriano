import { ZipCodeController } from '../../../Domain/ZipCode/ZipCodeController'
import { RouteDto } from '../../Dto/RouteDto'
import { RouteContract } from '../Contracts/RouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class ZipCodeRoutes extends RouteContract<ZipCodeController> {
  public getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(this.getFullEndpoint('/:zipCode'), MethodEnum.GET, controller.getOneByZipCode),
      new RouteDto(this.getFullEndpoint('/distance'), MethodEnum.POST, controller.postDistance)
    ]
  }
}
