import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StatusBar,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text
} from 'react-native';
import CustomSwipeButton from './CustomSwipeButton'; // Adjust the import path as necessary
import arrowRight from '../../Photo/arrow-right.png'; // Adjust the import path as necessary

const OnboardingScreen = ({ onboardingImages, nav }) => {
  const scrollViewRef = useRef(null);
  const [railBackgroundColor, setRailBackgroundColor] = useState("rgba(128,128,128,0.2)");
  const [currentPage, setCurrentPage] = useState(0);
  const [swipeStatusMessage, setSwipeStatusMessage] = useState('ENJOY HOLIDAYS');

  const handleNext = () => {
    setRailBackgroundColor("#FFFFFF");
    if (currentPage < onboardingImages.length - 1) {
      const nextPage = currentPage + 1;
      scrollViewRef.current.scrollTo({ x: nextPage * Dimensions.get('window').width, animated: true });
      setCurrentPage(nextPage);
    } else {
      nav.replace('AppFace');
    }
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.floor(offsetX / Dimensions.get('window').width);
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
          <View key={index} style={{ width: Dimensions.get('window').width, height: '100%' }}>
            <Image source={image} style={{ width: '100%', height: '100%' }} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Swipe
                 to find your perfect Vacation spot{'\n'}
                  from a huge selection of hotels{'\n'} 
                  to stay verified for quality and design
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center' }}>
        <StatusBar barStyle="dark-content" />
        <View style={[{ width: 300, height: 100 }]}>
          <CustomSwipeButton
            onSwipeSuccess={handleNext}
            title={swipeStatusMessage}
            railBackgroundColor={railBackgroundColor}
            thumbIconImageSource={arrowRight}
          />
        </View>
      </View>
    </View>
  );
};

const Onboarding = ({ navigation }) => {
  const onboardingImages = [
    require('../../Photo/Screen1.jpeg'),
  
  ];

  return (
    <View style={{ flex: 1 }}>
      <OnboardingScreen nav={navigation} onboardingImages={onboardingImages} />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    bottom: 450,
    left: 20,
    right: 20,
  },
  text: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    fontFamily:"Italic"
  },
});

export default Onboarding;
