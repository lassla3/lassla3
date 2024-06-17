import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View,Text ,ScrollView,StyleSheet} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { IconButton,Button } from 'react-native-paper';
import {fetchRoomByCategory} from '../../reduce/getRoomByCategory'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ComparPrice } from '../../reduce/comparPrice';

export default function ChooseGategory({ route, navigation }) {
    const [selectedValue, setSelectedValue] = useState("seaView");
    const [selectedPlan, setSelectedPlan] = useState("all_Inclusive");
    const [people, setPeople] = useState(0);
    const [numRoom, setNumRoom] = useState(1);
    const [hotelId,setHotelId]=useState(route.params.hotelId)
   console.log('choose',route?.params.ownerId);
    
    const dispatch = useDispatch();
    const body={
        view:selectedValue,
        hotelId:hotelId,
            }
            console.log('body',body);
const handleGet=(obj)=>{
    dispatch(fetchRoomByCategory(obj))
}
   
 
console.log('view',selectedValue);
console.log('id',hotelId);
console.log('selectedPlan',selectedPlan);
console.log('people',people);
console.log('numRoom',numRoom);

    const plus = () => {
      if (people>=0){

        setPeople(people + 1);
      }
    };
  
    const minus = () => {
      if (people>0) {
        setPeople(people - 1);
      }
    };
    const add = () => {
      if (numRoom>0){
        setNumRoom(numRoom + 1);
      }
    };
  
    const remove = () => {
      if (numRoom>0) {
        setNumRoom(numRoom - 1);
      }
    };



  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Text style={styles.chooseText}>Choose What suits you the most</Text>
        
      </View>
  
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Select View:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Sea View" value="seaView" />
              <Picker.Item label="Standard View" value="standardView" />
            </Picker>
          </View>
        </View>
        <View style={styles.divider} />
  
        <View style={styles.row}>
          <Text style={styles.label}>Meal Plan:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={selectedPlan}
              onValueChange={(itemValue) => setSelectedPlan(itemValue)}
            >
              <Picker.Item label="All Inclusive" value="all_Inclusive" />
              <Picker.Item label="Breakfast" value="breakFast" />
              <Picker.Item label="Half Board" value="halfBoard" />
            </Picker>
          </View>
        </View>
        <View style={styles.divider} />
  
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.subLabel}>Adults</Text>
            <Text>Age 13 Or Above</Text>
          </View>
          <View style={styles.counter}>
            <IconButton icon="minus-circle-outline" size={30} onPress={minus} />
            <Text style={styles.counterText}>{people}</Text>
            <IconButton icon="plus-circle-outline" size={30} color="red" onPress={plus} />
          </View>
        </View>
        <View style={styles.divider} />
  
        <View style={styles.rowBetween}>
          <View style={styles.iconWithTitle}>
            <Icon name="bedroom-parent" size={30} style={styles.roomIcon} />
            <Text style={styles.subLabel}>Room</Text>
          </View>
          <View style={styles.counter}>
            <IconButton icon="minus-circle-outline" size={30} onPress={remove} />
            <Text style={styles.counterText}>{numRoom}</Text>
            <IconButton icon="plus-circle-outline" size={30} color="red" onPress={add} />
          </View>
        </View>
      </View>
  
      <Button
        style={styles.searchButton}
        textColor="white"
        onPress={() => {
          handleGet(body),
          navigation.navigate('Calander', {
            hotelId: route.params.hotelId,
            view: selectedValue,
            plan: selectedPlan,
            numRoom: numRoom,
            people: people,
            ownerId: route.params.ownerId,
            hotelName: route.params.hotelName
          });
        }}
      >
        Search
      </Button>
    </View>
  </ScrollView>
  
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '94%',
    maxWidth: 400,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 20,
    height:'80%'
  },
  centeredView: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chooseText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 24,
    textAlign: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 15,
    backgroundColor: '#f8f8f8',
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
    marginTop:50
   
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  subLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  pickerContainer: {
    flex: 1,
    marginLeft: 10,
  },
  picker: {
    height: 40,
    width: 180,
    marginLeft:60
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    width: '100%',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  iconWithTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomIcon: {
    marginRight: 5,
  },
  searchButton: {
    // flex: 1,
    marginLeft: 10,
    backgroundColor: '#112678',
    // paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
   marginTop:90,
    height: 50,
  },
});






  
