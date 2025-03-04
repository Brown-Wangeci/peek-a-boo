import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'


type ImageSrcType = {
    imgSrc: string
}

const ImageViewer = ({imgSrc}: ImageSrcType) => {
  return (
    <View style={styles.container}>
        <Image source={imgSrc} style={styles.image}/>
    </View>
  )
}

export default ImageViewer

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#171717",
        borderRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    }
})