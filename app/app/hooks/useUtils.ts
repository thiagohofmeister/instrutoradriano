import { useCallback } from 'react'

export const useUtils = () => {
  const formatPrice = useCallback((price: number) => {
    return Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price)
  }, [])

  const formatMinutes = useCallback((seconds: number) => {
    const date = new Date(0)
    date.setSeconds(seconds)

    if (date.getUTCHours() == 0) {
      return `${date.getMinutes()} minutos`
    } else if (date.getUTCMinutes() === 0) {
      return `${date.getUTCHours()} hora(s)`
    }

    return `${date.getUTCHours()} hora(s) e ${date.getUTCMinutes()} minutos`
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
    formatPrice,
    formatMinutes,
    formatDistance
  }
}
