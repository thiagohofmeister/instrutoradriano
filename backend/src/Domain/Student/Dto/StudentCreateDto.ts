import { AddressDTO } from './AddressDTO'

export interface StudentCreateDto {
  name: string
  phone: string
  address: AddressDTO
}
