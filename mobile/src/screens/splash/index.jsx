// import React, {Component} from 'react';
// import {Text, View, StyleSheet} from 'react-native';
// import {useSelector} from 'react-redux';
// import {useNavigation, StackActions} from '@react-navigation/native';

// const Loading = () => {
//   return (
//     <View style={styles.container} >
//       <Text> Loading </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Loading;

import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Image} from 'react-native';

export const Splash = ({children}) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const [containerHidden, setContainerHidden] = useState(false);
  const [imageIsLoading, setimageIsLoading] = useState(true);

  useEffect(() => {
    if (imageIsLoading === false) {
      Animated.sequence(
        Animated.timing(containerOpacity, {
          toValue: 1,
          duration: 500, // Fade out duration
          delay: 1000, // Minimum time the logo will stay visible
          useNativeDriver: true,
        }).start(),
        Animated.timing(containerOpacity, {
          toValue: 0,
          duration: 500, // Fade out duration
          delay: 2000,
          useNativeDriver: true,
        }).start(() => {
          setContainerHidden(true);
        }),
      );
    }
  }, [containerOpacity, imageIsLoading, containerHidden]);

  return (
    <>
      {children}
      <Animated.View
        collapsable={false}
        style={[style.container, {opacity: containerOpacity, zIndex: containerHidden ? -100 : 0}]}>
        <Image
          source={require('../../../assets/wasl_ic_round.png')}
          onLoad={() => {
            setimageIsLoading(false);
          }}
          style={[style.image, {opacity: 1}]}
          resizeMode="contain"
        />
      </Animated.View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0eb4b4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});
