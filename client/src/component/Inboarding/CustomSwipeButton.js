import React, { useState } from 'react';
import { View, Text, Animated, PanResponder, StyleSheet, Image } from 'react-native';

const CustomSwipeButton = ({ onSwipeSuccess, title, railBackgroundColor, thumbIconImageSource }) => {
  const [swipeAnimation] = useState(new Animated.Value(0));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: swipeAnimation }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 150) {
        Animated.timing(swipeAnimation, {
          toValue: 300,
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          onSwipeSuccess();
          swipeAnimation.setValue(0); // Reset the swipe position
        });
      } else {
        Animated.spring(swipeAnimation, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: railBackgroundColor }]}>
      <Animated.View
        style={[styles.thumb, { transform: [{ translateX: swipeAnimation }], backgroundColor: railBackgroundColor }]}
        {...panResponder.panHandlers}
      >
        <Image source={thumbIconImageSource} style={styles.thumbIcon} />
      </Animated.View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbIcon: {
    width: 20,
    height: 20,
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#000',
  },
});

export default CustomSwipeButton;
