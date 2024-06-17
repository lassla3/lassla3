import React,{useEffect,useState} from 'react'
import { View ,Text,StyleSheet} from 'react-native'
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getNegotiation } from '../../reduce/negotiation'
import { useDispatch ,useSelector} from 'react-redux'
  import io from 'socket.io-client';
  import { AP_ADRESS } from '../../apAdress'
  const socket = io(`http://${AP_ADRESS}:4000`); 

export default function Notification({navigation}) {
  const [receivedData, setReceivedData] = useState([]);

  
const dispatch=useDispatch()

const getWhereHotelId=async()=>{
    dispatch(getNegotiation())
}

useEffect(() => {

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('connect_error', (error) => {
    console.log('Connection error:', error);
  });
  socket.on('Received_request', (data) => {
    console.log('Received data:', data);
    
      setReceivedData(...data);
   
      console.log('Received data is undefined or null');
    
  });

  return () => {
    console.log('Disconnecting from server...');
    socket.disconnect();
  };
}, []);

console.log('Received data state:', receivedData);




  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Icon name='arrow-back' size={30} style={styles.backIcon} onPress={() => navigation.goBack()} />
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
          onPress={() => navigation.navigate('ChooseGategory', { hotelId: item.id, ownerId: item.owner.id })}
        >
          <View style={styles.favoriteButton}>
            <Icon name="star" size={15} color='orange' />
            <Text style={styles.ratingText}>5.0</Text>
          </View>
          <Image 
            source={{ uri: 'https://image.resabooking.com/images/hotel/Concorde_Green_Park_Palace_3.jpg' }} 
            style={styles.cardImage} 
          />
          <View style={styles.cardDetails}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.cardTitle}>{item.name}</Text>
              </View>
              <Icon name="heart" size={26} color='#ff6347' style={styles.heartIcon} />
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
      backgroundColor: '#F0F8FF',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E1EBEE',
      paddingHorizontal: 10,
      paddingTop: 10,
    },
    backIcon: {
      marginRight: 10,
      marginTop: 10,
    },
    headerText: {
      flex: 1,
      textAlign: 'center',
      fontSize: 20,
      color: 'black',
    },
    contentContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    contentInfo: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    label: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'black',
      marginRight: 5,
    },
    text: {
      fontSize: 16,
      color: 'black',
    },
    dateText: {
      marginTop: 4,
      fontSize: 16,
      color: 'black',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      paddingHorizontal: 20,
    },
    cancelButton: {
      width: '40%',
      color: 'red',
      borderColor: 'red',
      borderWidth: 1,
    },
    acceptButton: {
      width: '40%',
      backgroundColor: 'green',
    },
  });