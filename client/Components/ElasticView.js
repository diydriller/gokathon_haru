import React, { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

const ElasticView = ({duration=2000, ela=1, children }) => {
  const ElasticAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      ElasticAnim,
      {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
        easing: Easing.elastic(ela)
      }
    ).start();
  }, [ElasticAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        opacity: ElasticAnim,         // Bind opacity to animated value
      }}
    >
      {children}
    </Animated.View>
  );
}
export default ElasticView;