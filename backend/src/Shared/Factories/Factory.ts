import { MongoDB } from '../../Infra/Database/MongoDB'
import { DataMapperFactory } from './DataMapperFactory'
import { FacadeFactory } from './FacadeFactory'
import { ProviderFactory } from './ProviderFactory'
import { RepositoryFactory } from './RepositoryFactory'
import { ServiceFactory } from './ServiceFactory'

export class Factory {
  private static instance: Factory

  private constructor() {}

  public buildFacadeFactory() {
    return new FacadeFactory(this.buildServiceFactory())
  }

  public buildProviderFactory() {
    return new ProviderFactory()
  }

  public buildRepositoryFactory() {
    return new RepositoryFactory(this.buildDataMapperFactory(), MongoDB.getDataSource())
  }

  public buildServiceFactory() {
    return new ServiceFactory(this.buildRepositoryFactory(), this.buildProviderFactory())
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
