import { Configuration } from '../../Domain/Configuration/Models/Configuration'
import { ConfigurationDao } from '../../Infra/Models/ConfigurationDao'
import { EntityDataMapperContract } from './Contracts/EntityDataMapperContract'

export class ConfigurationDataMapper extends EntityDataMapperContract<
  Configuration,
  ConfigurationDao
> {
  toDomainEntity(entity: ConfigurationDao): Configuration {
    return new Configuration(entity.key, entity.value, entity._id)
  }

  toDaoEntity(domain: Configuration): ConfigurationDao {
    return new ConfigurationDao(domain.getId(), domain.getKey(), domain.getValue())
  }
}
