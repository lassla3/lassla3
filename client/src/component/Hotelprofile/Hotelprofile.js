import React, { useRef, useState, useEffect, useMemo } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title, Caption, Divider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, Dimensions, TouchableOpacity,TextInput, Button,Switch } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {createRoomsForHotel}from '../../reduce/Rooms';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {cloud_name,preset} from "../../apAdress"
import { Picker } from '@react-native-picker/picker';
import Reviews from './Reviews'
const OverviewScreen = ({navigation}) => {
  
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);
    const dispatch = useDispatch();
    const [roomData, setRoomData] = useState({
      hotelId:1, 
      numRooms:7,
      roomTemplate: {
          price:180,
          view:'seaView',
          capacity:2,
          reduction:false,
          rate:5,
          option: {
              Meal_Plan: 'all_Inclusive'
          },
          media: [] 
      }
  });
  const handleOptionChange = (newMealPlan) => {
    setRoomData({
        ...roomData,
        roomTemplate: {
            ...roomData.roomTemplate,
            option: {
                ...roomData.roomTemplate.option,
                Meal_Plan: newMealPlan
            }
        }
    });
};
  const imageHandler = async (imageAsset) => {
    const form = new FormData();
    form.append("file", {
      uri: imageAsset.uri,
      type: imageAsset.type,
      name: imageAsset.fileName || 'photo.jpg'
    });
    form.append("upload_preset", preset);
    form.append("cloud_name", cloud_name);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: form
    });
    const data = await res.json();
    return data.secure_url;
  };

  const pickImage = () => {
    const options = {
      selectionLimit: 0,  
      mediaType: 'photo'
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        try {
          const uploadPromises = response.assets.map(imageAsset => imageHandler(imageAsset));
          console.log(uploadPromises,'uploadPromises');
          const imageUris = await Promise.all(uploadPromises);
          setRoomData(prevData => ({
              ...prevData,
              roomTemplate: {
                  ...prevData.roomTemplate,
                  media: [...prevData.roomTemplate.media, ...imageUris]
              }
          }));
        } catch (error) {
          console.log('Error uploading images:', error);
        }
      }
    });
};


const handleReductionChange = (newValue) => {
  setRoomData(prevData => ({
      ...prevData,
      roomTemplate: {
          ...prevData.roomTemplate,
          reduction: newValue
      }
  }));
};
  
  const handleSubmit = () => {
    dispatch(createRoomsForHotel(roomData));
};

