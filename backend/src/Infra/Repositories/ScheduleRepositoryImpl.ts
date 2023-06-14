import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions'

import { PeriodityEnum } from '../../Domain/Schedule/Enums/PeriodityEnum'
import { Schedule } from '../../Domain/Schedule/Models/Schedule'
import {
  ScheduleFilter,
  ScheduleRepository
} from '../../Domain/Schedule/Repositories/ScheduleRepository'
import { TypeOrmMongoDBRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMongoDBRepository'
import { ScheduleDao } from '../Models/ScheduleDao'

export class ScheduleRepositoryImpl
  extends TypeOrmMongoDBRepositoryContract<Schedule, ScheduleDao>
  implements ScheduleRepository
{
  protected customToGetAll(
    filters: ScheduleFilter,
    query: MongoFindManyOptions<ScheduleDao>
  ): MongoFindManyOptions<ScheduleDao> {
    if (filters.periodity) {
      let initial = new Date()
      initial.setHours(0)
      initial.setMinutes(0)
      initial.setSeconds(0)

      let final = new Date()
      final.setHours(23)
      final.setMinutes(59)
      final.setSeconds(59)

      switch (filters.periodity) {
        case PeriodityEnum.TOMORROW:
          initial.setDate(initial.getDate() + 1)
          final.setDate(final.getDate() + 1)

          break

        case PeriodityEnum.MONTH:
          initial.setDate(1)

          final.setMonth(final.getMonth() + 1)
          final.setDate(1)
          final.setHours(0)
          final.setMinutes(0)
          final.setSeconds(-1)

          break

        case PeriodityEnum.WEEK:
          initial.setDate(initial.getDate() - initial.getDay())

          if (final.getDay() !== 6) {
            final.setDate(final.getDate() + 6 - final.getDay())
          }

          break
      }

      query.where = {
        classInitialDate: { $gte: initial, $lte: final }
      }
    }

    query.order = {
      classInitialDate: 'asc'
    }

    return query
  }
}
