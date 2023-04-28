export type ListResponse<T> = {
  items: T[]
  total: number
}

export interface QueryParams<Params = DefaultQueryParams> {
  filters?: QueryParamsFilter
  params?: Params
}

export interface DefaultQueryParams {
  page: number
  size: number
  search?: string
}

export interface QueryParamsFilter {
  [key: string]: string
}
