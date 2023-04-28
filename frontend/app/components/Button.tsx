import { useMemo } from 'react'
import { ButtonProps as ButtonPropsRN, Pressable, StyleSheet, Text } from 'react-native'

export const Button: React.FC<ButtonProps> = ({ onPress, title = 'Save', ...props }) => {
  const buttonStyles = useMemo(() => {
    let s = styles.button

    if (props.style) {
      s = { ...s, ...props.style }
    }

    return s
  }, [props.style])

  return (
    <Pressable style={buttonStyles} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

type ButtonProps = ButtonPropsRN & {
  style?: any
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  }
})
