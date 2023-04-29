import { useCallback, useMemo } from 'react'
import { ButtonProps as ButtonPropsRN, Pressable, StyleSheet, Text, ViewStyle } from 'react-native'

export const Button: React.FC<ButtonProps> = ({
  type = 'default',
  onPress,
  title = 'Save',
  isDisabled,
  isActive,
  ...props
}) => {
  const getColor = useCallback(
    (type: string): { color: string; backgroundColor: string } => {
      const options = {
        default: {
          backgroundColor: '#000',
          color: '#FFF'
        },
        disabled: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#FFF'
        },
        active: {
          backgroundColor: 'green',
          color: '#FFF'
        }
      }

      if (isDisabled) return options['disabled']
      if (isActive) return options['active']

      return options[type]
    },
    [type, isActive, isDisabled]
  )

  const buttonStyles = useMemo(
    () => ({
      backgroundColor: getColor(type).backgroundColor
    }),
    [type, isActive, isDisabled]
  )

  const textStyles = useMemo(
    () => ({
      color: getColor(type).color
    }),
    [type, isActive, isDisabled]
  )

  return (
    <Pressable style={[styles.button, props.style, buttonStyles]} onPress={onPress}>
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </Pressable>
  )
}

type ButtonProps = ButtonPropsRN & {
  style?: ViewStyle
  type?: 'default' | 'info' | 'save'
  isActive?: boolean
  isDisabled?: boolean
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black'
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  }
})
