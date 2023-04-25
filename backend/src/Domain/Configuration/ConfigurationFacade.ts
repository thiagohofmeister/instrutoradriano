import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { ConfigurationDictionary } from './DTO/ConfigurationDictionaryDTO'

export class ConfigurationFacade extends FacadeContract {
  public async list(): Promise<ConfigurationDictionary> {
    return await this.serviceFactory.buildConfigurationService().list()
  }
}
