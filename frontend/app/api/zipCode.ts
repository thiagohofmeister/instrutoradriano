import { instance, ListItem } from './useAxiosInstance'

export const useZipCodeApi = () => {
  const get = async (zipCode: string): Promise<ListItem<ZipCodeModel>> => {
    return (await instance.get(`/zip-code/${zipCode}`)).data
  }

  return { get }
}

export type ZipCodeModel = {
  zipCode: string
  street: string
  city: string
  number: string
  complement: string
  distance: number
}
