import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import MobileDatePicker from '@react-native-community/datetimepicker'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

import { useUtils } from '../hooks/useUtils'

export const DateContainer: React.FC<DateContainerProps> = ({ currentDate, onChange }) => {
  const { formatDate } = useUtils()
  const [showDate, setShowDate] = useState<boolean>(Platform.OS === 'ios')
  const [showTime, setShowTime] = useState<boolean>(Platform.OS === 'ios')

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="pt-br">
      <View style={styles.main}>
        <Text>Data:</Text>

        {Platform.OS !== 'web' && (
          <View style={styles.box}>
            {Platform.OS === 'android' && (
              <View style={styles.dateText}>
                <Text>{formatDate(currentDate?.toJSDate() || new Date())}</Text>

                <TouchableOpacity style={styles.editButton} onPress={() => setShowDate(true)}>
                  <Icon type="font-awesome" name="pencil" size={20} color={'#FFF'} />
                </TouchableOpacity>
              </View>
            )}

            {showDate && (
              <MobileDatePicker
                value={currentDate?.toJSDate() || new Date()}
                is24Hour={true}
                onChange={(_, date) => {
                  onChange(date ? DateTime.fromJSDate(date) : null)
                  setShowDate(false)
                  setShowTime(true)
                }}
              />
            )}

            {showTime && (
              <MobileDatePicker
                value={currentDate?.toJSDate() || new Date()}
                is24Hour={true}
                mode={'time'}
                onChange={(_, date) => {
                  const oldDate = currentDate!.toJSDate()
                  oldDate.setHours(date?.getHours() || 0)
                  oldDate.setMinutes(date?.getMinutes() || 0)
                  onChange(date ? DateTime.fromJSDate(date) : null)
                  setShowTime(false)
                }}
              />
            )}
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
  },
  dateText: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  editButton: {
    backgroundColor: '#000',
    marginLeft: 10,
    padding: 5,
    borderRadius: 5
  }
})
