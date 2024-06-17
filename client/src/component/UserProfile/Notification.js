import React,{useEffect,useState} from 'react'
import { decode } from "base-64";
global.atob = decode;
import {jwtDecode} from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View ,Text,StyleSheet,Image} from 'react-native'
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getNegotiation } from '../../reduce/negotiation'
import { useDispatch ,useSelector} from 'react-redux'
import { getReservation } from '../../reduce/reservation'
import { ScrollView } from 'react-native-gesture-handler';

export default function Notification({navigation}) {
const [userId,setUserId]=useState()
const [rev,setRev]=useState([])
const dispatch=useDispatch()
const user=useSelector(state=>state.userSignIn.userAuth)
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
    try {
      const userId = await tokenGeted();
      console.log('userId', userId);
      setUserId(userId);
      const response = await dispatch(getReservation(userId));
      setRev(response.payload);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchUserId();
}, []);

console.log('userrrrrrrrrrrrr',userId);


// const rev=useSelector(state=>state.getReservationn.reservation)
console.log('revvvvvvvvvv',rev);
  return (
    <ScrollView >
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name='arrow-back' size={30} style={styles.backIcon} onPress={()=>navigation.navigate('TabNavigator')}/>
        <Text style={styles.headerText}>Reservation</Text>
      </View>
      {Array.isArray(rev) && rev.map((e)=>(
        e?.room?.option?.map((i)=>(
          <View style={styles.contentContainer} key={e.id}>
              
        <View style={styles.contentInfo}>
          <Image source={{uri:e.room.hotel.imgUrl}} style={styles.image} />
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.label}>hotelName:</Text>
          <Text style={styles.text}>{e.room.hotel.name}</Text>
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.label}>view:</Text>
          <Text style={styles.text}>{e.room.view}</Text>
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.label}>option :</Text>
          <Text style={styles.text}>{i.Meal_Plan}</Text>
        </View>
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, index) => (
            <Icon key={index} size={20} name='star' color={'#f5a623'} />
          ))}
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.dateText}>startDate: {e.startDate.substring(0,10)}</Text>
          <Text style={styles.dateText}>endDate: {e.endDate.substring(0,10)}</Text>
        </View>
    </View>
      ))
    ))}
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 20,
    // marginBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    marginRight: 10,
    color: '#333',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 20,
    marginBottom: 20,
  },
  contentInfo: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    width: 120,
  },
  text: {
    fontSize: 16,
    color: '#777',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#777',
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 10,
    marginRight: 10,
  }
});