import { instance, ListItem } from '.'

export const useStudentApi = () => {
  const list = async (): Promise<ListItem<StudentModel>> => {
    return (await instance.get('/student')).data
  }

  return { list }
}

export type StudentModel = {
  id: string
  name: string
  phone: string
  address: {
    zipCode: string
    street: string
    city: string
    number: string
    complement: string
    distance: number
  }
}
