import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text, Alert, Image, TouchableOpacity } from "react-native";
import Constants from 'expo-constants';

// import { GIPHY_API_KEY } from "@env"; // Load API key from .env
const GIPHY_API_KEY = Constants.expoConfig?.extra?.GIPHY_API_KEY;

// Define TypeScript types
type Sticker = {
  id: string,
  images: {
    fixed_height?: { url?: string },
  };
}

type Props = {
  setStickerInImage: (sticker: string) => void;
}

const StickerList = ({setStickerInImage}: Props) => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchStickers = async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/stickers/trending?api_key=${GIPHY_API_KEY}&limit=15&offset=0&rating=g&bundle=messaging_non_clips
`
        );
        if (!response.ok) throw new Error("Failed to fetch stickers");

        const data = await response.json();
        if (!data || !data.data) throw new Error("Invalid API response");

        setStickers(data.data);
      } catch (error) {
        Alert.alert("Error", error instanceof Error ? error.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStickers();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (!stickers.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 15, fontWeight: 100, marginBottom: 20, color: '#FFD700', textAlign: 'center' }}>No stickers found. Try again later.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 15, fontWeight: 100, marginBottom: 20, color: '#FFD700', textAlign: 'center' }}>
        Trending Stickers
      </Text>
      <FlatList
        data={stickers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          item.images.fixed_height?.url ? (
            <TouchableOpacity
              style={{flex: 1, width: 65, height: 65, margin: 5}}
              onPress={() => setStickerInImage(item.images.fixed_height!.url!)}
            >
              <Image
                source={{ uri: item.images.fixed_height.url }}
                style={{ width: "100%", height: "100%"}}
              />
            </TouchableOpacity>
          ) : <Text style={{color:'white'}}>--</Text>
        }
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default StickerList;
