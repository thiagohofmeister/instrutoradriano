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

export interface Address {
  zipCode: string
  street: string
  number: string
  city: string
  distance: number
  distanceDuration: number
  complement: string
}
