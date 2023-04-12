import { Distance } from '../../Domain/ZipCode/Models/Distance'
import { GoogleDistanceMatrixProvider } from '../../Domain/ZipCode/Providers/GoogleDistanceMatrixProvider'
import { GoogleRequest } from '../../Shared/Modules/Request/GoogleRequest'
import { ProviderContract } from '../../Shared/Providers/Contracts/ProviderContract'

export class GoogleDistanceMatrixProviderImpl
  extends ProviderContract<GoogleRequest>
  implements GoogleDistanceMatrixProvider
{
  async calculateDistance(origin: string, destination: string): Promise<Distance> {
    try {
      const response = (
        await this.getRequest().distancematrix({
          origins: [origin],
          destinations: [destination]
        })
      ).getBody()

      return new Distance(
        response.origin_addresses[0],
        response.destination_addresses[0],
        response.rows[0].elements[0].distance.value
      )
    } catch (e) {
      console.log({ e })
      return e
    }
  }

  protected getRequest(): GoogleRequest {
    return this.request.createInstance()
  }
}
