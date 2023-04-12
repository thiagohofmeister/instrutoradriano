import * as Joi from 'joi'
import { Schema } from 'joi'

import { JoiSchemaValidatorContract } from '../../Shared/Validators/JoiSchemaValidatorContract'
import { StudentCreateDto } from './Dto/StudentCreateDto'

export class StudentValidator extends JoiSchemaValidatorContract {
  private studentCreateSchema: Schema

  constructor() {
    super()

    this.studentCreateSchema = Joi.object({
      name: Joi.string().required(),
      phone: Joi.string().required(),
      address: Joi.object({
        zipCode: Joi.string().required(),
        street: Joi.string(),
        city: Joi.string(),
        number: Joi.string().required(),
        complement: Joi.string()
      }).required()
    })
  }

  public async validateStudentCreatePayload(body: StudentCreateDto) {
    return this.validateBySchema(body, this.studentCreateSchema)
  }
}
