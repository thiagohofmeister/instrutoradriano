import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import MobileDatePicker from '@react-native-community/datetimepicker'
import { DateTime } from 'luxon'
import { Platform, StyleSheet, Text, View } from 'react-native'

export const DateContainer: React.FC<DateContainerProps> = ({ currentDate, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="pt-br">
      <View style={styles.main}>
        <Text>Data:</Text>

        {Platform.OS !== 'web' && (
          <View style={styles.box}>
            <MobileDatePicker
              testID="dateTimePicker"
              value={currentDate?.toJSDate() || new Date()}
              is24Hour={true}
              mode={'date'}
              onChange={(_, date) => onChange(date ? DateTime.fromJSDate(date) : null)}
            />

            <MobileDatePicker
              testID="dateTimePicker"
              value={currentDate?.toJSDate() || new Date()}
              is24Hour={true}
              mode={'time'}
              onChange={(_, date) => onChange(date ? DateTime.fromJSDate(date) : null)}
            />
          </View>
        )}

        {Platform.OS === 'web' && (
          <View style={{ ...styles.box, ...styles.boxWeb }}>
            <DatePicker
              onChange={onChange}
              value={currentDate || DateTime.now()}
              defaultValue={
                currentDate || DateTime.now().setZone(undefined, { keepLocalTime: true })
              }
              disablePast={true}
              formatDensity="spacious"
              slotProps={{ textField: { size: 'small' } }}
            />
            <TimePicker
              onChange={onChange}
              value={currentDate || DateTime.now()}
              defaultValue={
                currentDate || DateTime.now().setZone(undefined, { keepLocalTime: true })
              }
              disablePast={true}
              formatDensity="spacious"
              slotProps={{ textField: { size: 'small' } }}
            />
          </View>
        )}
      </View>
    </LocalizationProvider>
  )
}

type DateContainerProps = {
  currentDate: DateTime | null
  onChange: (date: DateTime | null) => void
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  box: {
    display: 'flex',
    flexDirection: 'row'
  },
  boxWeb: {
    marginLeft: 15,
    gap: 15
  }
})
