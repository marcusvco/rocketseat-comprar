import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { styles } from "./styles"

type Props = TouchableOpacityProps & {
  title: string
}

export default function Button({ title, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}
