import React, { useState,useEffect } from 'react'
import { View ,Image,Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector ,useDispatch} from 'react-redux';

export default function RoomByHotel({navigation, route}) {

    console.log('id',route.params.id);
    console.log('id',route.params.room);







  return (
   <ScrollView>
            <View style={{shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.25, shadowRadius: 3.84,elevation: 5,}}>
    <View style={{marginTop: 75, flexDirection: 'row', alignItems: 'center'}}>
    <View style={{marginRight: 20 }}>
        <Image source={{uri:'https://image.resabooking.com/images/hotel/Concorde_Green_Park_Palace_3.jpg'}} style={{width: 150, height: 150,marginLeft:16,borderRadius:10}} />
    </View>
    <View style={{marginTop:-20}}>
        <Text style={{fontSize:20,color:'black',marginBottom:12,color:'black'}}>name</Text>
       
        <Text style={{marginLeft:1,marginBottom:15,color:'black'}}>Rooms</Text>
        <Text style={{color:'black'}}><Icon size={20} name='location-pin'/>kuibyr-dr</Text>
    </View>
</View>
 <View style={{padding:10}}>
<Text style={{height:1,width:'100%', backgroundColor:'#DCE2FC',marginTop:30,}}>h</Text>
</View>
 </View>  
 </ScrollView>
  )
}
