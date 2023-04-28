import { useCallback, useMemo } from 'react'
import { useQuery, UseQueryOptions } from 'react-query'

import { ZipCodeModel } from '../zipCode'
import { useZipCode } from './useZipCode'

export const useZipCodeFindOne = (zipCode: string, options?: UseQueryOptions<Response>) => {
  const { endpoint, findOne } = useZipCode()

  const queryKey = useMemo(() => [endpoint, zipCode], [endpoint, zipCode])

  const queryFn = useCallback<() => Promise<Response>>(async () => {
    const response = await findOne(zipCode)

    return response
  }, [findOne, zipCode])

  const query = useQuery<Response>({
    ...options,
    queryKey,
    queryFn
  })

  return query
}

type Response = ZipCodeModel
