import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>About Uber.</Text>
    </SafeAreaView>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#171717",
    },
    text: {
        color: "#fff",
        fontSize: 15,
    }
})