import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
    

type Props = {
    icon: keyof typeof MaterialIcons.glyphMap,
    label: string,
    onPress?: () => void
}

const IconButton = ({icon, label, onPress}: Props) => {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
        <MaterialIcons name={icon} size={24} color="whitesmoke" />
        <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  )
}
    

export default IconButton

const styles = StyleSheet.create({
    iconButton: {
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 48,  
    },
    iconButtonLabel: {
        color: "whitesmoke",
        fontSize: 12,
        wordWrap: "break-word", 
    }
})