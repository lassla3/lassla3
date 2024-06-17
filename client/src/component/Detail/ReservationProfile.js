import React,{useState,useEffect,useRef,createContext} from 'react'
import { View, Text, StyleSheet, Linking ,ScrollView,Image,Dimensions,TouchableOpacity,TextInput,Animated } from 'react-native';
import { ActivityIndicator,Modal,Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width } = Dimensions.get('window');

export default function ReservationProfile({navigation}) {
    const [dimension, setDimension] = useState(Dimensions.get('window'));
    const [selectedIndex, setSelectedIndex] = useState(0);
    const scrollRef = useRef();
    const onChange = ({ window }) => {
        setDimension(window);
      };
    useEffect(() => {
        const subscription= Dimensions.addEventListener('change', onChange)
         return () => {
           subscription.remove();
         };
       }, []);
       const x=2
       const y=2
       useEffect(() => {
           const interval = setInterval(() => {
             setSelectedIndex(prevSelectedIndex =>
               prevSelectedIndex === carouselImages.length - 1 ? 0 : prevSelectedIndex + 1
             );
             scrollRef.current.scrollTo({
               animated: true,
               y: 0,
               x: dimension.width * selectedIndex,
             });
           }, 3000);
           return () => clearInterval(interval);
         }, [dimension.width, selectedIndex]);
   
         const carouselImages = [
             { url: 'https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg' },
             { url: 'https://hips.hearstapps.com/hmg-prod/images/grand-hotel-tremezzo-6479210d9dae0.jpeg' },
           { url: 'https://media.istockphoto.com/id/1084656062/photo/interior-of-a-hotel-bathroom.jpg?s=612x612&w=0&k=20&c=rZxxHZ_QxV4SZtNwi1izI1jKLckdS9Uz0LZc_M41_OE=' },
           { url: 'https://www.santoriniview-hotel.gr/media/idijrdoe/santorini-view-hotel-junior-suite-panoramic-caldera-view-10.jpg?rxy=0.612,0.551051051051051&width=800&height=550&rnd=133330453672900000&quality=70' },
           { url: 'https://hamiltonisland.imgix.net/hamiltonisland/media/originals/accommodation/reef-view-hotel/rvh-pool-(1).jpg?width=480&height=600&fit=crop&d=20221101093418'},
         ];
   
         const setIndex = event => {
       let viewSize = event.nativeEvent.layoutMeasurement.width;
       let contentOffset = event.nativeEvent.contentOffset.x;
       let carouselIndex = Math.floor(contentOffset / viewSize);
       setSelectedIndex(carouselIndex);
   };
  return (
    <View style={styles.carouselContainer}>
          <Icon
            name='arrow-back'
            size={30}
            style={styles.backIcon}
            onPress={() => navigation.navigate('AllHotels')}
          />
          <ScrollView
            horizontal
            ref={scrollRef}
            onMomentumScrollEnd={setIndex}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          >
            {carouselImages.map((value, key) => (
              <Image
                key={key}
                source={{ uri: value.url }}
                style={[styles.carouselImage, { width: width }]}
                PlaceholderContent={<ActivityIndicator />}
              />
            ))}
          </ScrollView>

          <View style={styles.pagination}>
            {carouselImages.map((val, key) => (
              <Text
                key={key}
                style={[
                  styles.paginationDot,
                  key === selectedIndex ? styles.selectedDot : styles.normalDot,
                ]}
              >
                ⬤
              </Text>
            ))}
          </View>
        </View>
  )
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
      backgroundColor: '#007FFF',
      borderRadius: 15,
      width: '40%',
      alignItems: 'center',
      paddingVertical: 10,
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
    },
    relatedRoomsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    relatedRoomCard: {
      width: '48%',
      backgroundColor: '#fff',
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      margin:2
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
    });