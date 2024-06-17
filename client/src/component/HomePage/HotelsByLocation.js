import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Image ,FlatList ,TextInput,TouchableOpacity,SafeAreaView,ImageBackground ,Modal} from 'react-native';
// Import the necessary libraries

const HotelsByLocation = ({hotels}) => {
   



    return (
        <View style={styles.hotelContainer}>
            <FlatList
                data={hotels}
                // keyExtractor={(item) => item.id.toString()}
                renderItem={({ item: hotel }) => (
                    <View style={styles.hotelContainer}>
                        {/* <Image source={hotel.imgUrl} style={styles.hotelImage} /> */}
                        <Text style={styles.hotelName}>{hotel.name}</Text>
                        <Text style={styles.hotelLocation}>{hotel.location}</Text>
                        <Text style={styles.hotelPrice}>{hotel.price}</Text>
                        <Text style={styles.hotelRating}>{hotel.rating}</Text>
                    </View>
                )}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    hotelContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hotelContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        alignItems: 'center',
    },
    hotelImage: {
        width: 200,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    hotelName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    hotelLocation: {
        fontSize: 14,
        color: '#888',
    },
    hotelPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    hotelRating: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
});

export default HotelsByLocation;