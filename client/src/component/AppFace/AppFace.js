import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const AppFace = ({ navigation }) => {
  const handleButton = () => {
    
    navigation.navigate('Home');
  };


  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View>
      <ImageBackground
        source={require('../../Photo/pexels-tobiasbjorkli-2690807.jpg')}
        style={styles.image}
      >
        <View style={styles.content}>
          {/* <TouchableOpacity style={styles.buttonlogin} onPress={handleButton}>
            <Text style ={styles.textbutton}>Get Started</Text>
          </TouchableOpacity> */}
          <Text style ={styles.text} >If you have an Account?</Text>
          <TouchableOpacity  onPress={handleLogin} style={styles.buttonlogin}   >
            <Text style ={styles.textbutton} > Login</Text>
          </TouchableOpacity>
          <Text style ={styles.text}  >If you don't have an Account?</Text>
          <TouchableOpacity style={styles.buttonlogin}  onPress={handleSignup}>
            <Text style ={styles.textbutton}  > Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  content: {
    marginTop: 500,
  },

  buttonlogin: {
    backgroundColor: 'black',
    borderRadius: 20,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10,
    height:36.5,
    width:200,
    marginLeft:20
  },
  textbutton: {
    color: '#DCE2FC',
    fontFamily: 'BoldItalic',
    justifyContent: 'center',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 3,

  },
  text: {
    color: 'white',
    fontFamily: 'BoldItalic',
    justifyContent: 'center',
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 3,
  },
  buttonContainer: {
    marginTop: 2,
    backgroundColor: '#112678',

  },
});

export default AppFace;