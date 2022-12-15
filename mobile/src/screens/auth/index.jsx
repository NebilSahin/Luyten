import React, {useEffect, useRef, useState, useCallback} from 'react';
import {CrossfadeImage} from 'react-native-crossfade-image';
import {
  Text,
  View,
  Image,
} from 'react-native';
import Login from '../auth/components/Login';
import Signup from '../auth/components/Signup';
import Button from '../../components/Button';
import BottomModal from '../../components/BottomModal';
import {langFileSelector} from '../../shared/lang';
import {AuthStyles} from '../../theme/Styles';

const logo = require('../../../assets/logo.png');
const backgroundImagesArr = [
  require('../../../assets/backgroundImage.jpg'),
  require('../../../assets/backgroundImage2.jpg'),
  require('../../../assets/backgroundImage3.jpg'),
];

const Auth = () => {
  const LANG = langFileSelector();
  const AUTH_STYLE = AuthStyles();
  const sheetRef = useRef(null);
  const [sheetComponent, setsheetComponent] = useState(null);
  const [imageSource, setImageSource] = useState(0);
  
  //handles what happens when each of the buttons are pressed
  const handleSnapPress = useCallback(sheetComponent => {
    renderBottomSheet(sheetComponent);
    sheetRef.current?.present();
  }, []);

  //renders the bottom sheet modal witht he appropriate component
  const renderBottomSheet = currentComponent => {
    if (sheetComponent == null) {
      setsheetComponent(
        <BottomModal
          componentRef={currentComponent}
          sheetRef={sheetRef}
        />,
      );
    }
  };

  //image cycle effect
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
        style={AUTH_STYLE.backgroundImage}
        source={backgroundImagesArr[imageSource]}
        resizeMode="cover"
      />
      <View
        style={[
          AUTH_STYLE.background,
        ]}
      />
      <View style={AUTH_STYLE.screenContainer} onLayout={renderBottomSheet(null)}>
        <View style={AUTH_STYLE.titleContainer}>
          <Image source={logo} style={AUTH_STYLE.logo} />
          <Text
            style={[
              AUTH_STYLE.titleText,
            ]}>
            {LANG.authScreen.title}
          </Text>
          <Text
            style={[
              AUTH_STYLE.subtitleText,
            ]}>
            {LANG.authScreen.subtitle}
          </Text>
        </View>
        <View style={AUTH_STYLE.buttonContainer}>
          <Button
            styles={AUTH_STYLE.button}
            text={LANG.authScreen.login}
            buttonStyle="buttonOutline"
            buttonTheme="buttonSecondaryOutline"
            onPress={() => handleSnapPress(<Login />)}
          />
          <Button
            styles={AUTH_STYLE.button}
            text={LANG.authScreen.signup}
            buttonStyle="buttonSolid"
            buttonTheme="buttonPrimary"
            onPress={() => handleSnapPress(<Signup />)}
          />
        </View>
      </View>
      {sheetComponent}
    </>
  );
};

export default Auth;
