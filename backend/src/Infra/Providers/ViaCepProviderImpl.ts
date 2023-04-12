import { ZipCode } from '../../Domain/ZipCode/Models/ZipCode'
import { ViaCepProvider } from '../../Domain/ZipCode/Providers/ViaCepProvider'
import { AxiosRequest } from '../../Shared/Modules/Request/AxiosRequest'
import { ProviderContract } from '../../Shared/Providers/Contracts/ProviderContract'
import { HttpMethod } from '../../Shared/Providers/Enum/HttpMethod'

export class ViaCepProviderImpl extends ProviderContract<AxiosRequest> implements ViaCepProvider {
  async getOneByZipCode(zipCode: string) {
    const result = (
      await this.getRequest()
        .withEndpoint(`/${zipCode}/json`)
        .send<ZipCodeGetOneResponse>(HttpMethod.GET)
    ).getBody()

    return new ZipCode(
      result.cep,
      result.logradouro,
      result.complemento,
      result.bairro,
      result.localidade,
      result.uf
    )
  }
}

type ZipCodeGetOneResponse = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}
