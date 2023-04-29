import { NextFunction, Response } from 'express'

import { BaseController } from '../../Shared/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Shared/Enums/ResponseTypeEnum'
import { Factory } from '../../Shared/Factories/Factory'
import { CoreRequest } from '../../Shared/Models/Request/CoreRequest'
import { ScheduleFacade } from './ScheduleFacade'
import { PriceView } from './Views/PriceView'
import { ScheduleView } from './Views/ScheduleView'

export class ScheduleController extends BaseController {
  constructor() {
    super()
    this.get = this.get.bind(this)
    this.post = this.post.bind(this)
    this.getPrice = this.getPrice.bind(this)
  }

  public async get(req: CoreRequest, res: Response, next: NextFunction) {
    await this.responseHandler(res, next, this.getFacade(req).list(req.query), ResponseTypeEnum.OK)
  }

  public async post(req: CoreRequest, res: Response, next: NextFunction) {
    await this.responseHandler(res, next, this.getFacade(req).create(req.body), ResponseTypeEnum.OK)
  }

  public async getPrice(req: CoreRequest, res: Response, next: NextFunction) {
    await this.responseHandler(
      res,
      next,
      this.getFacade(req).calculatePrice(req.params.studentId),
      ResponseTypeEnum.OK,
      new PriceView()
    )
  }

  protected getFacade(req: CoreRequest): ScheduleFacade {
    return Factory.getInstance().buildFacadeFactory(req.configs).buildScheduleFacade()
  }

  protected getView() {
    return new ScheduleView()
  }
}
