import { ZipCode } from './Models/ZipCode'
import { ViaCepProvider } from './Providers/ViaCepProvider'

export class ZipCodeService {
  constructor(private readonly viaCepProvider: ViaCepProvider) {}

  public async findOneByZipCode(zipCode: string): Promise<ZipCode> {
    return this.viaCepProvider.getOneByZipCode(zipCode)
  }
}
