import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const Migrations = ({ onboardingImages, nav }) => {
  const scrollViewRef = useRef(null);
  const [railBackgroundColor, setRailBackgroundColor] = useState("rgba(128,128,128,0.2)");
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    setRailBackgroundColor("#FFFFFF");
    if (currentPage < onboardingImages.length - 1) {
      const nextPage = currentPage + 1;
      scrollViewRef.current.scrollTo({ x: nextPage * 550, animated: true });
      setCurrentPage(nextPage);
    } else {
      nav.replace('OwnerProfile');
    }
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.floor(offsetX / 550);
    setCurrentPage(newPage);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        {onboardingImages.map((image, index) => (
          <View key={index} style={{ width: 550, height: '100%' }}>
            <Image source={image} style={{ width: '100%', height: '100%' }} />
          </View>
        ))}
      </ScrollView>
      
      <View style={{ position: 'absolute', alignItems: 'center',        
 }}>
  <Text style={{   color: 'white', 
    textAlign: 'center',
     marginTop: 240,
    fontSize: 22,
   marginLeft:10
  
    }}>
            . Ensure all property details are accurate and up-to-date{'\n'}
            . Respond to booking inquiries promptly{'\n'}
            . Maintain high standards of cleanliness and hospitality{'\n'}
            . Address guest issues and feedback constructively,{'\n'}
  </Text>
        
          <TouchableOpacity onPress={handleNext} style={[{    marginTop: 200,
    justifyContent:'center' ,
    alignItems:'center',
   
    backgroundColor: '#112678',
    width: 350,
    borderRadius: 22,
    height: 40,
    alignSelf: 'center',
     }]}> 
              <Text style={{ fontSize: 20, fontFamily:'', color: 'white',alignItems:"center"}}>Next</Text>
          </TouchableOpacity>


      </View>
    </View>
  );
};

const Migrations2 = ({ navigation }) => {
  const onboardingImages = [
  
    require('../../Photo/migration.jpeg'),
  ];

  return (
    <View style={{ flex: 1 }}>
      <Migrations nav={navigation} onboardingImages={onboardingImages} />
    </View>
  );
};

export default Migrations2;
