import { NextFunction, Response } from 'express'

import { BaseController } from '../../Shared/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Shared/Enums/ResponseTypeEnum'
import { Factory } from '../../Shared/Factories/Factory'
import { CoreRequest } from '../../Shared/Models/Request/CoreRequest'
import { StudentFacade } from './StudentFacade'
import { StudentView } from './Views/StudentView'

export class StudentController extends BaseController {
  constructor() {
    super()
    this.get = this.get.bind(this)
    this.post = this.post.bind(this)
  }

  public async get(req: CoreRequest, res: Response, next: NextFunction) {
    await this.responseHandler(res, next, this.getFacade(req).list(req.query), ResponseTypeEnum.OK)
  }

  public async post(req: CoreRequest, res: Response, next: NextFunction) {
    await this.responseHandler(
      res,
      next,
      this.getFacade(req).create(req.body),
      ResponseTypeEnum.CREATED
    )
  }

  protected getFacade(req: CoreRequest): StudentFacade {
    return Factory.getInstance().buildFacadeFactory(req.configs).buildStudentFacade()
  }

  protected getView() {
    return new StudentView()
  }
}
