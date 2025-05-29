import { FilterStatus } from "@/types/filter-status"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { styles } from "./styles"
import { StatusIcon } from "../status-icon"

type Props = TouchableOpacityProps & {
  status: FilterStatus
  isActive: boolean
}

export default function Filter({ status, isActive, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
      {...rest}
    >
      <StatusIcon status={status} />
      <Text style={styles.title}>
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  )
}
