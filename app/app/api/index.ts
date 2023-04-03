import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.API_URL || 'http://192.168.50.231:3001'
})

export type ListItem<T> = {
  items: T[]
  total: number
}
