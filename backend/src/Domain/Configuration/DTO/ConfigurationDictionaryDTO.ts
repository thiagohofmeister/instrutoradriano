export type ConfigurationDictionary = {
  GOOGLE_MAPS_KEY: string
  CEP_PROVIDER_API_URL: string
  TAX_PER_KM: number
  CLASS_OPTIONS: {
    label: string
    duration: number
    amount: number
    totalAmount?: number
  }[]
  ORIGIN_ADDRESS: {
    street: string
    city: string
    number: string
    zipCode: string
  }
}
