import { StyleSheet, Text, View } from 'react-native'
import { CalculatePriceModel, ClassOption } from '../api/schedule/useSchedule'
import { useUtils } from '../hooks/useUtils'

export const ClassData: React.FC<ClassDataProps> = ({ price, classOption }) => {
  const { formatMinutes, formatPrice } = useUtils()

  return (
    <View style={styles.main}>
      <Text style={styles.boxSubtitle}>Informações</Text>

      <Text>
        <Text style={styles.infoTitle}>Duração:</Text> {formatMinutes(classOption.duration * 60)}
      </Text>
      <Text>
        <Text style={styles.infoTitle}>Valor aula:</Text> {formatPrice(classOption.amount)}
      </Text>
      <Text>
        <Text style={styles.infoTitle}>Taxa deslocamento:</Text>{' '}
        {price.tax ? formatPrice(price.tax) : `Grátis`}
      </Text>
      <Text>
        <Text style={styles.infoTitle}>Total:</Text> {formatPrice(classOption.totalAmount)}
      </Text>
    </View>
  )
}

type ClassDataProps = {
  price: CalculatePriceModel
  classOption: ClassOption
}

const styles = StyleSheet.create({
  main: {
    marginBottom: 15
  },
  infoTitle: {
    fontWeight: 'bold'
  },
  boxSubtitle: {
    fontSize: 14,
    marginBottom: 15
  }
})
