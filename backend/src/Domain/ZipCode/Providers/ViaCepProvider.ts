import { getZipCodeByAddressDTO } from '../DTO/GetZipCodeByAddressDTO'
import { ZipCode } from '../Models/ZipCode'

export interface ViaCepProvider {
  getByZipCodeByAddress(body: getZipCodeByAddressDTO): Promise<ZipCode[]>
  getOneByZipCode(zipCode: string): Promise<ZipCode>
}
