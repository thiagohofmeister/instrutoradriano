import { ViewContract } from '../../../Shared/Views/Contracts/ViewContract'
import { IViewResponse } from '../../../Shared/Views/Interfaces/IViewResponse'
import { Distance } from '../Models/Distance'

export class DistanceView extends ViewContract<Distance, DistanceResponse> {
  protected renderOne(entity: Distance) {
    return {
      originAddress: entity.getOriginAddress(),
      destinationAddress: entity.getDestinationAddress(),
      distance: entity.getDistance()
    }
  }
}

interface DistanceResponse extends IViewResponse {
  originAddress: string
  destinationAddress: string
  distance: number
}
