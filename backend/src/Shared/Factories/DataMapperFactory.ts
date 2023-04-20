import { ScheduleDataMapper } from '../DataMappers/ScheduleDataMapper'
import { StudentDataMapper } from '../DataMappers/StudentDataMapper'

export class DataMapperFactory {
  public buildStudentDataMapper(): StudentDataMapper {
    return new StudentDataMapper()
  }

  public buildScheduleDataMapper(): ScheduleDataMapper {
    return new ScheduleDataMapper()
  }
}
