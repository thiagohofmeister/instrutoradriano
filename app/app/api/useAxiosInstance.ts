import axios, { AxiosError } from 'axios'

export const useAxiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3001'
})

export const useAxios = async (cb: any) => {
  try {
    return (await cb).data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data
    }

    throw new AxiosError('Internal error', '500')
  }
}
