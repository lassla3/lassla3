import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { getOneAsync } from '../../reduce/getOne';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome';
import Te from 'react-native-vector-icons/Ionicons'
import IconFa from 'react-native-vector-icons/MaterialIcons'
const UserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); 
      // await AsyncStorage.removeItem('user'); 
      navigation.navigate('AppFace'); 
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

const HandleButton=()=>{
  navigation.navigate('Migrations');
}
useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        // Await the dispatch result to get the user data
        const result = await dispatch(getOneAsync(userId));

        // Check if the result has a payload
        if (result && result.payload) {
          console.log("id: ", result.payload);
          setProfile(result.payload);
        } else {
          console.log("No payload found in the result");
        }
      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  fetchUserProfile();
}, []);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
       
        <View style={styles.coverImage} >
        <Te name="notifications-outline" size={25} color="#f5f5f5" style={styles.Te}/>
        </View>
      
      <View style={styles.header} >
        <Image source={{ uri: profile?.imgUrl }} style={styles.image} />
        <Text style={styles.fullName}>{profile?.firstName} {profile?.lastName}</Text>
      </View>
      <ScrollView style={styles.sidebar}>
      <View style={styles.infoBox}>
          <Icon name="phone" size={25} color="#161618" />
          <Text style={styles.infoText}>{profile?.phoneNumber}</Text>
        </View>
        <View style={styles.infoBox}>
          <Icons name="envelope-o" size={25} color="#161618" />
          <Text style={styles.infoText}>{profile?.email}</Text>
        </View>
        <TouchableOpacity style={styles.sidebarItem} onPress={handleEditProfile}>
          <Icon name="edit" size={25} color="#161618" />
          <Text style={styles.sidebarText}>Manage your Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <Icons name="heart-o" size={25} color="#161618" />
          <Text style={styles.sidebarText}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <Icon name="creditcard" size={25} color="#161618" />
          <Text style={styles.sidebarText}>Transations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={()=>navigation.navigate('Notification')}>
          <IconFa name="notifications-none" size={25} color="#161618" />
          <Text style={styles.sidebarText}>Your Reservation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <Icon name="like2" size={25} color="#161618" />
          <Text style={styles.sidebarText}>Reviews</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sidebarItem} onPress={HandleButton}>
          <IconFa name="add-home-work" size={30} color="#161618" />
          <Text style={styles.sidebarText}>List Your Property</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sidebarItem} 
       onPress={handleLogout}
        > 
          <Icon name="logout" size={25} color="#161618" />
          <Text style={styles.sidebarText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // backgroundColor:"112678"

  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    position: 'relative',
    // marginTop:10,
    backgroundColor:"#112678"

  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  coverImage: {
    position: 'absolute',
    width: '100%',
    height: 180,
    zIndex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor:"#112678"
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#F2F2FA',
    zIndex: 1,
    backgroundColor:"112678",
marginTop: 20,
    
  },

  sidebar: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    paddingLeft:20,
    // marginRight: 1050,
    
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop:30
  },
  sidebarText: {
    marginLeft: 30,
    color: '#161618',
    fontSize: 20,
    
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop:25

  },
  infoText: {
    marginLeft: 10,
    color: '#161618',
    fontSize: 20,
    marginLeft: 30,

  },
  Te:{
    marginLeft: 10,
    fontSize: 20,

  }
});

export default UserProfile;
