import { ObjectId } from 'mongodb'
import { FindManyOptions, FindOneOptions, MongoRepository, SelectQueryBuilder } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { EntityDataMapperContract } from '../../DataMappers/Contracts/EntityDataMapperContract'
import { IFilterDefault } from '../../Models/Interfaces/IFilterDefault'
import { IItemListModel } from '../../Models/Interfaces/IItemListModel'
import { RepositoryContract } from './RepositoryContract'

export abstract class TypeOrmMongoDBRepositoryContract<
  TDomainEntity,
  TDaoEntity
> extends RepositoryContract<TDomainEntity, null> {
  public constructor(
    protected readonly repository: MongoRepository<TDaoEntity>,
    protected readonly dataMapper: EntityDataMapperContract<TDomainEntity, TDaoEntity>
  ) {
    super()
    this.repository = repository
    this.dataMapper = dataMapper
  }

  public async findOneByPrimaryColumn(id: string): Promise<TDomainEntity> {
    const result = await this.repository.findOne({ where: { _id: new ObjectId(id) } })

    if (!result) return null

    return this.dataMapper.toDomainEntity(result)
  }

  public async getAll(filters: IFilterDefault): Promise<IItemListModel<TDomainEntity>> {
    const query = this.applyPaginator(
      filters,
      this.applySearch(filters, this.customToGetAll(filters, {}))
    )

    return this.getMany(query)
  }

  public async create(entity: TDomainEntity): Promise<TDomainEntity> {
    try {
      const result = await this.repository.save(
        this.repository.create(this.dataMapper.toDaoEntity(entity))
      )

      return this.dataMapper.toDomainEntity(result)
    } catch (e) {
      console.error({ e })
      return null
    }
  }

  public async save(entity: TDomainEntity): Promise<TDomainEntity> {
    try {
      const entityToSave = this.repository.create(this.dataMapper.toDaoEntity(entity))

      const result = await this.repository.save(entityToSave)

      return this.dataMapper.toDomainEntity(result)
    } catch (e) {
      return null
    }
  }

  public async createOrUpdate(entity: TDomainEntity, conditions?: {} | string): Promise<void> {
    const result = await this.create(entity)

    if (!result) {
      await this.update(entity, conditions)
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.repository.delete(id)

      return true
    } catch (e) {
      return false
    }
  }

  public async update(entity: TDomainEntity, conditions?: {} | string): Promise<boolean> {
    try {
      const result = await this.repository.update(
        conditions,
        this.dataMapper.toDaoEntity(entity) as QueryDeepPartialEntity<TDaoEntity>
      )

      return !!result.affected
    } catch (e) {
      return false
    }
  }

  public applyPaginator(
    filters: IFilterDefault,
    query: FindManyOptions<TDaoEntity>
  ): FindManyOptions<TDaoEntity> {
    const skip = (this.getPage(filters) - 1) * this.getSize(filters)
    const take = this.getSize(filters)

    query = {
      ...query,
      skip,
      take
    }

    return query
  }

  protected customToGetAll(
    filters: IFilterDefault,
    query: FindManyOptions<TDaoEntity>
  ): FindManyOptions<TDaoEntity> {
    return query
  }

  protected applySearch(
    filters: IFilterDefault,
    query: FindManyOptions<TDaoEntity>
  ): FindManyOptions<TDaoEntity> {
    if (!filters.query) {
      return query
    }

    const fieldsToWhere = []
    for (const field of this.getFieldsToSearch(filters)) {
      const nameReg = new RegExp(filters.query, 'i')
      fieldsToWhere.push({ [field]: { $regex: nameReg } })
    }

    if (fieldsToWhere.length) {
      query.where['$or'] = fieldsToWhere
    }

    return query
  }

  protected getFieldsToSearch(filters: IFilterDefault): string[] {
    return []
  }

  protected getPage(filters: IFilterDefault) {
    filters.page = typeof filters.page === 'string' ? parseInt(filters.page) : filters.page

    let page = 1
    if (filters.page > 0) {
      page = typeof filters.page === 'string' ? parseInt(filters.page) : filters.page
    }

    return page
  }

  protected getSize(filters: IFilterDefault) {
    filters.size = typeof filters.size === 'string' ? parseInt(filters.size) : filters.size

    let size = 15
    if (filters.size > 0) {
      size = filters.size
      if (filters.size > 100) {
        size = 100
      }
    }

    return size
  }

  public async findAll(filters: IFilterDefault): Promise<IItemListModel<TDomainEntity>> {
    const query = this.applySearch(filters, this.customToGetAll(filters, {}))

    return this.getMany(query)
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
    query: SelectQueryBuilder<TDaoEntity> | FindManyOptions<TDaoEntity>
  ): Promise<IItemListModel<TDomainEntity>> {
    return {
      items: this.dataMapper.toDomainEntityMany(
        await this.repository.find(query as FindManyOptions<TDaoEntity>)
      ),
      total: await this.repository.count(query)
    }
  }
}
