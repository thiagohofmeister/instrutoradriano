import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions'
import { Student } from '../../Domain/Student/Models/Student'
import { StudentRepository } from '../../Domain/Student/Repositories/StudentRepository'
import { IFilterDefault } from '../../Shared/Models/Interfaces/IFilterDefault'
import { TypeOrmMongoDBRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMongoDBRepository'
import { StudentDao } from '../Models/StudentDao'

export class StudentRepositoryImpl
  extends TypeOrmMongoDBRepositoryContract<Student, StudentDao>
  implements StudentRepository
{
  protected customToGetAll(
    filters: IFilterDefault,
    query: MongoFindManyOptions<StudentDao>
  ): MongoFindManyOptions<StudentDao> {
    query.order = {
      name: 'asc'
    }
    return query
  }
}
