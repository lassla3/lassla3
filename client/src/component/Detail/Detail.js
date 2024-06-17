import React,{useState,useEffect,useRef,createContext} from 'react'
import { View, Text, StyleSheet, Linking ,ScrollView,Image,Dimensions,TouchableOpacity,TextInput,Animated } from 'react-native';
import { ActivityIndicator,Modal,Pressable } from 'react-native';
import { decode } from "base-64";
global.atob = decode;
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button,IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { negotiation } from '../../reduce/negotiation';
import ReservationProfile from './ReservationProfile';
import socket from "../../../socket" 

import {jwtDecode} from "jwt-decode";

const { width } = Dimensions.get('window');



export default function Detail({route,navigation}) {
 
    const [dimension, setDimension] = useState(Dimensions.get('window'));
    const [modalVisible, setModalVisible] = useState(false);
    const [newPrice, setNewPrice] = useState(false);
    const [newPrice2, setNewPrice2] = useState(false);
    const [price2, setPrice2] = useState();
    const [prix,setPrix]=useState()
    const [input,setInput]=useState('')
    const [id,setId]=useState()
    const [socketN, setSocketN] = useState(null);
    const [userId,setUserId]=useState()
    const [user,setUser]=useState({})
    const [visible, setVisible] = React.useState(false);
    const [data, setData] = useState({});

    const dispatch=useDispatch()

    const scrollRef = useRef();
    const compar=useSelector(state=>state.comparPrice.compar)||[]
    const tokenGeted = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const decoded = jwtDecode(token);
        setUserId(decoded.id)
        return decoded.id;
      } catch (error) {
        console.log(error);
      }
    }
    tokenGeted()
    console.log('id',userId);
    console.log('compar',compar);
  
    const body={
      roomId:id,
      newPrice:price2,
      content:input,
      ownerId:route?.params?.ownerId,
      userId:userId,
      dates:route?.params?.selectedDates,
      hotelName:route?.params?.hotelName,
      price2:price2,
      numRoom:route?.params?.numRoom
    }
    const numRoom=route?.params?.numRoom
    const time=route?.params?.selectedDates
    console.log(body);
    useEffect(() => {
      getUsers()
   
      socket.on('connection', () => {
        console.log('Connected to server');
      }); 
      
    if (!socket) console.log("not connected to sockete");
    socket.emit('join',route?.params?.ownerId);
   
      
    socket.on('response_request',(data)=>{
      console.log('response_request response_requestresponse_request'  , data);
      setData(data);
      setVisible(true);
    })
      
    
    return () => socket.off('disconnect');
    }, []);

    const showResponse=()=>{
      return (
        <Modal
        animationType='slide'
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable style={styles.closeButton} onPress={() => setVisible(false)}>
            <Icon name='close' size={30} />
          </Pressable>
            <Text style={styles.modalText}>{data.status}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              
            >
              <Text style={styles.modalButtonText}>Price:{data?.body?.newPrice}</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>Room N°: {data?.body?.roomId}</Text>
            <Text style={styles.modalText}> {data?.user?.firstName} {data?.user?.lastName}</Text>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.actionButton} onPress={() =>navigation.navigate('Confirmation',{data})}>
                <Text style={styles.actionButtonText}>Okey</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  
      )
    }

  // console.log('price',price2);
    const getUsers=async()=>{
      try {
        
      const users=  await AsyncStorage.getItem('user');
      if(users){
        const parse =JSON.parse(users)
         setUser(parse)


      }
        console.log("Token user successfully");
      } catch (err) {
        console.log("Error storing token:", err);
      }
    }
  
    const sendNego=(r)=>{
      socket.emit('send_request',{user,body,room:compar})
      dispatch(negotiation(r))
      console.log('hello');
      setNewPrice2(!newPrice2)

    }
   
   
    const plus = () => {
      if (price2>=0){

        setPrice2(price2 + 5);
      }
    };
  
    const minus = () => {
      if (price2>0) {
        setPrice2(price2 - 5);
      }
    };

    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        
        if(token !== null) {
          return true;
        } else {
          return false;
        }
      } catch(e) {
        console.log(e);
        return false;
      }}
   
      const negos=async ()=>{
        if(await checkToken()){
          setPrice2(compar?.mainRooms[0].price)
          setId(compar?.mainRooms[0].id)
          setNewPrice2(!newPrice2)
        }else{
          setModalVisible(!modalVisible)
  
        }
      }

const check = async () => {
  if(await checkToken()){
    setModalVisible(!modalVisible)
  }else{
    navigation.navigate('Succes')
  }
}
const nego= (p)=>{
  if(checkToken()){
  
    setNewPrice(!newPrice)
    setPrix(p)
    console.log('ppp',p);
  }else{
    setNewPrice(!newPrice)
    setPrix(p)
    console.log(p);
  }
}


