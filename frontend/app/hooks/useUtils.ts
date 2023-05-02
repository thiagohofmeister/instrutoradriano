import { useCallback } from 'react'

import { Address } from '../api/models'

export const useUtils = () => {
  const formatPrice = useCallback((price: number) => {
    return Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price)
  }, [])

  const formatDate = useCallback((date: Date) => {
    date.setHours(date.getHours() + 3)

    return `${date.toLocaleDateString('pt-br')} ${date.toLocaleTimeString('pt-br', {
      hour: '2-digit',
      minute: '2-digit'
    })}`
  }, [])

  const formatFullAddress = useCallback((address: Address) => {
    const complement = address.complement ? `, ${address.complement}` : ''
    return `${address.street}, ${address.number}${complement} - ${address.city}, ${address.zipCode}`
  }, [])

  const formatMinutes = useCallback((seconds: number) => {
    const date = new Date(0)
    date.setSeconds(seconds)

    if (date.getUTCHours() == 0) {
      return `${date.getUTCMinutes()} minuto${date.getUTCMinutes() === 1 ? '' : 's'}`
    } else if (date.getUTCMinutes() === 0) {
      return `${date.getUTCHours()} hora${date.getUTCHours() === 1 ? '' : 's'}`
    }

    return `${date.getUTCHours()} hora${
      date.getUTCHours() === 1 ? '' : 's'
    } e ${date.getUTCMinutes()} minuto${date.getUTCMinutes() === 1 ? '' : 's'}`
  }, [])

  const formatDistance = useCallback((meters: number) => {
    const unit = meters / 1000 < 1 ? 'meter' : 'kilometer'
    const km = meters / 1000

    return Intl.NumberFormat('pt-br', {
      unit,
      maximumSignificantDigits: 3,
      style: 'unit'
    }).format(unit === 'meter' ? meters : km)
  }, [])

  return {
    formatDate,
    formatPrice,
    formatMinutes,
    formatDistance,
    formatFullAddress
  }
}
