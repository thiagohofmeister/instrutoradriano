import { ViewContract } from '../../../Shared/Views/Contracts/ViewContract'
import { IViewResponse } from '../../../Shared/Views/Interfaces/IViewResponse'
import { ConfigurationDictionary } from '../DTO/ConfigurationDictionaryDTO'

export class ConfigurationView extends ViewContract<
  ConfigurationDictionary,
  ConfigurationDictionary
> {
  protected renderOne(entity: ConfigurationDictionary): ConfigurationDictionary {
    return entity
  }
}

interface ConfigurationResponse extends IViewResponse {
  key: string
  value: number
}
