import React, { useEffect, useState } from 'react';
import { View ,Text,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import { eachDayOfInterval, format } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { ComparPrice } from '../../reduce/comparPrice';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  } from 'react-native-gesture-handler';

export default function Reservation({route,navigation}) {
  const [hotelId,setHotelId]=useState(route.params.hotelId)
  const [selectedValue, setSelectedValue] = useState(route.params.view);
  const [selectedPlan, setSelectedPlan] = useState(route.params.plan);
  const [date, setDate] = useState({});
  const [numRoom, setNumRoom] = useState(route.params.numRoom);
  const [price, setPrice] = useState();
  const [selectedDates, setSelectedDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
const people=route.params.people
  const dispatch = useDispatch();
const prices=useSelector(state=>state.getRoomByCategory.room)
console.log('price',prices?.price);
console.log(prices);
const body={
  view:selectedValue,
  hotelId:hotelId,
  plan:selectedPlan,
  numRoom:numRoom,
  price:prices?.price
}
console.log('calendar',route.params.ownerId);
const handleGet=()=>{
    dispatch(ComparPrice(body))
}

console.log('hotelId',hotelId);


const onDayPress = (day) => {
  const { dateString } = day;
  const newSelectedDates = [...selectedDates]; 
  console.log('hello',day);

    if (startDate) {
      const [start, end] = [startDate, dateString].sort();
      for (let i = new Date(start); i <= new Date(end); i.setDate(i.getDate() + 1)) {
        const dateObj = new Date(i);
        const formattedDate = dateObj.toISOString().slice(0, 10);
        if (!newSelectedDates.includes(formattedDate)) {
          newSelectedDates.push(formattedDate);
        }
      }
    } else {
      setStartDate(dateString);
    }
    setSelectedDates(newSelectedDates);
    console.log("alll dates ",selectedDates)
  };

  const markedDates = selectedDates.reduce((acc, date) => {
    acc[date] = { marked: true };
    return acc;
  }, {});
  function getDatesBetween(startDate, endDate) {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
  
    if (!start && !end) {
      throw new Error("At least one date must be provided");
    }
  
    if ((start && isNaN(start)) || (end && isNaN(end))) {
      throw new Error("Invalid date format");
    }
  
    if (!start) return [end];
    if (!end) return [start];
  
    if (start > end) {
      throw new Error("Start date must be before end date");
    }
  
    const dates = [];
  
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date)); 
    }
  
    return dates;
  }
  
 
  const today = format(new Date(), 'yyyy-MM-dd');
  console.log(selectedDates);
  const chek=()=>{
    if(selectedDates===null) {
        return 'Date'
    }else{
    return selectedDates
    }
  }
  useEffect(() => {
chek()
  },[])

  return (
<ScrollView contentContainerStyle={styles.scrollContainer}>
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <Icon name='arrow-back' size={25} color='white' />
      </TouchableOpacity>
      <Text style={styles.headerText}>Choose Your Arrival & Departure</Text>
    </View>
    <View style={styles.calendarContainer}>
      <Calendar
        style={styles.calendar}
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType={'custom'}
        minDate={today}
        theme={{
          backgroundColor: '#F4F7FD',
          calendarBackground: '#F4F7FD',
          textSectionTitleColor: 'black',
          dayTextColor: 'black',
          todayTextColor: '#00adf5',
        }}
      />
    </View>
    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
      <View style={styles.dateInfoTextWrapper}>
        <Text style={styles.dateInfoText}>Start:</Text>
        <Text style={styles.dateInfoText}>{selectedDates[0]}</Text>
      </View>
      <View style={styles.dateInfoTextWrapper}>
        <Text style={styles.dateInfoText}>End: </Text>
        <Text style={styles.dateInfoText}>{selectedDates[selectedDates.length - 1]}</Text>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <Button mode="outlined" color='black' style={styles.resetButton} onPress={() => navigation.navigate('AllHotell')}>
        Reset
      </Button>
      <Button mode="contained" style={styles.continueButton} onPress={() => {
        handleGet(), navigation.navigate('Detail', {
          selectedDates: selectedDates,
          hotelId: hotelId,
          numRoom: numRoom,
          people: people,
          ownerId: route.params.ownerId,
          hotelName: route.params.hotelName
        })
      }}>
        Continue
      </Button>
    </View>
  </View>
</ScrollView>

  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingVertical: 30,
  },
  container: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
  },
  dateInfoTextWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  backButton: {
    padding: 10,
    backgroundColor: '#112678',
    borderRadius: 50,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    // alignItems: 'center',
    width:'100%'
  },
  calendar: {
    // flex:1,
    width: '100%',
    borderRadius: 10,
  },
  dateInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  dateInfoText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  resetButton: {
    flex: 1,
    marginRight: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  continueButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#112678',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});









