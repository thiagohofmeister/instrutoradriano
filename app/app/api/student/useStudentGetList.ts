import { useCallback, useMemo } from 'react'
import { useQuery, UseQueryOptions } from 'react-query'

import { ListResponse, QueryParams } from '../models'
import { StudentModel, useStudent } from './useStudent'

export const useStudentGetList = (
  queryParams: QueryParams,
  options?: UseQueryOptions<Response>
) => {
  const { endpoint, list } = useStudent()

  const queryKey = useMemo(() => [endpoint, queryParams], [endpoint, queryParams])

  const queryFn = useCallback<() => Promise<Response>>(async () => {
    const response = await list(queryParams)

    return response
  }, [list, queryParams])

  const query = useQuery<Response>({
    ...options,
    queryKey,
    queryFn
  })

  return query
}

type Response = ListResponse<StudentModel>
