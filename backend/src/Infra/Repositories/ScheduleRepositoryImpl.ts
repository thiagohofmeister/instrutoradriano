import { Schedule } from '../../Domain/Schedule/Models/Schedule'
import { ScheduleRepository } from '../../Domain/Schedule/Repositories/ScheduleRepository'
import { TypeOrmMongoDBRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMongoDBRepository'
import { ScheduleDao } from '../Models/ScheduleDao'

export class ScheduleRepositoryImpl
  extends TypeOrmMongoDBRepositoryContract<Schedule, ScheduleDao>
  implements ScheduleRepository {}
