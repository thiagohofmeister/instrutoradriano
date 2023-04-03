import { FindOneOptions, FindOptionsWhere, ObjectID, Repository as TypeOrmRepository, SelectQueryBuilder } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { EntityDataMapperContract } from '../../DataMappers/Contracts/EntityDataMapperContract'
import { IFilterDefault } from '../../Models/Interfaces/IFilterDefault'
import { IItemListModel } from '../../Models/Interfaces/IItemListModel'
import { RepositoryContract } from './RepositoryContract'

export abstract class TypeOrmMysqlRepositoryContract<
  TDomainEntity,
  TDaoEntity
> extends RepositoryContract<TDomainEntity, TDaoEntity> {
  constructor(
    protected readonly repository: TypeOrmRepository<TDaoEntity>,
    protected dataMapper: EntityDataMapperContract<TDomainEntity, TDaoEntity>,
    protected storeId: string | null
  ) {
    super()
  }

  public async create(entity: TDomainEntity): Promise<TDomainEntity> {
    const result = await this.repository.insert(
      this.dataMapper.toDaoEntity(entity) as QueryDeepPartialEntity<TDaoEntity>
    )

    return this.findOneByPrimaryColumn(result.identifiers[0][this.getPrimaryColumnName()])
  }

  public async save(
    entity: TDomainEntity,
    withFindBeforeReturn: boolean = true
  ): Promise<TDomainEntity> {
    await this.repository.save(this.repository.create(this.dataMapper.toDaoEntity(entity)))

    if (!withFindBeforeReturn) return entity

    return this.findOneByPrimaryColumn(this.getPrimaryColumnValueByEntity(entity))
  }

  public async delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindOptionsWhere<TDaoEntity>
  ): Promise<boolean> {
    await this.repository.delete(criteria)

    return true
  }

  public async findAll<TFilter extends IFilterDefault>(
    filter: TFilter,
    bypassStoreId: boolean = false
  ): Promise<IItemListModel<TDomainEntity>> {
    const query = this.applyPaginator(
      filter,
      this.customToFindAll(this.repository.createQueryBuilder(), filter)
    )

    if (this.hasColumn('storeId') && !bypassStoreId) {
      query.andWhere(`${this.getTableName()}.store_id = :storeId`, {
        storeId: this.storeId
      })
    }

    return this.getMany(query)
  }

  public async findOneByPrimaryColumn(
    value: string,
    bypassStoreId: boolean = false
  ): Promise<TDomainEntity> {
    const query = this.customToFindOneByPrimaryColumn(
      this.repository
        .createQueryBuilder()
        .where(`${this.getTableName()}.${this.getPrimaryColumnName()} = :value`, { value })
    )

    if (this.hasColumn('storeId') && !bypassStoreId)
      query.andWhere(`${this.getTableName()}.store_id = :storeId`, {
        storeId: this.storeId
      })

    return this.getOne(query)
  }

  public applyPaginator(
    filter: IFilterDefault,
    query: SelectQueryBuilder<TDaoEntity>
  ): SelectQueryBuilder<TDaoEntity> {
    return query.skip((this.getPage(filter) - 1) * this.getSize(filter)).take(this.getSize(filter))
  }

  protected getPage(filter: IFilterDefault) {
    filter.page = typeof filter.page === 'string' ? parseInt(filter.page) : filter.page

    let page = 1
    if (filter.page > 0) {
      page = typeof filter.page === 'string' ? parseInt(filter.page) : filter.page
    }

    return page
  }

  protected getSize(filter: IFilterDefault) {
    filter.size = typeof filter.size === 'string' ? parseInt(filter.size) : filter.size

    let size = 15
    if (filter.size > 0) {
      size = filter.size
      if (filter.size > 100) {
        size = 100
      }
    }

    return size
  }

  protected customToFindAll(
    query: SelectQueryBuilder<TDaoEntity>,
    filter?: IFilterDefault
  ): SelectQueryBuilder<TDaoEntity> {
    return query
  }

  protected customToFindOneByPrimaryColumn(
    query: SelectQueryBuilder<TDaoEntity>
  ): SelectQueryBuilder<TDaoEntity> {
    return query
  }

  protected hasColumn(columnName: string): boolean {
    return this.repository.metadata.columns.map(column => column.propertyName).includes(columnName)
  }

  protected hasRelation(propertyName: string): boolean {
    return this.repository.metadata.relations
      .map(relation => relation.propertyName)
      .includes(propertyName)
  }

  protected getTableName(): string {
    return this.repository.metadata.targetName
  }

  protected getPrimaryColumnName(): string {
    return this.repository.metadata.primaryColumns[0].propertyAliasName
  }

  protected getPrimaryColumnValueByEntity(entity: TDomainEntity): string {
    return entity[this.getPrimaryColumnName()]
  }

  protected async getOne(
    query: SelectQueryBuilder<TDaoEntity> | FindOneOptions<TDaoEntity>
  ): Promise<TDomainEntity> {
    let entity: TDaoEntity

    if (query instanceof SelectQueryBuilder) {
      entity = await query.getOne()
    } else {
      entity = await this.repository.findOne(query)
    }

    if (!entity) return null

    return this.dataMapper.toDomainEntity(entity)
  }

  protected async getMany(
    query: SelectQueryBuilder<TDaoEntity>
  ): Promise<IItemListModel<TDomainEntity>> {
    return {
      items: this.dataMapper.toDomainEntityMany(await query.getMany()),
      total: await query.getCount()
    }
  }
}
