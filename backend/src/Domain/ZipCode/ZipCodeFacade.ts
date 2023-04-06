import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { ZipCode } from './Models/ZipCode'

export class ZipCodeFacade extends FacadeContract {
  public async findOneByZipCode(zipCode: string): Promise<ZipCode> {
    return await this.serviceFactory.buildZipCodeService().findOneByZipCode(zipCode)
  }
}
