import { CalculateDistanceDTO } from './DTO/CalculateDistanceDTO'
import { ZipCode } from './Models/ZipCode'
import { GoogleDistanceMatrixProvider } from './Providers/GoogleDistanceMatrixProvider'
import { ViaCepProvider } from './Providers/ViaCepProvider'

export class ZipCodeService {
  constructor(
    private readonly appAddress: CalculateDistanceDTO,
    private readonly viaCepProvider: ViaCepProvider,
    private readonly googleDistanceMatrixProvider: GoogleDistanceMatrixProvider
  ) {}

  public async findOneByZipCode(zipCode: string): Promise<ZipCode> {
    return this.viaCepProvider.getOneByZipCode(zipCode)
  }

  public async calculateDistance(body: CalculateDistanceDTO) {
    if (!body.city || !body.street) {
      const destination = await this.findOneByZipCode(body.zipCode)
      body.city = destination.getCity()
      body.street = destination.getStreet()
    }

    return this.googleDistanceMatrixProvider.calculateDistance(
      this.formatAddress(this.appAddress),
      this.formatAddress(body)
    )
  }

  private formatAddress(address: CalculateDistanceDTO) {
    const infos = [address.street, address.number, address.city, address.zipCode]

    return infos.filter(i => !!i).join(' ')
  }
}