const ImageIcon = <Icon size={25} name='add-a-photo' />;

    const BottomSheetContent = () => (
      <View style={styles.bottomSheetContent}>
         <View style={{flexDirection:'column', gap: 15 }}>
                <View />
               </View>
        <Text style={styles.bottomSheetTitle}>Add More Rooms</Text>
        <TextInput 
                style={styles.input} 
                placeholder="Number of Rooms" 
                keyboardType="numeric"
                onChangeText={(text) => setRoomData({ ...roomData, numRooms: parseInt(text, 10) })}
            />
        <TextInput 
                style={styles.input} 
                placeholder="Capacity" 
                keyboardType="numeric" 
                onChangeText={(text) => setRoomData({ ...roomData, roomTemplate: { ...roomData.roomTemplate, capacity: parseInt(text, 10) } })}
             />
        <TextInput 
                style={styles.input} 
                placeholder="Price" 
                keyboardType="numeric"  
                onChangeText={(text) => setRoomData({ ...roomData, roomTemplate: { ...roomData.roomTemplate, price: parseInt(text, 10) } })}
             />
      

      <TextInput style={styles.input} placeholder="Rate" keyboardType="numeric"  onChangeText={(text) => setRoomData({ ...roomData, roomTemplate: { ...roomData.roomTemplate, rate: parseInt(text, 10) } })} />
      <View style={styles.row}>
        <Text style={styles.label}>Meal Plan:</Text>
        <Picker
          selectedValue={roomData.roomTemplate.option.Meal_Plan}
          style={styles.picker}
          onValueChange={handleOptionChange}
        >
          <Picker.Item label="Please select the Meal Plan" value="" />
          <Picker.Item label="break Fast" value="breakFast" />
          <Picker.Item label="all Inclusive" value="all_Inclusive" />
          <Picker.Item label="Half Board" value="halfBoard" />
        </Picker>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>View:</Text>
        <Picker
          selectedValue={roomData.roomTemplate.view}
          style={styles.picker}
          onValueChange={(text) => setRoomData({ ...roomData, roomTemplate: { ...roomData.roomTemplate, view: text } })}
        >
          <Picker.Item label="Please select the View" value="" />
          <Picker.Item label="sea view" value="seaView" />
          <Picker.Item label="stander view" value="standerView" />
        </Picker>
      </View>
      <View style={styles.switchContainer}>

      <Text style={styles.switchLabel}>Reduction:</Text>
       <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={roomData.roomTemplate.reduction ? "#000000" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleReductionChange}
        value={roomData.roomTemplate.reduction}
        />
        </View>
      <View style={{flexDirection:'column', gap: 10 }}>
                <View />
                <View />
               </View>
              <Text onPress={pickImage} style={{color:"black",marginTop:-10}}>Select your {ImageIcon}</Text>
            
              <View style={{flexDirection:'column', gap: 10 }}>
                <View />
                <View />
               </View>
        <Button title="Submit" color='#112678' onPress={()=>{handleSubmit(),navigation.navigate('TabNavigator')}} />
      
      </View>
    );
  
    return (
      <View style={styles.overviewWrapper}>
        <ScrollView contentContainerStyle={styles.overviewContainer}>
          <Text style={styles.overviewTitle}>About Grand Hotel</Text>
          <Text style={styles.overviewText}>
            Welcome to the Grand Hotel, a luxurious retreat located in the heart of the city. With elegant suites, exceptional dining, and stunning views, we offer an unforgettable experience for both leisure and business travelers.
          </Text>
          <Divider style={styles.overviewDivider} />
  
          <Text style={styles.overviewTitle}>Key Amenities</Text>
          <View style={styles.amenitiesContainer}>
            <View style={styles.amenityItem}>
              <MaterialCommunityIcons name="wifi" size={30} color="#112678" />
              <Text style={styles.amenityLabel}>Free WiFi</Text>
            </View>
            <View style={styles.amenityItem}>
              <MaterialCommunityIcons name="pool" size={30} color="#112678" />
              <Text style={styles.amenityLabel}>Swimming Pool</Text>
            </View>
            <View style={styles.amenityItem}>
              <MaterialCommunityIcons name="bed-king-outline" size={30} color="#112678" />
              <Text style={styles.amenityLabel}>Luxury Suites</Text>
            </View>
            <View style={styles.amenityItem}>
              <MaterialCommunityIcons name="car" size={30} color="#112678"/>
              <Text style={styles.amenityLabel}>Free Parking</Text>
            </View>
          </View>
          <Divider style={styles.overviewDivider} />
  
          <Text style={styles.overviewTitle}>Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image
              source={{ uri: 'https://images.lifestyleasia.com/wp-content/uploads/sites/2/2021/03/08103440/best-suites-hk-grand-hyatt-3-1024x767.png' }}
              style={styles.galleryImage}
            />
            <Image
              source={{ uri: 'https://thumbs.dreamstime.com/b/luxury-hotel-4480742.jpg' }}
              style={styles.galleryImage}
            />
            <Image
              source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/146/867/628/luxury-hotel-wallpaper-preview.jpg' }}
              style={styles.galleryImage}
            />
          </ScrollView>
          <Divider style={styles.overviewDivider} />
         
        </ScrollView>
        <View style={{flexDirection:'column', gap: 10 }}>
         <View />
         <View />
         <View />
         <View />
         <View />
         <View />
         <View />
         <View />
         <View />
         <View />
         <View />
         <View />
         <View />
         <View />
         <View />
         <View />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
        >
          {BottomSheetContent()}
        </BottomSheet>
      </View>
    );
  };

const DetailsScreen = () => (
  <ScrollView style={styles.detailsContainer}>
    <Text style={styles.detailsTitle}>Hotel Details</Text>
    <Text style={styles.detailsHeading}>Check-In/Check-Out</Text>
    <Text style={styles.detailsText}>Check-In: 7:00 AM</Text>
    <Text style={styles.detailsText}>Check-Out: 12:00 PM</Text>
    <Divider style={styles.detailsDivider} />

    <Text style={styles.detailsHeading}>Address</Text>
    <Text style={styles.detailsText}>123 Main Street, City, Country</Text>
    <Divider style={styles.detailsDivider} />

    <Text style={styles.detailsHeading}>Contact Information</Text>
    <Text style={styles.detailsText}>Phone: +123 456 7890</Text>
    <Text style={styles.detailsText}>Email: info@grandhotel.com</Text>
    <Divider style={styles.detailsDivider} />

    <Text style={styles.detailsHeading}>Policies</Text>
    <Text style={styles.detailsText}>- No smoking inside the rooms.</Text>
    <Text style={styles.detailsText}>- Pets allowed with prior notice.</Text>
    <Text style={styles.detailsText}>- Free cancellation up to 24 hours before arrival.</Text>
    <Divider style={styles.detailsDivider} />

    <Text style={styles.detailsHeading}>Room Information</Text>
    <Text style={styles.detailsText}>- Standard Room: 1 King Bed, City View</Text>
    <Text style={styles.detailsText}>- Deluxe Room: 2 Queen Beds, Ocean View</Text>
    <Text style={styles.detailsText}>- Suite: 1 King Bed, Balcony, Ocean View</Text>
    <Divider style={styles.detailsDivider} />

    <Text style={styles.detailsHeading}>Dining Options</Text>
    <Text style={styles.detailsText}>- The Grand Restaurant: Fine Dining</Text>
    <Text style={styles.detailsText}>- Ocean Breeze Café: Casual Breakfast & Lunch</Text>
    <Text style={styles.detailsText}>- Poolside Bar: Cocktails & Snacks</Text>
    <Divider style={styles.detailsDivider} />
  </ScrollView>
);

