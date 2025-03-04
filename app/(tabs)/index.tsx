import ImageViewer from "@/components/ImageViewer";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { captureRef } from "react-native-view-shot";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import Button from "@/components/Button";
import * as ImagePicker from 'expo-image-picker';
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
const placeholderImage = require('@/assets/images/icon.jpeg')

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [ showAppOptions, setShowAppOptions ] = useState<boolean>(false);
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
  const memeRef = useRef(null);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result?.assets[0]?.uri);
    }
  }

  const takeImageAsync = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result?.assets[0]?.uri);
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
  }

  const onSaveImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Allow access to save images.");
        return;
      }

      const uri = await captureRef(memeRef, {
        format: 'png',
        quality: 1
      });
  
      await MediaLibrary.saveToLibraryAsync(uri);
  
      Alert.alert('Image saved successfully');
      
    } catch (error) {
      Alert.alert('Failed to save image');
    }
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  const onModalCLose = () => {
    setIsModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View ref={memeRef} style={styles.imageContainer}>
        <ImageViewer imgSrc={selectedImage || placeholderImage}/>
      </View>
      { showAppOptions ? 
        (
          <View style={styles.appOptionsContainer}>
            <View style={styles.appOptionsRow}>
              <IconButton label='Reset' icon='refresh' onPress={onReset}/>
              <CircleButton onPress={onAddSticker}/>
              <IconButton label='Save' icon='save-alt' onPress={onSaveImage}/>
            </View>
          </View>
        )
        :
        (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Button label="Choose a photo" handelPress={pickImage} theme="primary" />
            <Button label="Take a photo" handelPress={takeImageAsync} theme="secondary" />
            <Button label="Use this photo" handelPress={() => setShowAppOptions(true)} />
          </View>
        )
      }
      <EmojiPicker isVisible={isModalVisible} onClose={onModalCLose}>
        <></>
      </EmojiPicker>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#171717",
    gap: 20
  },
  imageContainer: {
    flex: 2,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 10,
    overflow: "hidden",
  },
  text: {
    color: "#fff",
    fontSize: 15,
  },
  link: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "white",
    marginTop: 10
  },
  appOptionsContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  appOptionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 52
  }
})