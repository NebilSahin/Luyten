import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Image} from 'react-native';
import { CoreStyles } from '../../theme/Styles';

export const Splash = ({children}) => {
  //styles
  const CORE_STYLE = CoreStyles();
  //ref
  const containerOpacity = useRef(new Animated.Value(1)).current;

  //state variables
  const [containerHidden, setContainerHidden] = useState(false);
  const [imageIsLoading, setimageIsLoading] = useState(true);

  //animation effect (fade in / fade out)
  useEffect(() => {
    if (imageIsLoading === false) {
      Animated.sequence(
        Animated.timing(containerOpacity, {
          toValue: 1,
          duration: 500, 
          delay: 0,
          useNativeDriver: true,
        }).start(),
        Animated.timing(containerOpacity, {
          toValue: 0,
          duration: 500, // Fade out duration
          delay: 1000,
          useNativeDriver: true,
        }).start(() => {
          setContainerHidden(true);
        }),
      );
    }
  }, [containerOpacity, imageIsLoading, containerHidden]);

  //render
  return (
    <>
      {children}
      <Animated.View
        collapsable={false}
        style={[CORE_STYLE.splashContainer, {opacity: containerOpacity, zIndex: containerHidden ? -100 : 0}]}>
        <Image
          source={require('../../../assets/logo.png')}
          onLoad={() => {
            setimageIsLoading(false);
          }}
          style={[CORE_STYLE.splashImage, {opacity: 1}]}
          resizeMode="contain"
        />
      </Animated.View>
    </>
  );
};

export default Splash;