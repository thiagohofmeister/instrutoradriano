import { useCallback, useMemo } from 'react'
import { UseQueryOptions, useQuery } from 'react-query'

import { ListResponse, QueryParamsFilter } from '../models'
import { ScheduleModel, useSchedule } from './useSchedule'

export const useScheduleGetList = (
  queryParams: QueryParamsFilter,
  options?: UseQueryOptions<Response>
) => {
  const { endpoint, list } = useSchedule()

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

type Response = ListResponse<ScheduleModel>
