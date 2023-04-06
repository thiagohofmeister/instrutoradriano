import { ViewContract } from '../../../Shared/Views/Contracts/ViewContract'
import { ZipCode } from '../Models/ZipCode'

export class ZipCodeView extends ViewContract<ZipCode, ZipCodeResponse> {
  protected renderOne(entity: ZipCode) {
    return {
      zipCode: entity.getZipCode(),
      street: entity.getStreet(),
      complement: entity.getComplement(),
      district: entity.getDistrict(),
      city: entity.getCity(),
      state: entity.getState()
    }
  }
}

type ZipCodeResponse = {
  zipCode: string
  street: string
  complement: string
  district: string
  city: string
  state: string
}
