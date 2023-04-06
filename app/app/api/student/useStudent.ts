import { ListResponse, QueryParams } from '../models'
import { useAxios, useAxiosInstance } from '../useAxiosInstance'

export const useStudent = () => {
  const endpoint = '/student'

  const list = async (queryParams: QueryParams): Promise<ListResponse<StudentModel>> => {
    return useAxios(useAxiosInstance.get(endpoint))
  }

  const create = async (data: any): Promise<StudentModel> => {
    return useAxios(useAxiosInstance.post(endpoint, data))
  }

  const update = async (id: string, data: any): Promise<StudentModel> => {
    return useAxios(useAxiosInstance.post(endpoint, data))
  }

  return { endpoint, list, create, update }
}

export type StudentModel = {
  id: string | undefined
  name: string
  phone: string
  address: {
    zipCode: string
    street: string
    city: string
    number: string
    complement: string
    distance?: number
  }
}
