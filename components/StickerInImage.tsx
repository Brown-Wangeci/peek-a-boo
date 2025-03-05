import { StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'

type Props = {
    image: string,
}

const StickerInImage = ({image}: Props) => {
  return (
    <View style={styles.stickerInImageContainer}>
        <Image
            source={image}
            style={styles.stickerInImage}
        />
    </View>
  )
}

export default StickerInImage

const styles = StyleSheet.create({
    stickerInImageContainer: {
        position: 'absolute',
        top: '0%',
        left: '0%',
        width: 150,
        height: 150,
    },
    stickerInImage: {
        width: "100%",
        height: "100%",
    }
})