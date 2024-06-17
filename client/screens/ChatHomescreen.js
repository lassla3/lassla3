import {
  Alert,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import homeImage from "../assets/chat-home-image.jpg";
import { useContext, useEffect,useState } from "react";
import { GlobalContext } from "../context";
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { getOneAsync } from '../src/reduce/getOne';


export default function ChatHomescreen({ navigation }) {
  const {
    showLoginView,
    setShowLoginView,
    currentUserName,
    setCurrentUserName,
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
  } = useContext(GlobalContext);
 
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token,'token');
      //  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6InVzZXIiLCJpYXQiOjE3MTYxOTgxMjl9.-VNS4jD9Z4uDabJg_W-C5DvNXPcKO4AijXj_QvBrGZ0";
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const userData = await dispatch(getOneAsync(userId));
        setProfile(userData.payload);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserProfile();
  }, [dispatch]);
 
  let Fullname 
  if ((profile?.firstName&&profile?.lastName)===undefined){
    Fullname=""
  }else{
    Fullname=profile?.firstName+' '+profile?.lastName
  }
   

  const handlePress = () => {
    setCurrentUserName(Fullname);
    handleRegisterAndSignIn()
}

  function handleRegisterAndSignIn() {
    
    if (currentUserName.trim() !== "") {
      const index = allUsers.findIndex(
        (userItem) => userItem === currentUserName
      );

      // if (isLogin) {
      //   if (index === -1) {
      //     Alert.alert("Please register first");
      //   } else {
         // setCurrentUser(currentUserName);
        // }
      // } else {
        if (index === -1) {
          allUsers.push(currentUserName);
          setAllUsers(allUsers);
          setCurrentUser(currentUserName);
        // } else {
        //   Alert.alert("Already registered ! Please login");
        // }
      }

      // setCurrentUserName("");
    } else {
      Alert.alert("Please Login First!!");
    }

    Keyboard.dismiss();
  }

  useEffect(() => {
    if (currentUser.trim() !== "") navigation.navigate("Chatscreen");
  }, [currentUser]);

  console.log(allUsers, currentUser);
  console.log(Fullname,'Fullname');

  return (
    <View style={styles.mainWrapper}>
      <ImageBackground source={homeImage} style={styles.homeImage} />
      <View style={styles.content}>
        {showLoginView ? (
          <View style={styles.infoBlock}>
            <View style={styles.loginInputContainer}>
              <Text style={styles.heading}>Enter Your User Name</Text>
              <TextInput
                autoCorrect={false}
                placeholder="Enter your user name"
                style={styles.loginInput}
                onChangeText={(value) => setCurrentUserName(value)}
                value={currentUserName}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Pressable
                onPress={() => handleRegisterAndSignIn(false)}
                style={styles.button}
              >
                <View>
                  <Text style={styles.buttonText}>Register</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => handleRegisterAndSignIn(true)}
                style={styles.button}
              >
                <View>
                  <Text style={styles.buttonText}>Login</Text>
                </View>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.infoBlock}>
            <Text style={styles.heading}>Connect , Grow and Inspire</Text>
            <Text style={styles.subHeading}>
              Connect people around the world for free
            </Text>
            <Pressable
              style={styles.button}
              onPress={() =>handlePress()}
            >
              <View>
                <Text style={styles.buttonText}>Get Started</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  homeImage: {
    width: "100%",
    flex: 3,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  infoBlock: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 15,
    color: "#acacac",
    marginBottom: 15,
  },
  loginInput: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 8,
  },
  button: {
    backgroundColor: "#112678",
    padding: 15,
    marginVertical: 10,
    width: "34%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});