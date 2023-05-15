import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { CalculateDistanceDTO } from './DTO/CalculateDistanceDTO'
import { getZipCodeByAddressDTO } from './DTO/GetZipCodeByAddressDTO'
import { Distance } from './Models/Distance'
import { State } from './Models/State'
import { ZipCode } from './Models/ZipCode'

export class ZipCodeFacade extends FacadeContract {
  public async findZipCodeByAddress(body: getZipCodeByAddressDTO): Promise<any> {
    return await this.serviceFactory.buildZipCodeService().findZipCodeByAddress(body)
  }

  public async findStates(): Promise<State[]> {
    return await this.serviceFactory.buildZipCodeService().findStates()
  }

  public async findOneByZipCode(zipCode: string): Promise<ZipCode> {
    return await this.serviceFactory.buildZipCodeService().findOneByZipCode(zipCode)
  }

  public async calculateDistance(body: CalculateDistanceDTO): Promise<Distance> {
    return await this.serviceFactory.buildZipCodeService().calculateDistance(body)
  }
}
