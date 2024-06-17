import React, { useState,useEffect } from 'react'
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector ,useDispatch} from 'react-redux';
import { AllHotell } from '../../reduce/AllHotels';
import { IconButton,Button } from 'react-native-paper';
import IconS from 'react-native-vector-icons/Fontisto';

const { width } = Dimensions.get('window');
 function AllHotels({navigation}) {

const dispatch=useDispatch()
useEffect(()=>{
dispatch(AllHotell())
},[])
const hotel=useSelector(state=>state.allHotels.hotel)

console.log('hotel',hotel);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Icon name='arrow-back' size={30} style={styles.backIcon} onPress={() => navigation.navigate('Home')} />
      <View style={styles.searchInputContainer}>
        <Icon name="search" size={30} style={styles.icon} />
        <TextInput 
          placeholder="Search" 
          style={styles.input} 
          placeholderTextColor="#888"
        />
        <Button mode="contained" style={styles.searchButton}>Search</Button>
      </View>
      {hotel.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.card} 
          onPress={() => navigation.navigate('ChooseGategory', { hotelId: item.id, ownerId: item.owner.id ,hotelName:item.name})}
        >
          <View style={styles.favoriteButton}>
            <Icon name="star" size={15} color='orange' />
            <Text style={styles.ratingText}>5.0</Text>
          </View>
          <Image 
            source={{ uri:item.imgUrl }} 
            style={styles.cardImage} 
          />
          <View style={styles.cardDetails}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.cardTitle}>{item.name}</Text>
              </View>
              <IconS name="heart" size={26} color='#ff6347' style={styles.heartIcon} />
            </View>
            <View style={styles.ratingContainer}>
              <View style={styles.rating}>
                {[...Array(5)].map((_, index) => (
                  <Icon key={index} size={15} name='star' color={'orange'} />
                ))}
              </View>
              <Text style={styles.reviewCount}>365 reviews</Text>
            </View>
            <Text style={styles.rooms}>Rooms: {item.rooms}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View style={styles.dividerContainer}>
            <Text style={styles.divider}></Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  backIcon: {
    marginLeft: 20,
    marginBottom: 10,
    color: '#333',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 25,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  icon: {
    color: '#888',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 50,
  },
  searchButton: {
    marginLeft: 10,
  backgroundColor:'#112678'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardDetails: {
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  heartIcon: {
    color: '#ff6347',
    
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
  rooms: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  dividerContainer: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e8e8e8',
  },
});
export default AllHotels