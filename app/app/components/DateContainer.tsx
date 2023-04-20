import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native'
import { DateTime } from 'luxon'

export const DateContainer: React.FC<DateContainerProps> = ({ onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="pt-br">
      <SafeAreaView style={styles.main}>
        {Platform.OS !== 'web' && (
          <MobileDateTimePicker onChange={onChange} defaultValue={DateTime.now()} />
        )}

        {Platform.OS === 'web' && (
          <DateTimePicker
            onChange={onChange}
            defaultValue={DateTime.now()}
            formatDensity="spacious"
            slotProps={{ textField: { size: 'small' } }}
          />
        )}
      </SafeAreaView>
    </LocalizationProvider>
  )
}

type DateContainerProps = {
  onChange: (date: DateTime | null) => void
}

const styles = StyleSheet.create({
  main: {}
})
