

import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../const/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o';

Geocoder.init(GOOGLE_MAPS_API_KEY);

export default function Map({ onLocationSelect }) {
  const handleButtonClick =()=>{
    NavigationPreloadManager.navigate("")
  }
  const [region, setRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hotels, setHotels] = useState([]);
  const [renderAll, setRenderAll] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(newRegion);
        if (onLocationSelect) {
          onLocationSelect({ latitude, longitude });
        }
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, [onLocationSelect]);

  const handleSearch = async () => {
    try {
      const response = await Geocoder.from(searchQuery);
      const { lat, lng } = response.results[0].geometry.location;

      const newRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(newRegion);
      if (onLocationSelect) {
        onLocationSelect({ latitude: lat, longitude: lng });
      }

      await searchHotels(lat, lng);
    } catch (error) {
      console.error('Error searching city coordinates:', error);
    }
  };

  const searchHotels = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hotel&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      const hotelsData = data.results.map((result) => ({
        name: result.name,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        photoReference: result.photos ? result.photos[0].photo_reference : null,
      }));
      setHotels(hotelsData);
    } catch (error) {
      console.error('Error searching hotels:', error);
    }
  };

  const renderHotels = () => (renderAll ? hotels : hotels.slice(0, 5));

  return (
    <View style={styles.container}>
    
      <View style={styles.searchInputContainer}>
           
          <TextInput
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          placeholder="Search city..."
            style={{ fontSize: 20, paddingLeft: 10 ,  color: '#7c807d'}}
          />
          <Icon name="search" size={30} style={{ marginLeft: 220 , color: '#161618' }}  onPress={handleSearch}/> 
        </View>
      {region ? (
        <MapView style={styles.map} initialRegion={region} region={region}>
        {/* <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />  */}
          {/* {renderHotels().map((hotel, index) => ( 
             <Marker
              key={index}
              coordinate={{ latitude: hotel.latitude, longitude: hotel.longitude }}
              title={hotel.name}
              pinColor="blue"
            />
          )
          )} */}
        </MapView>
      ) : (
        <MapView style={styles.map} />
      )}
      {hotels.length > 0 && (
        <ScrollView style={styles.hotelsContainer}>
          <TouchableOpacity onPress={() => setRenderAll(!renderAll)} style={styles.showAllButton}>
            <Text style={styles.showAllButtonText}>{renderAll ? 'Show Less' : 'Show All'}</Text>
          </TouchableOpacity>
          {renderHotels().map((hotel, index) => (
            <View key={index} style={styles.hotelItem}>
              <View style={styles.hotelInfo}>
                {hotel.photoReference && (
                  <Image
                    source={{
                      uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photoReference}&key=${GOOGLE_MAPS_API_KEY}`,
                    }}
                    style={renderAll ? styles.enlargedHotelImage : styles.hotelImage}
                  />
                )}
              </View>
              <Text style={[styles.hotelName, renderAll && styles.enlargedHotelName]}>{hotel.name}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#112678',
    Button:"#112678"
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#112678',
    borderRadius: 4,
    fontSize: 16,
  },
  hotelsContainer: {
    flex: 1,
    padding: 10,
  },
  hotelItem: {
    marginBottom: 10,
  },
  showAllButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#112678',
    marginLeft: 310,
  },
  searchInputContainer: {
    height: 50,
    width: 400,
    backgroundColor:"#DCE2FC",
    marginTop:15,
    marginLeft: 5,
   
   marginBottom:20,
  
justifyContent: 'center',
    borderRadius: 30,
   
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hotelImage: {
    width: 400,
    height: 200,
    borderRadius: 5,
  },
  enlargedHotelImage: {
    width: 400,
    height: 200,
    borderRadius: 5,
  },
  enlargedHotelName: {
    textAlign: 'center',
  },
});