const ReviewsScreen = ({route}) => (
    <Reviews route={route}/>
 
);

const HotelProfile = ({route,navigation}) => {
  const carouselImages = [
    { url: 'https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg' },
    { url: 'https://www.bulgarihotels.com/.imaging/bhr-wide-small-jpg/dam/pre-home/collection_2.png/jcr%3Acontent' },
    { url: 'https://images.lifestyleasia.com/wp-content/uploads/sites/2/2021/03/08103440/best-suites-hk-grand-hyatt-3-1024x767.png' },
    { url: 'https://thumbs.dreamstime.com/b/luxury-hotel-4480742.jpg' },
    { url: 'https://c4.wallpaperflare.com/wallpaper/146/867/628/luxury-hotel-wallpaper-preview.jpg' },
  ];

  const hotelLocation = "sousse kantaoui";
  const hotelName =route.params.name;
  const hotelRating = 5;

  const scrollRef = useRef();
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('overview');

  const setIndexCarousel = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimension(window);
    };
   const x= Dimensions.addEventListener('change', onChange);
    return () => {
     x.remove
    };
  }, []);

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const iconName = i <= rating ? "star" : i - rating < 1 ? "star-half-full" : "star-outline";
      stars.push(
        <MaterialCommunityIcons
          key={i}
          name={iconName}
          size={20}
          color="#FFD700"
          style={styles.starIcon}
        />
      );
    }
    return stars;
  };

  const renderSelectedTab = () => {
    switch (selectedTab) {
      case 'overview':
        return <OverviewScreen navigation={navigation}/>;
      case 'details':
        return <DetailsScreen />;
      case 'reviews':
        return <ReviewsScreen route={route}/>;
      default:
        return <OverviewScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <ScrollView
          horizontal
          ref={scrollRef}
          onMomentumScrollEnd={setIndexCarousel}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        >
          {carouselImages.map((value, key) => (
            <Image
              key={key}
              source={{ uri: `${value.url}` }}
              style={{ width: dimension?.width, height: 250, resizeMode: 'cover' }}
              PlaceholderContent={<ActivityIndicator />}
            />
          ))}
        </ScrollView>
        <View style={styles.dotContainer}>
          {carouselImages.map((val, key) => (
            <Text
              key={key}
              style={key === selectedIndex ? styles.activeDot : styles.inactiveDot}
            >
            </Text>
          ))}
        </View>
        <Divider style={styles.divider} />
        <View style={styles.infoLine}>
          <MaterialCommunityIcons name="bed-outline" size={24} color="#333" />
          <Title style={styles.titleText}>{hotelName}</Title>
          <View style={styles.ratingContainer}>
            {renderStars(hotelRating)}
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.infoLine}>
          <MaterialCommunityIcons name="map-marker-outline" size={24} color="#333" />
          <Caption style={styles.captionText}>{hotelLocation}</Caption>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.tabBar}>
          {['overview', 'details', 'reviews'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={styles.tabItem}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabLabel,
                  selectedTab === tab && styles.selectedTabLabel
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
              {selectedTab === tab && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
        <Divider style={styles.divider} />
        {renderSelectedTab()}
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  activeDot: {
    color: 'white',
  },
  inactiveDot: {
    color: '#888',
  },
  infoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  titleText: {
    fontSize: 20,
    color: '#333',
  },
  captionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  divider: {
    marginHorizontal: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 3,
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 16,
    color: '#666',
  },
  selectedTabLabel: {
   color: "#112678",
    fontWeight: 'bold',
  },
  tabIndicator: {
    width: '100%',
    height: 3,
    backgroundColor: '#112678',
    marginTop: 2,
  },
  overviewWrapper: {
    flex: 1,
  },
  overviewContainer: {
    padding: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  overviewText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
    lineHeight: 20,
  },
  overviewDivider: {
    marginVertical: 16,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amenityItem: {
    alignItems: 'center',
  },
  amenityLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  galleryImage: {
    width: 250,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'cover',
  },
  bottomSheet: {
    paddingHorizontal: 10,
  },
  bottomSheetContent: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
  },
  bottomSheetTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom:14,
  },
  switchContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
    marginTop: 10, 
},
switchLabel: {
    marginRight: 10, 
},
imageContainer: {
  flexDirection: 'row',
  marginTop: 10,
  marginBottom: 10,
},
imagePreview: {
  width: 100,
  height: 100,
  marginRight: 10,
},
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  detailsHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    color: '#555',
  },
  detailsText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  detailsDivider: {
    marginVertical: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  picker: {
    flex: 2,
  },
});

export default HotelProfile;