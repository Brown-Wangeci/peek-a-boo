import ImageViewer from "@/components/ImageViewer";
import { StyleSheet, View, Alert } from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import Button from "@/components/Button";
import * as ImagePicker from 'expo-image-picker';
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import StickerList from "@/components/StickerList";
import StickerInImage from "@/components/StickerInImage";
const placeholderImage = require('@/assets/images/icon.jpeg')

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [ showAppOptions, setShowAppOptions ] = useState<boolean>(false);
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
  const [ stickerInImage, setStickerInImage ] = useState<string | undefined>(undefined);
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
    setStickerInImage(undefined);
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
        quality: 1,
        width: 1080,
        height: 1080,
      });
  
      await MediaLibrary.saveToLibraryAsync(uri);
  
      Alert.alert('Image saved successfully');
      
    } catch (error) {
      Alert.alert('Failed to save image');
    }
  }

  const onShareImageAsync = async () => {
    try {
      const uri = await captureRef(memeRef, {
        format: 'png',
        quality: 1,
        width: 1080,
        height: 1080,
      });

      // Save locally before sharing
      const fileUri = `${FileSystem.documentDirectory}captured_image.png`;
      await FileSystem.copyAsync({ from: uri, to: fileUri });

      // Check if sharing is available
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Sharing not available on this device");
      }
    } catch (error) {
      Alert.alert('Failed to share image');
    }
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  const onResetSticker = () => {
    setStickerInImage(undefined);
  } 

  const onModalCLose = () => {
    setIsModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View ref={memeRef} style={styles.imageContainer}>
        <ImageViewer imgSrc={selectedImage || placeholderImage}/>
        { stickerInImage && <StickerInImage image={stickerInImage}/>}
      </View>
      { showAppOptions ? 
        (
          <View style={styles.appOptionsContainer}>
            <View style={styles.appOptionsRow}>
              <IconButton label='Remove sticker' icon='cancel' onPress={onResetSticker}/>
              <IconButton label='Reset' icon='refresh' onPress={onReset}/>
              <CircleButton onPress={onAddSticker}/>
              <IconButton label='Save' icon='save-alt' onPress={onSaveImage}/>
              <IconButton label='Share' icon='share' onPress={onShareImageAsync}/>
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
        <StickerList setStickerInImage={setStickerInImage} />
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
    gap: 28
  }
})