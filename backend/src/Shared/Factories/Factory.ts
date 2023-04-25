import { ConfigurationDictionary } from '../../Domain/Configuration/DTO/ConfigurationDictionaryDTO'
import { MongoDB } from '../../Infra/Database/MongoDB'
import { DataMapperFactory } from './DataMapperFactory'
import { FacadeFactory } from './FacadeFactory'
import { ProviderFactory } from './ProviderFactory'
import { RepositoryFactory } from './RepositoryFactory'
import { ServiceFactory } from './ServiceFactory'

export class Factory {
  private static instance: Factory

  private constructor() {}

  public buildFacadeFactory(configs?: ConfigurationDictionary) {
    return new FacadeFactory(this.buildServiceFactory(configs))
  }

  public buildProviderFactory(configs?: ConfigurationDictionary) {
    return new ProviderFactory(configs)
  }

  public buildRepositoryFactory() {
    return new RepositoryFactory(this.buildDataMapperFactory(), MongoDB.getDataSource())
  }

  public buildServiceFactory(configs?: ConfigurationDictionary) {
    return new ServiceFactory(
      this.buildRepositoryFactory(),
      this.buildProviderFactory(configs),
      configs
    )
  }

  public buildDataMapperFactory() {
    return new DataMapperFactory()
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Factory()
    }

    return this.instance
  }
}
