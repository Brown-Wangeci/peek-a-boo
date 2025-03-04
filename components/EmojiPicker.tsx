import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'


type Props = {
    isVisible: boolean
    onClose: () => void
    children: React.ReactNode
}

const EmojiPicker = ({ isVisible, onClose, children }: Props) => {
  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Choose a Sticker</Text>
                <Pressable onPress={onClose}>
                    <MaterialIcons name="close" size={22} color="#fff" />
                </Pressable>
            </View>
            {children}
        </View>
    </Modal>
  )
}

export default EmojiPicker

const styles = StyleSheet.create({
    modalContent: {
        height: "30%",
        width: "100%",
        position: "absolute",
        bottom: 0,
        borderBottomRightRadius: 18,
        borderTopLeftRadius: 18,
        backgroundColor: '#171717',
    },
    titleContainer: {
        height: "16%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
        backgroundColor: "#464C55",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        color: "#fff",
        fontSize: 16,
    }
})