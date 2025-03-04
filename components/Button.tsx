import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

type Props = {
    label: string,
    handelPress?: () => void,
    theme?: 'primary'|'secondary'
}

const Button = ({label, handelPress, theme}: Props) => {

    if (theme === 'primary') {
        return(
            <View style={[styles.buttonContainer, {borderStyle: 'solid', borderColor: "#FFD700", borderWidth: 3, backgroundColor: "whitesmoke"}]}>
                <Pressable onPress={handelPress} style={[styles.button,{ flexDirection: "row", gap: 20}]}>
                    <FontAwesome name="photo" size={20} color="#171717" />
                    <Text style={[styles.text, {color: '#171717'}]}>{label}</Text>
                </Pressable>
            </View>
        )
    }
    if (theme === 'secondary') {
        return(
            <View style={[styles.buttonContainer, {borderStyle: 'solid', borderColor: "#FFD700", borderWidth: 3}]}>
                <Pressable onPress={handelPress} style={[styles.button,{ flexDirection: "row", gap: 20}]}>
                    <FontAwesome name="camera" size={20} color="whitesmoke" />
                    <Text style={[styles.text, {color: 'whitesmoke'}]}>{label}</Text>
                </Pressable>
            </View>
        )
    }




  return (
    <View style={styles.buttonContainer}>
        <Pressable onPress={handelPress} style={styles.button}>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 240,
        height: 48,
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 10,
    },
    button: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 16,
    }
})