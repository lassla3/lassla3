import React, { useState,useEffect } from 'react'
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from 'react-native';
import { decode } from "base-64";
global.atob = decode;
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconS from 'react-native-vector-icons/Fontisto'
import {getFavoriteHotel} from '../../reduce/favoriteHotel'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from "jwt-decode";
export default function Favorites({navigation}) {
const [userId,setUserId]=useState()

const dispatch=useDispatch()
const tokenGeted = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  const fetchUserId = async () => {
    const userId = await tokenGeted();
    setUserId(userId);
    return userId;
  }

  fetchUserId().then(userId => {
    dispatch(getFavoriteHotel(userId));
  });
}, [userId]);
const allFave=useSelector(state=>state.getFavoriteSlice.getFavorite)
console.log('data',allFave);


  return (
    <ScrollView>
    <View style={styles.container}>
    <Text style={styles.header}>Favorites</Text>
    {allFave?.user && allFave.user.map((item) =>{
      {console.log('item',item.hotel);}
    

   return <TouchableOpacity key={item.id}  onPress={() => navigation.navigate('ChooseGategory', { hotelId: item.id, ownerId: item.owner })}>
      <View style={styles.card}>
        <View style={styles.favoriteButton}>
          <Icon name="star" size={15} color='orange' />
          <Text style={styles.ratingText}>5.0</Text>
        </View>
        <Image style={styles.cardImage} source={{uri:item.hotel.imgUrl }}/>
        <View style={styles.cardDetails}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.cardTitle}>{item.hotel.name}</Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Icon name="star" size={15} color='orange' />
              <Icon name="star" size={15} color='orange' />
              <Icon name="star" size={15} color='orange' />
              <Icon name="star" size={15} color='orange' />
              <Icon name="star" size={15} color='orange' />
            </View>
            <Text style={styles.reviewCount}>365 reviews</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    
    })}
  </View>
  </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: '#e8e8e8',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    height: 300,
    width: 350,
    elevation: 10,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardDetails: {
    padding: 15,
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 5,
  },
  heartIcon: {
    color: '#ff6347',
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHotelCard: {
    height: 140,
    width: 120,
    backgroundColor: '#ffffff',
    elevation: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  topHotelCardImage: {
    height: 100,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  topHotelCardDetails: {
    padding: 5,
    backgroundColor: '#ffffff',
  },
  topHotelCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
