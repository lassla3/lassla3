import React, { useState,useEffect } from 'react';
import { decode } from "base-64";
global.atob = decode;
import {cloud_name,preset} from "../../apAdress"
import {jwtDecode} from "jwt-decode";
import { TextInput, SafeAreaView, StyleSheet, View, Text, TouchableOpacity,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getOneAsync} from "../../reduce/getOne"
import {editeAsync} from "../../reduce/editeProfile"
import { useDispatch,useSelector } from 'react-redux'; 
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cancel from 'react-native-vector-icons/MaterialIcons'


const EditProfile = ({navigation}) => {
    const [view, setView] = useState("firstView");
    const [user,setUser]=useState({
      email:"",
      firstName:"",
      lastName:"",
      phoneNumber:"",
      imgUrl:"",
      password:"",
      oldPassword:"",
      confirmPassword:""
    })
    
    const [InputView,setInputView]=useState("noChange")
    const error = useSelector(state => state.userSignIn.error);
    const [passwordError, setPasswordError] = useState(null);
    console.log("err",error);
  const [confirmPassword, setConfirmPassword] = useState('');
    const arrowleft=<Icon name="arrow-back" size={40} color={"#112678"}/>
    const dispatch = useDispatch();
    const tokenGeted = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const decoded = jwtDecode(token);
        return decoded.id;
      } catch (error) {
        console.log(error);
      }
    }
    const isError = error || (error.oldPassword);

    
    const imageHandler = async (image) => {
      try {
        const form = new FormData();
        form.append("file", {
          uri: image.assets[0].uri,
          type: image.assets[0].type,
          name: 'photo.jpg'
        });
        form.append("upload_preset", preset);
        form.append("cloud_name", cloud_name);
    
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
          method: 'POST',
          body: form
        });
        const data = await res.json();
        return data.secure_url;
      } catch (error) {
        console.error("Error:", error.message); 
        console.error("Error Details:", error);   
        throw error;
      }
    };
    
    
    const pickImage = () => {
      launchImageLibrary({}, async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          try {
            const imageUri = await imageHandler(response);
            console.log("imageUri", imageUri);
            setUser({ ...user, imgUrl: imageUri });
          } catch (error) {
            console.log('Error uploading image:', error);
          }
        }
      });
    };
    
    
    
    
  
    useEffect(() => {
      const fetchUserId = async () => {
        const userId = await tokenGeted();
        console.log('userId',userId);
        dispatch(getOneAsync(userId))
          .then(data => {
            setUser(data.payload);
            
          })
          .catch(error => console.log("Error fetching user data:", error)); 
      };
    
      fetchUserId();
    }, []);
    const handleSave = async () => {
      if (user.password && confirmPassword && user.password !== confirmPassword) {
        console.log("Passwords do not match");
        setPasswordError("Passwords do not match");
        return;
      }
      try {
        const userId = await tokenGeted();
        console.log("user",user);
        dispatch(editeAsync({ id: userId, userData: user }));
        navigation.navigate('TabNavigator')
      } catch (error) {
        console.log(error);
      }
    };
    
    
    const changeInputView=(v)=>{
      setInputView(v)
    }
  
  

  const changeView = (v) => {
    setView(v);
  };

  const handleInputChange = (name, value) => {
    if (name === 'phoneNumber') {
      value = parseInt(value);
    }
    if (name === 'password') {
      setUser({ ...user, [name]: value });
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
    else{

      setUser({ ...user, [name]: value });
    }
    }

    if (user.password && confirmPassword && user.password === confirmPassword) {
      setPasswordError(null);
    }
  
    const ImageIcone=<Icon size={25} name='add-a-photo'/>

  if (view === "firstView") {
    return (
      <SafeAreaView>
        <View style={styles.editProfileContainer}>

        <Image
            source={{ uri: user.imgUrl}}
            style={{width:'38%',height:'24%',marginTop:50,borderRadius:100}}
          />
          <View style={styles.camera}>

          <Text onPress={()=>{pickImage()}} style={{color:"black"}}>{ImageIcone}</Text>
          </View>
          <View style={styles.inputsContainer}>
            <Text style={{color:'black',fontSize:18,marginLeft:5,marginBottom:10,fontWeight:"bold"}}>First name</Text>
            <TextInput
            value={user.firstName}
            onChangeText={(text)=>handleInputChange("firstName", text)}
            style={styles.editProfile_inputs}  />
          </View>
          <View style={styles.inputsContainer}>
            <Text style={{color:'black',fontSize:18,marginLeft:5,marginBottom:10,fontWeight:"bold"}}>Last name</Text>
            <TextInput
            value={user.lastName}
            onChangeText={(text)=>handleInputChange("lastName",text)}
            style={styles.editProfile_inputs}  />
          </View>
          <View style={styles.inputsContainer}>
            <Text style={{color:'black',fontSize:18,marginLeft:5,marginBottom:10,fontWeight:"bold"}}>Phone number</Text>
            <TextInput
            value={user.phoneNumber? (user.phoneNumber).toString() : ''}
            onChangeText={(text)=>handleInputChange("phoneNumber",text)}
            style={styles.editProfile_inputs}  />
          </View>

          
          <View style={styles.inputsContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => changeView("secondView")}>
              <Text style={styles.next}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (view === "secondView") {
    return (<>
      <Text style={styles.previousBtn} onPress={() => changeView('firstView')}>{arrowleft}</Text>
      <SafeAreaView style={{marginTop:50}}>
        <View style={styles.editProfileContainer}>
          <View style={styles.inputsContainer}>
            <Text style={{color:'black',fontSize:18,marginLeft:5,marginBottom:10,fontWeight:"bold"}}>Email</Text>
            <TextInput
            readOnly
            value={user.email}
            style={styles.editProfile_inputs}  />
          </View>
          <View style={styles.inputsContainer}>
            <View style={{justifyContent:"space-between"}}>
            <Text style={{color:'black',fontSize:18,marginLeft:5,marginBottom:10,fontWeight:"bold"}}>Old password </Text> 
            {passwordError && (
  <Text style={styles.errorMessage}>{passwordError}</Text>
)}
            </View>
            
            <TextInput
            secureTextEntry
            onChangeText={(text)=>handleInputChange("oldPassword",text)}
            style={styles.editProfile_inputs} placeholder='********' />
          </View>
          {InputView==="noChange" && 
          <TouchableOpacity onPress={()=>changeInputView("change")}>
            <Text style={{color:'black',fontSize:18,marginLeft:-183,marginTop:30,marginBottom:10,fontWeight:"bold"}}>Change password ?</Text>
          </TouchableOpacity>}
          {InputView==="change" && <View>
          <View style={styles.inputsContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
  <Text style={{color:'black',fontSize:18,marginLeft:5,marginBottom:10,fontWeight:"bold"}}>New password</Text>
  <Text style={{color:"red",fontWeight:"bold"}} onPress={()=>changeInputView("noChange")}>Cancel</Text>
</View>
            
            <TextInput
            secureTextEntry
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            style={styles.editProfile_inputs} placeholder='********' />
          </View>
          <View style={styles.inputsContainer}>
            <Text style={{color:'black',fontSize:18,marginLeft:5,marginBottom:10,fontWeight:"bold"}}>Confirm new password</Text>
            <TextInput
            secureTextEntry
            onChangeText={(text) => handleInputChange('password', text)}
            style={styles.editProfile_inputs} placeholder='********' />
            {user.password !== confirmPassword && (
            <Text style={styles.errorMessage}>Passwords do not match</Text>)}
            {isError && (
        <Text style={styles.errorMessage}>invalid old password</Text>
      )}
          </View>
          </View> }
          
          <View style={styles.inputsContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() =>{handleSave()}}>
              <Text style={styles.next}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
    );
  }
};

const styles = StyleSheet.create({
  editProfile_inputs: {
    borderStyle: "solid",
    borderWidth: 3,
    borderColor:"#DCE2FC",
    width: 380,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    color: "black",
    fontSize:18
  },
  errorMessage:{
    color:"red",
    fontSize:17,
    marginLeft:10
  },
  camera:{
    backgroundColor:"#E7E9F2",
    borderWidth:1.5,
    width:37,
    height:37,
    borderRadius:100,
    marginTop:-40,
    marginLeft:110,
    justifyContent:'center',
    opacity:0.8,
    alignItems:"center"},
  inputsContainer: {
    marginTop: 20,
  },
  editProfileContainer: {
    alignItems: "center"
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 380,
    borderRadius: 30,
    borderStyle: "solid",
    backgroundColor: '#112678'
  },
  next: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default EditProfile;
