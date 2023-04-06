import { NextFunction, Response } from 'express'

import { BaseController } from '../../Shared/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Shared/Enums/ResponseTypeEnum'
import { Factory } from '../../Shared/Factories/Factory'
import { CoreRequest } from '../../Shared/Models/Request/CoreRequest'
import { ZipCodeFacade } from './ZipCodeFacade'
import { ZipCodeView } from './Views/ZipCodeView'

export class ZipCodeController extends BaseController {
  constructor() {
    super()
    this.getOneByZipCode = this.getOneByZipCode.bind(this)
  }

  public async getOneByZipCode(req: CoreRequest, res: Response, next: NextFunction) {
    await this.responseHandler(
      res,
      next,
      this.getFacade(req).findOneByZipCode(req.params.zipCode),
      ResponseTypeEnum.OK
    )
  }

  protected getFacade(req: CoreRequest): ZipCodeFacade {
    return Factory.getInstance().buildFacadeFactory().buildZipCodeFacade()
  }

  protected getView() {
    return new ZipCodeView()
  }
}
