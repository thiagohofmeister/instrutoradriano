import { ViaCepProviderImpl } from '../../Infra/Providers/ViaCepProviderImpl'
import { AxiosRequest } from '../Modules/Request/AxiosRequest'

export class ProviderFactory {
  public buildViaCepProvider() {
    return new ViaCepProviderImpl(new AxiosRequest('https://viacep.com.br/ws'))
  }
}
