import { useAxios, useAxiosInstance } from '../useAxiosInstance'

export const useZipCode = () => {
  const endpoint = '/zip-code'

  const findOne = async (zipCode: string): Promise<ZipCodeModel> => {
    return useAxios(useAxiosInstance.get(`${endpoint}/${zipCode}`))
  }

  return { endpoint, findOne }
}

export type ZipCodeModel = {
  zipCode: string
  street: string
  city: string
  number: string
  complement: string
  distance?: number
}
