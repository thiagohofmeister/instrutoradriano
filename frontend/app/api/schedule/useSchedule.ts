import { ListResponse, QueryParamsFilter } from '../models'
import { useAxios, useAxiosInstance } from '../useAxiosInstance'

export const useSchedule = () => {
  const endpoint = '/schedule'

  const calculatePrice = async (studentId: string): Promise<CalculatePriceModel> => {
    return useAxios(useAxiosInstance.get(`${endpoint}/calculate-price/${studentId}`))
  }

  const create = async (data: ScheduleCreateModel): Promise<ScheduleModel> => {
    return useAxios(useAxiosInstance.post(endpoint, data))
  }

  const list = async (params: QueryParamsFilter): Promise<ListResponse<ScheduleModel>> => {
    return useAxios(useAxiosInstance.get(endpoint, { params }))
  }

  return { endpoint, calculatePrice, create, list }
}

export enum PeriodityEnum {
  TODAY = 'TODAY',
  TOMORROW = 'TOMORROW',
  WEEK = 'WEEK',
  MONTH = 'MONTH'
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
  id?: string
  classInitialDate: Date
  classFinalDate: Date
  reservationInitialDate: Date
  reservationFinalDate: Date
  tax: number
  amount: number
  duration: number
  student: {
    id: string
    name: string
    phone: string
    address: {
      zipCode: string
      street: string
      number: string
      city: string
      distance: number
      distanceDuration: number
      complement: string
    }
  }
}

export type ScheduleCreateModel = {
  studentId: string
  classInitialDate: Date
  duration: number
}