return (

      <View style={styles.container}>
      {showResponse()}
      <ScrollView>
      <ReservationProfile/>
        <View style={styles.detailsContainer}>
          {compar?.mainRooms &&
            compar.mainRooms.map((e, index) => (
              <View key={index} style={styles.roomContainer}>
                <Text style={styles.hotelName}>The Carlton Hotel</Text>
                <Text style={styles.detailsText}>Rooms: {numRoom}</Text>
                <Text style={styles.detailsText}>2 bedrooms, 2 bathrooms</Text>
                <Text style={styles.detailsText}>People: {e?.capacity}</Text>

                <View style={styles.starsContainer}>
                  {[...Array(5)].map((_, index) => (
                    <Icon key={index} size={20} name='star' color={'#f5a623'} />
                  ))}
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Price</Text>
                  <Text style={styles.price}>{e?.price*time.length*numRoom} DT</Text>
                </View>
              </View>
            ))}

    
        </View>

        <Modal
      style={{height:40,width:40}}
        animationType="slide"
        transparent={true}
        visible={newPrice2}
        onRequestClose={() => {
          setNewPrice2(!newPrice2);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              style={{marginTop:-10,marginRight:280}}
              onPress={() => setNewPrice2(!newPrice2)}>
        <Icon name='close' size={30} onPress={() => setNewPrice2(!newPrice2)}/>
        </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '10%' }}>
         <IconButton icon="minus-circle-outline" size={30} onPress={minus} />
         <Text style={{fontSize:17}}>{price2}</Text>
        <IconButton icon="plus-circle-outline" size={30} color="red" style={{color:'red'}} onPress={plus} />
       </View>
       <View>
        <TextInput
        style={{borderRadius:15,width:250,fontSize:15,paddingLeft: 10,borderWidth:1,borderColor:'black',marginTop:17}}
          placeholder='Create somthing'
          onChangeText={(text) => setInput(text)}
        />
        <Button style={{marginTop:15,backgroundColor:'#112678',color:'white',fontSize:150}} onPress={()=>sendNego(body)}>Send</Button>
       </View>
          
          </View>
        </View>
      </Modal>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={negos}>
            <Text style={styles.buttonText}>Negotiation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={check}>
            <Text style={styles.buttonText}>Reservation</Text>
          </TouchableOpacity>
        </View>

      
        <Text style={styles.divider}></Text>
        <Text style={styles.anotherRoomText}>Another Room</Text>
        <View style={styles.relatedRoomsContainer}>
          {compar?.relatedRooms &&
            compar.relatedRooms.map((e, index) => (
              <TouchableOpacity key={index} style={styles.relatedRoomCard}>
                <Image
                 source={{ uri: 'https://image.resabooking.com/images/hotel/Concorde_Green_Park_Palace_3.jpg' }}
                  style={styles.relatedRoomImage}
                />
                <View style={styles.relatedRoomDetails}>
                  <Text style={styles.relatedRoomTitle}>{e?.view}</Text>
                  <Text style={styles.relatedRoomInfo}>People: {e?.capacity}</Text>
                  <Text style={styles.relatedRoomInfo}>Price: DT {e?.price*time.length*numRoom}</Text>
                  <Text style={styles.relatedRoomInfo}>Rooms: {numRoom}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Icon name='keyboard-backspace' size={30} />
            </Pressable>
            <Text style={styles.modalText}>If you have an Account?</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.modalButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>If you don't have an Account?</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.modalButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 55,
    padding: 10,
    opacity: 0.6,
  },
  carouselImage: {
    width: width,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  paginationDot: {
    fontSize: 20,
    marginRight: 5,
    color: '#999',
  },
  selectedDot: {
    color: '#333',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  roomContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detailsText: {
    marginBottom: 5,
    color: '#666',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 16,
    color: '#333',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007FFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#112678',
    borderRadius: 15,
    width: '40%',
    alignItems: 'center',
    paddingVertical: 10,
    height: '99%',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#DCE2FC',
    marginBottom: 20,
  },
  anotherRoomText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    margin:17
  },
  relatedRoomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  relatedRoomCard: {
    width: '40%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    margin:18
  },
  relatedRoomImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  relatedRoomDetails: {
    padding: 10,
  },
  relatedRoomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  relatedRoomInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#DCE2FC',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginTop:10
  },
  modalButton: {
    borderRadius: 15,
    padding: 10,
    width: '50%',
    alignItems: 'center',
    borderColor:'black',
    borderWidth:1
    
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#112678',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '45%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor:'#112678'
  },
  });