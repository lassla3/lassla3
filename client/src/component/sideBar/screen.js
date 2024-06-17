import React from 'react'
import {SafeAreaView,View,StyleSheet,Text} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
const SideBar = ({navigation}) => {
    const profileIcon=<Icon name="user" size={20} color={"black"}/>
    const homeIcon=<Icon name="home" size={20} color={"black"}/>
    const hotelsIcon=<Icon name="hotel" size={20} color={"black"}/>
    const aboutIcon=<Icon name="info" size={20} color={"black"}/>
  return (
    <SafeAreaView>
        <View style={styles.sideBar_container}>
            <Text onPress={()=> 
            navigation.navigate("profile",{name:"UserProfile"})
            } style={styles.sideBar_btns}>{profileIcon} Profile</Text>
            <Text onPress={()=> 
            navigation.navigate("home",{name:"HomePage"})
            } style={styles.sideBar_btns}>{homeIcon} Home</Text>
            <Text onPress={()=> 
            navigation.navigate("hotels",{name:"Hotels"})
            } style={styles.sideBar_btns}>{hotelsIcon} Hotels</Text>
            <Text onPress={()=> 
            navigation.navigate("About Us")
            } style={styles.sideBar_btns}>{aboutIcon} About us</Text>
        </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
    sideBar_container:{
        borderRadius:10,
        marginTop:10,
        marginLeft:10,
        width:"50%",
        height:"97%",
        backgroundColor:"#CCCCCC",
        alignItems:"center"
    },
    sideBar_btns:{
        textAlign:"center",
        opacity:0.5,
        marginTop:30,
        borderWidth:1,
        backgroundColor:"#8C8C8C",
        padding:10,
        borderRadius:10,
        width:"80%",
        color:"black",
        fontSize:20,
    }
})


export default SideBar
