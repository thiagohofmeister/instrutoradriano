import { useAxios, useAxiosInstance } from '../useAxiosInstance'

export const useSchedule = () => {
  const endpoint = '/schedule'

  const calculatePrice = async (studentId: string): Promise<CalculatePriceModel> => {
    return useAxios(useAxiosInstance.get(`${endpoint}/calculate-price/${studentId}`))
  }

  const create = async (data: ScheduleCreateModel): Promise<ScheduleModel> => {
    return useAxios(useAxiosInstance.post(endpoint, data))
  }

  return { endpoint, calculatePrice, create }
}

export type ClassOption = {
  label: string
  duration: number
  amount: number
  totalAmount: number
}

export type CalculatePriceModel = {
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

export type ScheduleCreateModel = {
  studentId: string
  classInitialDate: Date
  duration: number
}
