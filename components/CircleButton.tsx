import { Pressable, StyleSheet} from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
    

type Props = {
    onPress?: () => void
}

const CircleButton = ({ onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.circleButton}>
        <MaterialIcons name="add" size={32} color="#171717" />
    </Pressable>
  )
}
    

export default CircleButton

const styles = StyleSheet.create({
    circleButton: {
        width: 64,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
        borderStyle: 'solid',
        borderRadius: "50%",
        borderColor: "#FFD700",
        borderWidth: 3,
        backgroundColor: "whitesmoke"
    }
})