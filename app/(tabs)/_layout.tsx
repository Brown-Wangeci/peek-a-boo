import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"

export default function TabsLayout() {
  return(
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: "#D0D0D0",
            headerTintColor: "#D0D0D0",
            headerShadowVisible: true,
            headerStyle: {
                backgroundColor: "#171717"
            },
            tabBarStyle: {
                backgroundColor: "#171717",
                borderColor: "#464C55"
            },
            tabBarLabelStyle: { fontSize: 12 },
        }}
    >
      <Tabs.Screen
        name="index"
        options={{
            title: "Home",
            tabBarIcon: ({color})=><Ionicons name="home-sharp" color={color} size={20} />  ,
            headerTitle: "PeekaBoo",
      }}/>
      <Tabs.Screen
        name="about"
        options={{
            title: "About",
            tabBarIcon: ({color})=><Ionicons name="chatbubble-ellipses" color={color} size={20}/>,
            headerTitle: "About PeekaBoo",
      }}/>
    </Tabs>
  );
}
