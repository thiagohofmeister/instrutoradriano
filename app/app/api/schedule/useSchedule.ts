import { useAxios, useAxiosInstance } from '../useAxiosInstance'

export const useSchedule = () => {
  const endpoint = '/schedule'

  const calculatePrice = async (studentId: string): Promise<CalculatePriceModel> => {
    return useAxios(useAxiosInstance.get(`${endpoint}/calculate-price/${studentId}`))
  }

  const create = async (data: any): Promise<ScheduleModel> => {
    return useAxios(useAxiosInstance.post(endpoint, data))
  }

  return { endpoint, calculatePrice, create }
}

export type ClassOption = {
  description: string
  minutes: number
  amount: number
}

export type CalculatePriceModel = {
  unitAmount: number
  distance: number
  distanceDuration: number
  tax: number
  options: ClassOption[]
}

export type ScheduleModel = {
  id: string | undefined
  name: string
  phone: string
  address: {
    zipCode: string
    street: string
    number: string
    complement: string
    distance?: number
  }
}
