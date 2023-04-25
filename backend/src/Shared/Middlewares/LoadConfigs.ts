import { NextFunction, Response } from 'express'
import { Factory } from '../Factories/Factory'

import { BadRequestException } from '../Models/Exceptions/BadRequestException'
import { CoreRequest } from '../Models/Request/CoreRequest'

export class LoadConfigs {
  constructor() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: CoreRequest, response: Response, next: NextFunction) {
    new Promise((_, reject) => {
      Factory.getInstance()
        .buildServiceFactory()
        .buildConfigurationService()
        .list()
        .then(configs => {
          request.configs = configs
          next()
        })
        .catch(reject)
    })
  }
}
