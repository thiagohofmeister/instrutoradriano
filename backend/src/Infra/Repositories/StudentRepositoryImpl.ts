import { Student } from '../../Domain/Student/Models/Student'
import { StudentRepository } from '../../Domain/Student/Repositories/StudentRepository'
import { TypeOrmMongoDBRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMongoDBRepository'
import { StudentDao } from '../Models/StudentDao'

export class StudentRepositoryImpl
  extends TypeOrmMongoDBRepositoryContract<Student, StudentDao>
  implements StudentRepository {}
