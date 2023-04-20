import { ViewContract } from '../../../Shared/Views/Contracts/ViewContract'
import { Price } from '../Models/Price'

export class PriceView extends ViewContract<Price, PriceResponse> {
  protected renderOne(entity: Price): PriceResponse {
    return {
      unitAmount: entity.getUnitAmount(),
      distance: entity.getDistance(),
      distanceDuration: entity.getDistanceDuration(),
      tax: entity.getTax(),
      options: entity.getOptions().map(option => ({
        description: option.getDescription(),
        amount: option.getAmount(),
        minutes: option.getMinutes()
      }))
    }
  }
}

type PriceResponse = {
  unitAmount: number
  distance: number
  distanceDuration: number
  tax: number
  options: {
    description: string
    minutes: number
    amount: number
  }[]
}
