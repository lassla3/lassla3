import { StatusBar } from 'react-native';
import { StyleSheet } from "react-native";
import ChatHomescreen from "./ChatHomescreen";
import Chatscreen from "./Chatscreen";
import Messagescreen from "./Messagescreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GlobalState from "../context";

const Stack = createNativeStackNavigator();

export default function Chhat() {
  return (
    <GlobalState>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          {/* all the screens here */}
          <Stack.Screen
            name="ChatHomescreen"
            component={ChatHomescreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chatscreen"
            component={Chatscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Messagescreen" component={Messagescreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true}/>
    </GlobalState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});