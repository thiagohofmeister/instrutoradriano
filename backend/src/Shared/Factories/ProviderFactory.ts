import { GoogleDistanceMatrixProviderImpl } from '../../Infra/Providers/GoogleDistanceMatrixProviderImpl'
import { ViaCepProviderImpl } from '../../Infra/Providers/ViaCepProviderImpl'
import { AxiosRequest } from '../Modules/Request/AxiosRequest'
import { GoogleRequest } from '../Modules/Request/GoogleRequest'

export class ProviderFactory {
  public buildViaCepProvider() {
    return new ViaCepProviderImpl(new AxiosRequest(process.env.VIA_CEP_URL))
  }

  public buildGoogleDistanceMatrixProvider() {
    return new GoogleDistanceMatrixProviderImpl(new GoogleRequest(process.env.GOOGLE_MAPS_KEY))
  }
}
