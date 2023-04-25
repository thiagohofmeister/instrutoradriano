import { ViewContract } from '../../../Shared/Views/Contracts/ViewContract'
import { IViewResponse } from '../../../Shared/Views/Interfaces/IViewResponse'
import { Price } from '../Models/Price'

export class PriceView extends ViewContract<Price, PriceResponse> {
  protected renderOne(entity: Price): PriceResponse {
    return {
      distance: entity.getDistance(),
      distanceDuration: entity.getDistanceDuration(),
      tax: entity.getTax(),
      options: entity.getOptions().map(option => ({
        label: option.getLabel(),
        duration: option.getDuration(),
        amount: option.getAmount(),
        totalAmount: option.getTotalAmount()
      }))
    }
  }
}

interface PriceResponse extends IViewResponse {
  distance: number
  distanceDuration: number
  tax: number
  options: {
    label: string
    duration: number
    amount: number
    totalAmount: number
  }[]
}
