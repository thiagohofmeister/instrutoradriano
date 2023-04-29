import { IFilterDefault } from '../../../Shared/Models/Interfaces/IFilterDefault'
import { IRepository } from '../../../Shared/Models/Interfaces/IRepository'
import { PeriodityEnum } from '../Enums/PeriodityEnum'
import { Schedule } from '../Models/Schedule'

export interface ScheduleRepository extends IRepository<Schedule> {}

export interface ScheduleFilter extends IFilterDefault {
  periodity?: PeriodityEnum
}
