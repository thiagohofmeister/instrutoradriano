import { ViewContract } from '../../../Shared/Views/Contracts/ViewContract'
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

type DistanceResponse = {
  originAddress: string
  destinationAddress: string
  distance: number
}
