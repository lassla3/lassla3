import React from 'react'
import { Button } from 'react-native-paper'
import { View, Text, StyleSheet,  } from 'react-native';

export default function Confirmation({route,navigation}) {
console.log('hhhhhhh',route.params.data);
  return (
    <View style={styles.container}>
    <View style={styles.card}>
      <View style={styles.section}>
        <Text style={styles.label}>Hotel Name:</Text>
        <Text style={styles.value}>{route?.params?.data?.body?.hotelName}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Number of rooms:</Text>
        <Text style={styles.value}>{route?.params?.data?.body?.numRoom}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>{route?.params?.data?.body?.newPrice} DT</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Date:</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.value}>Start:</Text>
          <Text style={styles.value}>{route?.params?.data?.body?.dates[0]}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.value}>End:</Text>
          <Text style={styles.value}>{route?.params?.data?.body?.dates[route?.params?.data?.body?.dates.length-1]}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>User Name:</Text>
        <Text style={styles.value}>{route?.params?.data?.user?.firstName} {route?.params?.data?.user?.lastName}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Total Price:</Text>
        <Text style={styles.value}>{route?.params?.data?.body?.newPrice*route?.params?.data?.body?.dates.length*route?.params?.data?.body?.numRoom} DT</Text>
      </View>
      <View style={styles.buttonContainer}>
      <Button mode="contained" buttonColor='#112678' onPress={() => navigation.navigate('Payment',{route}) }>
            Confirmation
          </Button>
      </View>
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 20,
      width: '95%',
      height:'85%'
    },
    section: {
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333',
    },
    value: {
      fontSize: 16,
      color: '#555',
    },
    dateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    buttonContainer: {
      marginTop: 99,
      alignItems: 'center',
      borderRadius:10,
    //   backgroundColor:'#112678'
    },
  });