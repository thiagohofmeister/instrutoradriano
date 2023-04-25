import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, Modal, View } from 'react-native'
import { Icon } from 'react-native-elements'

interface Props {
  label: string
  isRequired?: boolean
  value?: string | null | undefined
  data: Array<{ label: string; value: string | null }>
  onSelect: (item: { label: string; value: string | null }) => void
}

export const Dropdown: React.FC<Props> = ({ label, value, data, isRequired, onSelect }) => {
  const DropdownButton = useRef<any>()
  const [visible, setVisible] = useState<boolean>(false)
  const [selected, setSelected] = useState<{ label: string; value: string | null } | undefined>(
    undefined
  )
  const [dropdownTop, setDropdownTop] = useState(0)
  const [dropdownLeft, setDropdownLeft] = useState(0)
  const [dropdownWidth, setDropdownWidth] = useState(0)

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown()
  }

  useEffect(() => {
    if (value) {
      const item = data.find(op => op.value === value)!

      if (!!item) {
        setSelected(item)
        onSelect(item)
      }
    }
  }, [value, data])

  useEffect(() => {
    if (!selected) {
      setSelected(undefined)
    }
  }, [selected])

  const openDropdown = useCallback((): void => {
    DropdownButton.current?.measure(
      (_fx: number, _fy: number, _w: number, h: number, _px: number, py: number) => {
        setDropdownTop(py + h + 2)
        setDropdownLeft(_px - 5)
        setDropdownWidth(_w)
      }
    )
    setVisible(true)
  }, [DropdownButton, setDropdownTop])

  const onItemPress = useCallback(
    (item: any): void => {
      if (!item.value) {
        setSelected(undefined)
      } else {
        setSelected(item)
      }

      onSelect(item)
      setVisible(false)
    },
    [setSelected, onSelect, setVisible]
  )

  const renderItem = useCallback(
    ({ item }: any): ReactElement<any, any> => (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Text>{item.label}</Text>
      </TouchableOpacity>
    ),
    [onItemPress]
  )

  const renderDropdown = useCallback((): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View
            style={[
              styles.dropdown,
              { left: dropdownLeft, top: dropdownTop, width: dropdownWidth }
            ]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }, [setVisible, renderItem, data, visible, dropdownLeft, dropdownTop, dropdownWidth])

  const renderLabel = useMemo(() => {
    if (!!selected) return selected.label

    return (
      <>
        {label} {!!isRequired && <Text style={styles.required}>*</Text>}
      </>
    )
  }, [selected, label, isRequired])

  return (
    <TouchableOpacity ref={DropdownButton} style={styles.button} onPress={toggleDropdown}>
      {renderDropdown()}
      <Text style={styles.buttonText}>{renderLabel}</Text>
      <Icon style={styles.icon} type="font-awesome" name="chevron-down" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 40,
    zIndex: 1
  },
  buttonText: {
    flex: 1,
    marginLeft: 5
  },
  icon: {
    marginRight: 10
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5
  },
  overlay: {
    height: '100%',
    position: 'relative'
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor: '#efefef',
    borderColor: '#dfdfdf'
  },
  required: {
    color: '#FF3358',
    fontSize: 13
  }
})
