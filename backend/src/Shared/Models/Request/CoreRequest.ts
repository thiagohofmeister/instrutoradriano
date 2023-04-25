import { Request } from 'express'
import { ConfigurationDictionary } from '../../../Domain/Configuration/DTO/ConfigurationDictionaryDTO'
import { ApiContext } from '../Interfaces/ApiContext'

export interface CoreRequest extends Request {
  context: ApiContext
  configs: ConfigurationDictionary
}
