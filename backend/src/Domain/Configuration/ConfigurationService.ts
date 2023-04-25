import { Configuration } from '../Configuration/Models/Configuration'
import { ConfigurationDictionary } from './DTO/ConfigurationDictionaryDTO'
import { ConfigurationEnum } from './Enums/ConfigurationEnum'
import { ConfigurationRepository } from './Repositories/ConfigurationRepository'

export class ConfigurationService {
  constructor(readonly configurationRepository: ConfigurationRepository) {}

  public async list(): Promise<ConfigurationDictionary> {
    const configurations = (await this.configurationRepository.findAll({})).items

    return Object.keys(ConfigurationEnum).reduce(
      (prev, curr: ConfigurationEnum, i) => ({
        ...prev,
        [curr]: this.getConfigurationByKey(curr, configurations)
      }),
      {}
    ) as ConfigurationDictionary
  }

  private getConfigurationByKey(key: ConfigurationEnum, configs: Configuration[]): any {
    return configs.find(config => config.getKey() === key).getValue()
  }
}
