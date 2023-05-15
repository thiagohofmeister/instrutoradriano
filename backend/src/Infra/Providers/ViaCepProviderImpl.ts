import { getZipCodeByAddressDTO } from '../../Domain/ZipCode/DTO/GetZipCodeByAddressDTO'
import { ZipCode } from '../../Domain/ZipCode/Models/ZipCode'
import { ViaCepProvider } from '../../Domain/ZipCode/Providers/ViaCepProvider'
import { AxiosRequest } from '../../Shared/Modules/Request/AxiosRequest'
import { ProviderContract } from '../../Shared/Providers/Contracts/ProviderContract'
import { HttpMethod } from '../../Shared/Providers/Enum/HttpMethod'

export class ViaCepProviderImpl extends ProviderContract<AxiosRequest> implements ViaCepProvider {
  async getByZipCodeByAddress(body: getZipCodeByAddressDTO): Promise<ZipCode[]> {
    const result = (
      await this.getRequest()
        .withEndpoint(encodeURIComponent(`/${body.uf}/${body.city}/${body.street}/json`))
        .send<ZipCodeGetOneResponse[]>(HttpMethod.GET)
    ).getBody()

    return result.map(item => this.format(item))
  }

  async getOneByZipCode(zipCode: string) {
    const result = (
      await this.getRequest()
        .withEndpoint(`/${zipCode}/json`)
        .send<ZipCodeGetOneResponse>(HttpMethod.GET)
    ).getBody()

    return this.format(result)
  }

  private format(response: ZipCodeGetOneResponse) {
    return new ZipCode(
      response.cep,
      response.logradouro,
      response.complemento,
      response.bairro,
      response.localidade,
      response.uf
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
