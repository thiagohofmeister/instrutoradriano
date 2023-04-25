import { ConfigurationDictionary } from '../../Domain/Configuration/DTO/ConfigurationDictionaryDTO'
import { GoogleDistanceMatrixProviderImpl } from '../../Infra/Providers/GoogleDistanceMatrixProviderImpl'
import { ViaCepProviderImpl } from '../../Infra/Providers/ViaCepProviderImpl'
import { AxiosRequest } from '../Modules/Request/AxiosRequest'
import { GoogleRequest } from '../Modules/Request/GoogleRequest'

export class ProviderFactory {
  constructor(readonly configs: ConfigurationDictionary) {}

  public buildViaCepProvider() {
    return new ViaCepProviderImpl(new AxiosRequest(this.configs.CEP_PROVIDER_API_URL))
  }

  public buildGoogleDistanceMatrixProvider() {
    return new GoogleDistanceMatrixProviderImpl(new GoogleRequest(this.configs.GOOGLE_MAPS_KEY))
  }
}
