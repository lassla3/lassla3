import { Platform } from "react-native";
import { io } from "socket.io-client";
import {AP_ADRESS} from'../src/apAdress'
export const BaseUrl =
  Platform.OS === "android" ? "http://10.0.2.2:4000/" : `http://${AP_ADRESS}:3000`;

export const socket = io.connect("http://10.0.2.2:3000/");