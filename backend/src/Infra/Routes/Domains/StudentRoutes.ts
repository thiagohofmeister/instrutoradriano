import { StudentController } from '../../../Domain/Student/StudentController'
import { RouteDto } from '../../Dto/RouteDto'
import { RouteContract } from '../Contracts/RouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class StudentRoutes extends RouteContract<StudentController> {
  public getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [new RouteDto(this.getFullEndpoint(), MethodEnum.GET, controller.get)]
  }
}
