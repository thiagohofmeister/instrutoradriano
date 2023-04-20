import * as Joi from 'joi'
import { Schema } from 'joi'

import { JoiSchemaValidatorContract } from '../../Shared/Validators/JoiSchemaValidatorContract'
import { ScheduleCreateDTO } from './DTO/ScheduleCreateDTO'

export class ScheduleValidator extends JoiSchemaValidatorContract {
  private scheduleCreateSchema: Schema

  constructor() {
    super()

    this.scheduleCreateSchema = Joi.object({
      studentId: Joi.string().required(),
      classInitialDate: Joi.date().required(),
      duration: Joi.number().required()
    })
  }

  public async validateScheduleCreatePayload(body: ScheduleCreateDTO) {
    return this.validateBySchema(body, this.scheduleCreateSchema)
  }
}
