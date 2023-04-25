import { NextFunction, Response } from 'express'

import { BaseController } from '../../Shared/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Shared/Enums/ResponseTypeEnum'
import { Factory } from '../../Shared/Factories/Factory'
import { CoreRequest } from '../../Shared/Models/Request/CoreRequest'
import { ConfigurationFacade } from './ConfigurationFacade'
import { ConfigurationView } from './Views/ConfigurationView'

export class ConfigurationController extends BaseController {
  constructor() {
    super()
    this.get = this.get.bind(this)
  }

  public async get(req: CoreRequest, res: Response, next: NextFunction) {
    await this.responseHandler(res, next, this.getFacade(req).list(), ResponseTypeEnum.OK)
  }

  protected getFacade(req: CoreRequest): ConfigurationFacade {
    return Factory.getInstance().buildFacadeFactory().buildConfigurationFacade()
  }

  protected getView() {
    return new ConfigurationView()
  }
}
