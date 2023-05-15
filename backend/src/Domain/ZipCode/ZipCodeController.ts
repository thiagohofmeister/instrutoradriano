import { NextFunction, Response } from 'express'

import { BaseController } from '../../Shared/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Shared/Enums/ResponseTypeEnum'
import { Factory } from '../../Shared/Factories/Factory'
import { CoreRequest } from '../../Shared/Models/Request/CoreRequest'
import { DistanceView } from './Views/DistanceView'
import { StateView } from './Views/StateView'
import { ZipCodeView } from './Views/ZipCodeView'
import { ZipCodeFacade } from './ZipCodeFacade'

export class ZipCodeController extends BaseController {
  constructor() {
    super()
    this.getOneByZipCode = this.getOneByZipCode.bind(this)
    this.postDistance = this.postDistance.bind(this)
    this.getStates = this.getStates.bind(this)
    this.getZipCodeByAddress = this.getZipCodeByAddress.bind(this)
  }

  public async getStates(req: CoreRequest, res: Response, next: NextFunction) {
    await this.responseHandler(
      res,
      next,
      this.getFacade(req).findStates(),
      ResponseTypeEnum.OK,
      new StateView()
    )
  }

  public async getZipCodeByAddress(req: CoreRequest, res: Response, next: NextFunction) {
    await this.responseHandler(
      res,
      next,
      this.getFacade(req).findZipCodeByAddress(req.body),
      ResponseTypeEnum.OK
    )
  }

  public async getOneByZipCode(req: CoreRequest, res: Response, next: NextFunction) {
    await this.responseHandler(
      res,
      next,
      this.getFacade(req).findOneByZipCode(req.params.zipCode),
      ResponseTypeEnum.OK
    )
  }

  public async postDistance(req: CoreRequest, res: Response, next: NextFunction) {
    await this.responseHandler(
      res,
      next,
      this.getFacade(req).calculateDistance(req.body),
      ResponseTypeEnum.OK,
      new DistanceView()
    )
  }

  protected getFacade(req: CoreRequest): ZipCodeFacade {
    return Factory.getInstance().buildFacadeFactory(req.configs).buildZipCodeFacade()
  }

  protected getView() {
    return new ZipCodeView()
  }
}
