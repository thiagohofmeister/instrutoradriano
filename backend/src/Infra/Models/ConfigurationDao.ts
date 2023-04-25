import { ObjectId } from 'mongodb'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity('configuration')
export class ConfigurationDao {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  key: string

  @Column()
  value: any

  constructor(id: ObjectId, key: string, value: any) {
    this._id = id
    this.key = key
    this.value = value
  }
}
