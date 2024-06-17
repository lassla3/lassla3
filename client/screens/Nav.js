import React,{useEffect} from 'react';
import { View } from 'react-native';
import io from 'socket.io-client';
import {AP_ADRESS} from '../src/apAdress.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Onboarding from '../src/component/Inboarding/Inboarding'; 
import UserProfile from "../src/component/UserProfile/UserProfile"
import EditProfile from '../src/component/editprofile/EditProfile';
import Home from "../src/component/HomePage/Home"
import OwnerProfile from "../src/component/OwnerProfile/OwnerProfile"
import AppFace from "../src/component/AppFace/AppFace.js";
import Favorites from '../src/component/Detail/FavoriteCart'
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFa from 'react-native-vector-icons/FontAwesome';
import Hotels, { FA5Style } from 'react-native-vector-icons/FontAwesome5'
import Favorite from "react-native-vector-icons/MaterialIcons"
import Calander  from '../src/component/Detail/Calander.js';
import ChooseChildren from '../src/component/Detail/ChooseChildren.js';
import Login from "../src/component/authentication/Login"
import SignUp from '../src/component/authentication/SigneUp';
import Detail from '../src/component/Detail/Detail.js';
import AllHotels from '../src/component/allHotels/AllHotels.js';
import RoomByHotel from '../src/component/allHotels/RoomByHotel.js';
import ChooseGategory from '../src/component/allHotels/ChooseGategory.js';
import HotelProfile from '../src/component/Hotelprofile/Hotelprofile.js';
import Notification from '../src/component/UserProfile/Notification.js';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';
import ReservationProfile from '../src/component/Detail/ReservationProfile.js';
import Migrations from "../src/component/OwnerProfile/Migrations.js"
import Migrations2 from "../src/component/OwnerProfile/Migration2.js"
import Chhat from './Chhat.js';
import Map from "../src/component/Map/Map.js"
import Payment from "../src/component/Payment/Payment"
import CodeQR from '../src/component/AboutUs/CodeQR.js'
import Confirmation from '../src/component/Detail/Confirmation.js';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function Nav({Navigation}) {

  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Onboarding"  component={Onboarding}  options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
        <Stack.Screen name="Confirmation" component={Confirmation} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
         <Stack.Screen name="Map" component={Map} options={{ headerShown: false }}/> 

        <Stack.Screen name="Favorites"  component={Favorites}  options={{ headerShown: false }} />  
        <Stack.Screen name="AllHotels" component={AllHotels} options={{ headerShown: false }}/>
        <Stack.Screen name="ChooseChildren" component={ChooseChildren} options={{ headerShown: false }}/>
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="HotelProfile" component={HotelProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Login"  component={Login}  options={{ headerShown: false }} />
        <Stack.Screen name="ChooseGategory" component={ChooseGategory} options={{ headerShown: false }}/>
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }}/>
        <Stack.Screen name="CodeQR" component={CodeQR} options={{ headerShown: false }}/>


       
      
       
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />

      
       
        
       
        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }}/>
    
        <Stack.Screen name="Calander" component={Calander} options={{ headerShown: false }}/>
   
        <Stack.Screen name="AppFace"  component={AppFace} options={{ headerShown: false }}/>
        <Stack.Screen name="TabNavigator"  component={TabNavigator}  options={{ headerShown: false }} />    
        <Stack.Screen name="ReservationProfile" component={ReservationProfile} options={{ headerShown: false }}/>
 

       
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}} />
        <Stack.Screen name="Migrations" component={Migrations} options={{headerShown: false}} />
        <Stack.Screen name="Migrations2" component={Migrations2} options={{headerShown: false}} />
        <Stack.Screen name="OwnerProfile" component={OwnerProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Chhat" component={Chhat} options={{ headerShown: false }}/>
       
      </Stack.Navigator>
     
    </NavigationContainer>

  );
}

function TabNavigator({Navigation}) {
  return (
    <Tab.Navigator   tabBarOptions={{
      activeTintColor: '#112678',
      inactiveTintColor: 'gray',
    }}  >
      <Tab.Screen
   
  name="Home"
  component={Home}
  options={{
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Icon name="home" color={color} size={size} />
    ),
    tabBarLabelStyle: {
      fontSize: 14
    }
  }}
/>
<Tab.Screen
  name="Hotel"
  component={AllHotels}
  options={{
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Hotels name="hotel" color={color} size={20} />
    ),
    tabBarLabelStyle: {
      fontSize: 14
    }
  }}
 
/>
<Tab.Screen
  name="Favorite"
  component={Favorites}
  options={{
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Favorite name="favorite" color={color} size={size} />
    ),
    tabBarLabelStyle: {
      fontSize: 14
    }
  }}
/>
<Tab.Screen
  name="Chat"
  component={Chhat}
  options={{
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Icon name="chat" color={color} size={size} />
    ),
    tabBarLabelStyle: {
      fontSize: 14
    }
  }}
/>
<Tab.Screen
  name="Profile"
  component={UserProfile}
  options={{
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <IconFa name="user-circle-o" color={color} size={size} />
    ),
    tabBarLabelStyle: {
      fontSize: 14
    }
  }}
/>
    </Tab.Navigator>
  );
}

export default Nav;