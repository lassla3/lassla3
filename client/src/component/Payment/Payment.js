import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, Text, View, Button, TouchableOpacity } from 'react-native';
import { useConfirmPayment, StripeProvider } from '@stripe/stripe-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from './Color';
import {AP_ADRESS} from "../../apAdress"
import {reservation }from '../../reduce/reservation'
import { useDispatch } from 'react-redux';
export default function Card({route,navigation}) {
  const API_URL = "http://192.168.11.186:3000/api/pay/pay";

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const { confirmPayment, loading } = useConfirmPayment();
console.log('hello',route?.params?.route?.params);
const body={
  roomId:route?.params.data?.body.roomId,
  userId:route?.params.data?.body.userId,
  dates:route?.params.data?.body.dates
}
  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodType: 'card',
        currency: 'usd',
      }),
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };
const dispatch=useDispatch()
  const handlePayPress = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();

    const billingDetails = { name };

    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails,
      paymentMethod: {
        card: {
          number: cardNumber,
          expMonth: parseInt(expiryDate.split('/')[0], 10),
          expYear: parseInt(expiryDate.split('/')[1], 10),
          cvc: cvv,
        },
      },
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      console.log('Payment confirmation error', error.message);
    } else if (paymentIntent) {
      Alert.alert(
        'Success',
        `The payment was confirmed successfully! currency: ${paymentIntent.currency}`
      );
      console.log('Success from promise', paymentIntent);
      
    }
    
  };
  const handleGet=(r)=>{
    dispatch(reservation(r))
  }

  return (
    <StripeProvider publishableKey="pk_live_51PGMZUIxZAKhTyZwpce6rNZyzBWyqMkq3VTcwmF5sKs829nJaD8KawGguJdyMKg4buw2pAnv4bOtEdkv6VrcUa5900DWtLQ7hp">
      <ScrollView style={styles.container}>
        {/* <Text>Try a test card:</Text>
        <Text>4242424242424242 (Visa)</Text>
        <Text>5555555555554444 (Mastercard)</Text>
        <Text>4000002500003155 (Requires 3DSecure)</Text>
        <Text>Use any future expiration, any 3 digit CVC, and any postal code.</Text> */}
        <TextInput
          autoCapitalize="none"
          placeholder="Name"
          keyboardType="name-phone-pad"
          onChangeText={setName}
          style={styles.input}
        />
        <View style={styles.cardInputContainer}>
          <View style={styles.cardInputSection}>
            <Icon name="credit-card" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="Card Number"
              keyboardType="number-pad"
              onChangeText={setCardNumber}
              style={styles.cardInput}
            />
          </View>
          <View style={styles.cardInputSection}>
            <Icon name="calendar" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="MM/YY"
              keyboardType="number-pad"
              onChangeText={setExpiryDate}
              style={styles.cardInput}
            />
          </View>
          <View style={styles.cardInputSection}>
            <Icon name="lock" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="CVV"
              keyboardType="number-pad"
              secureTextEntry
              onChangeText={setCvv}
              style={styles.cardInput}
            />
          </View>
        </View>
        <TouchableOpacity onPress={()=>{handlePayPress(),handleGet(body),navigation.navigate('CodeQR',{data:route?.params?.route?.params})}} disabled={loading}  style={styles.TouchableOpacity}>
              <Text style={styles.Text} > Pay </Text>
        </TouchableOpacity>
      </ScrollView>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  cardInputContainer: {
    marginVertical: 20,
  },
  cardInputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.slate,
    borderBottomWidth: 1.5,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  cardInput: {
    flex: 1,
    height: 44,
  },
  input: {
    height: 44,
    borderBottomColor: colors.slate,
    borderBottomWidth: 1.5,
    marginBottom: 20,
  },
  TouchableOpacity:{
    backgroundColor: "#112678",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    color: '#fff',
    fontSize: 20,
  },
  Text:{
    marginLeft: 120,
    color: '#FFFFFF',
    fontSize: 20,
  }
});
