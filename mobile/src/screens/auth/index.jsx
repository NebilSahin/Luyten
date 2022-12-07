import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {CrossfadeImage} from 'react-native-crossfade-image';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  SafeAreaView,
  Image,
  Animated,
} from 'react-native';
// import Icon, {Icons} from '../components/Icons';
import Login from '../auth/components/Login';
import Signup from '../auth/components/Signup';
import * as Animatable from 'react-native-animatable';
import {THEME_CONSTANT} from '../../shared/Constant';
import Button from '../../components/Button';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import {themeSelector} from '../../theme';

const THEME_CONFIG = require('../../theme/themes.json');
const langJson = require('../../shared/lang/en.json');
const logo = require('../../../assets/logo.png');
const backgroundImagesArr = [
  require('../../../assets/backgroundImage.jpg'),
  require('../../../assets/backgroundImage2.jpg'),
  require('../../../assets/backgroundImage3.jpg'),
];

const Auth = () => {
  const THEME = themeSelector();
  const sheetRef = useRef(null);
  const [sheetComponent, setsheetComponent] = useState(null);
  const [imageSource, setImageSource] = useState(0);

  const handleSnapPress = useCallback(sheetComponent => {
    renderBottomSheet(sheetComponent);
    sheetRef.current?.present();
  }, []);

  const renderBottomSheet = currentComponent => {
    if (sheetComponent == null) {
      setsheetComponent(
        <CustomBottomSheet
          componentRef={currentComponent}
          sheetRef={sheetRef}
        />,
      );
    }
  };

  useEffect(() => {
    let interval;
    if (!interval) {
      interval = setInterval(() => {
        const newIndex =
          imageSource + 1 === backgroundImagesArr.length ? 0 : imageSource + 1;
        setImageSource(newIndex);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [imageSource]);

  return (
    <>
      <CrossfadeImage
        style={styles.backgroundIamge}
        source={backgroundImagesArr[imageSource]}
        resizeMode="cover"
      />
      <View
        style={[
          styles.background,
          {
            opacity: THEME == THEME_CONSTANT.DARK ? 0.5 : 0,
            backgroundColor: THEME_CONFIG[THEME].background,
          },
        ]}
      />
      <View style={styles.container} onLayout={renderBottomSheet(null)}>
        <View style={styles.titleContainer}>
          <Image source={logo} style={styles.logo} />
          <Text
            style={[
              styles.title,
              {
                color: THEME_CONFIG[THEME].titleLight,
              },
            ]}>
            {langJson.introScreenTitle}
          </Text>
          <Text
            style={[
              styles.subTitle,
              {
                color: THEME_CONFIG[THEME].titleLight,
              },
            ]}>
            {langJson.introScreenSubTitle}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            styles={styles.button}
            text={langJson.login}
            buttonTheme="buttonSecondaryOutline"
            onPress={() => handleSnapPress(<Login />)}
          />
          <Button
            styles={styles.button}
            text={langJson.signup}
            buttonTheme="buttonPrimary"
            onPress={() => handleSnapPress(<Signup />)}
          />
        </View>
      </View>
      {sheetComponent}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    marginVertical: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  background: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  backgroundIamge: {
    position: 'absolute',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 180,
    height: 100,
    alignSelf: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
  },
  tabBar: {
    borderWidth: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});

export default Auth;
