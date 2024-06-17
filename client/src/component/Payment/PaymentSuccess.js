import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from './Color';

export default function PaymentSuccess({ navigation }) {
  return (
    <View style={styles.container}>
      <Icon name="check-circle" size={100} color="green" />
      <Text style={styles.successText}>Payment Successfully Paid</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Card')} style={styles.button}>
        <Icon name="home" size={20} color="#fff" />
        <Text style={styles.buttonText}> Go Back to Home </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  successText: {
    fontSize: 24,
    color: 'green',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#112678",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 10,
  },
});
