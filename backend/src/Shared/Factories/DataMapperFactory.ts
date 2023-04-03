import { StudentDataMapper } from '../DataMappers/StudentDataMapper'

export class DataMapperFactory {
  public buildStudentDataMapper(): StudentDataMapper {
    return new StudentDataMapper()
  }
}
