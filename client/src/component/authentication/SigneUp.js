import React, { useState } from 'react';
import { 
    SafeAreaView,
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    PermissionsAndroid
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {signUpAsync} from '../../reduce/authentication/signUpReducer'


const SignUp = ({navigation}) => {
  const arrowleft=<Icon name="arrow-back" size={40} color={"#112678"}/>
  const [view, setView] = useState('firstView');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUp, setSignUp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: "",
    phoneNumber: "",
    longitude: 0,
    latitude:0,
    imgUrl:"https://res.cloudinary.com/dockwpvkl/image/upload/v1714576558/default-avatar-icon-of-social-media-user-vector_jy16if.jpg"
  });

  
  

  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'location Permission',
          message:
            'This application needs access to your location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation()
        console.log('Location used');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getCurrentLocation=()=>{
    Geolocation.getCurrentPosition(
      position=>{
      const {latitude,longitude}=position.coords;
      setSignUp((prevState) => ({
        ...prevState,
        longitude:longitude,
        latitude:latitude
      }))
      console.log(latitude,longitude);
      },
      error=>alert("Error",error.message),
      {enableHighAccuracy: true,
      timeout:15000,
      maximumAge:10000
      }
    )
    
  }

  
  
//   const imageUpload = async (obj) => {
//   try {
//     const form = new FormData();
//     form.append("file", {
//       uri: obj.assets[0].uri,
//       name: "photo",
//       type: obj.assets[0].type,
//     });
//     form.append("upload_preset", process.env.preset);

//     const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.cloud_name}/image/upload`, {
//       method: "POST",
//       body: form
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to upload image. Status: ${response.message}`);
//     }

//     const responseData = await response.json();
//     const imageUrl = responseData.secure_url;
//     console.log("Image uploaded successfully:", imageUrl);

//     setSignUp({
//       imgUrl: imageUrl
//     });
//   } catch (error) {
//     console.error("Error uploading image:", error.message);
//   }
// };

  
  

  // const selectImage = () => {
  //   launchImageLibrary({ mediaType: 'photo' },(response) => {
  //     if (response && !response.didCancel) {
  //       // console.log("response",response);
  //       imageUpload(response)
      
  //     }
  //   });
  // };
  

  const handleInputChange = (name, value) => {
    if (name === 'password') {
      setSignUp({ ...signUp, [name]: value });
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setSignUp({ ...signUp, [name]: value });
    }
  };
  
  // permission()
  

  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (signUp.password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    permission()
    // dispatch(signUpAsync(signUp));
    navigation.navigate("Login")
  };
  
// const user=useSelector((s) =>s.userSignUp.user)
// console.log(user);
  const switchView = (v) => {
    setView(v);
  };

  if (view === 'firstView') {
    return (
      
      
        <SafeAreaView style={styles.safeAreaView1}>

          <Text style={styles.login}>Sign up</Text>
          <View style={styles.loginContainer}>
          <View style={styles.login_inputsContainer}>
          <Text style={styles.login_label}></Text>
            <TextInput
              
              style={styles.input}
              placeholder='First name'
              onChangeText={(text) => handleInputChange('firstName', text)}
              value={signUp.firstName}
            />
            <Text style={styles.login_label}></Text>
            <TextInput
            
              style={styles.input}
              placeholder='Last name'
              onChangeText={(text) => handleInputChange('lastName', text)}
              value={signUp.lastName}
            />
            <Text style={styles.login_label}>Phone number</Text>
            <TextInput
            
              style={styles.input}
              placeholder='+216?'
              onChangeText={(text)=>handleInputChange('phoneNumber',text)}
              value={signUp.phoneNumber}
            />
            {/* <Text onPress={selectImage} style={styles.im/SageSelector}>upload 📷</Text> */}
            
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {{switchView("2ndView")}}}
          >
            <Text style={styles.loginText}>Next</Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
      
  );

  } else if (view === '2ndView') {
    return (
<>
        <Text style={styles.previousBtn} onPress={() => switchView('firstView')}>{arrowleft}</Text>
        <Text style={styles.login}>Sign up</Text>
        <SafeAreaView >
        <View style={styles.loginContainer}>
          <View style={styles.login_inputsContainer}>
          <Text style={styles.login_label}>Email</Text>
          <TextInput
          
              style={styles.input}
              placeholder='example@gmail.com'
              onChangeText={(text) => handleInputChange('email', text)}
              value={signUp.email}
            />
            <Text style={styles.login_label}>password</Text>
          <TextInput
          
            style={styles.input}
            secureTextEntry
            placeholder='Ex@mPl3'
            onChangeText={(text) => handleInputChange('password', text)}
            value={signUp.password}
          />
            <Text style={styles.login_label}>Confirm password</Text>
          <TextInput
          
            style={styles.input}
            secureTextEntry
            placeholder='Ex@mPl3'

            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            value={confirmPassword}
          />
          {signUp.password !== confirmPassword && (
    <Text style={styles.errorMessage}>Passwords do not match</Text>)}
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={()=>handleSignUp()}
          >
            <Text style={styles.loginText}>Sign up</Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
</>
      
      
    );
  }
};

const styles = StyleSheet.create({
  
  login_inputsContainer:{
    marginTop:"30%",
    borderStyle:"solid",

  },
  errorMessage:{
    color:"red",
    fontSize:17,
    marginLeft:10
  },
  previousBtn:{
   marginTop:5,
   color:"white"
  },
  login_label:{
    marginBottom:-10,
    marginTop:30,
    marginLeft:5,
    color:"black",
    fontSize:15,
    fontWeight:"bold"
  },
  loginContainer:{
    alignItems:"center",
    marginTop:-130
  },
  
  login:{
    fontSize:30,
    marginTop:50,
    textAlign:"center",
    color:"#112678",
    fontWeight:"bold"
  },
    input: {
      color:"black",
      fontWeight:"bold",
      borderColor: "#DCE2FC",
      borderStyle:"solid",
      height: 60,
      width: 380,
      fontSize: 20,
      borderWidth: 3,
      borderRadius: 20,
      marginTop: 20,
      paddingLeft: 20,
    },
    safeAreaView1:{
      marginTop:45
    },
    buttonContainer: {
      marginTop: 40,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      width: 380,
      borderRadius: 30,
      borderStyle:"solid",
      backgroundColor: '#112678'
    },
      
      loginText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:20
      }
})

export default SignUp;