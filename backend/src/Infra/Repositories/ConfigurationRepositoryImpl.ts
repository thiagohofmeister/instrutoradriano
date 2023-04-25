import { Configuration } from '../../Domain/Configuration/Models/Configuration'
import { ConfigurationRepository } from '../../Domain/Configuration/Repositories/ConfigurationRepository'
import { TypeOrmMongoDBRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMongoDBRepository'
import { ConfigurationDao } from '../Models/ConfigurationDao'

export class ConfigurationRepositoryImpl
  extends TypeOrmMongoDBRepositoryContract<Configuration, ConfigurationDao>
  implements ConfigurationRepository {}
