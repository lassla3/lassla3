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
  Modal
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector} from 'react-redux';
import { AllHotell } from '../../reduce/Hotels';

const AdvancedFilter = () => {



  const dispatch=useDispatch()
  const hotel = useSelector(state => state.hotelSlice.hotels);
  const loading = useSelector(state => state.allHotels.loading);
  const error = useSelector(state => state.allHotels.error);

  useEffect(()=>{
    dispatch(AllHotell())
    },[])
;
  const [rating, setRating] = useState(null);
  const [priceRange, setPriceRange] = useState([50, 5000]);
  const [location, setLocation] = useState(null);
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [modalVisible, setModalVisible] = useState(false);

  const applyFilter = () => {
    let filtered = hotel;
  
    if (filtered !== null) {
      filtered = filtered.filter((hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]);
    }
  
    setFilteredHotels(filtered);
    setModalVisible(true);
  };

  const handleReset = () => {
    setRating(null);
    setPriceRange([50, 5000]);
    setLocation(null);
    setFilteredHotels(hotel);
  };

  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating === rating ? null : selectedRating);
  };

  const handleLocationSelect = (coords) => {
    setLocation(coords);
  };

  const renderStars = (numStars) => {
    let stars = [];
    for (let i = 1; i <= numStars; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleRatingSelect(i)}
          style={{ marginRight: 5 }}
        >
          <Icon
            name={rating && rating >= i ? 'star' : 'star-border'}
            size={24}
            color={rating && rating >= i ? 'orange' : 'gray'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterItem}>
        <Text style={styles.title}>
          <Icon name="star" size={24} color="black" />
          {'  '}
          Rating
        </Text>
        <View style={styles.ratingContainer}>{renderStars(5)}</View>
      </View>

      <View style={styles.filterItem}>
        <Text style={styles.title}>
          <Icon name="attach-money" size={24} color="black" />
          {'  '}
          Price Range
        </Text>
        <View style={styles.priceRangeContainer}>
          <Text style={styles.priceLabel}>${priceRange[0]}</Text>
          <MultiSlider
            values={priceRange}
            sliderLength={200}
            onValuesChange={(values) => setPriceRange(values)}
            min={50}
            max={5000}
            step={50}
            selectedStyle={{
              backgroundColor: 'blue',
            }}
            unselectedStyle={{
              backgroundColor: 'silver',
            }}
          />
          <Text style={styles.priceLabel}>${priceRange[1]}</Text>
        </View>
      </View>

      <View style={styles.filterItem}>
        <Text style={styles.title}>
          <Icon name="location-on" size={24} color="black" />
          {'  '}
          Location
        </Text>
        <MapView
          style={styles.map}
          onPress={(e) => handleLocationSelect(e.nativeEvent.coordinate)}
        >
          {location && <Marker coordinate={location} />}
        </MapView>
      </View>

      <TouchableOpacity onPress={applyFilter} style={styles.applyButton}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <Text style={styles.resetText}>Reset Filters</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
        <FlatList
  data={filteredHotels}
  renderItem={({ item }) => (
    <View style={styles.hotelItem}>
<Image source={item.image} style={styles.hotelImage} />
      <View style={styles.hotelDetails}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <Text style={styles.hotelLocation}>Location: {item.location}</Text>
        <Text style={styles.hotelPrice}>Price: ${item.price}</Text>
      </View>
    </View>
  )}
  keyExtractor={(item) => item.id}
/>

        <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  applyButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  applyText: {
    color: '#fff',
    fontSize: 16,
  },
  resetButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  resetText: {
    color: 'blue',
    fontSize: 16,
  },
  filterItem: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: 'black',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  map: {
    height: 200,
    marginTop: 8,
  },
  hotelItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  
  
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  hotelImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  hotelDetails: {
    padding: 16,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  hotelLocation: {
    fontSize: 16,
    marginBottom: 8,
  },
  hotelPrice: {
    fontSize: 16,
    color: 'green',
  },
  
});

export default AdvancedFilter;
