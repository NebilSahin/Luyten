import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import BottomSheetInput from '../../../components/BottomSheetInput';
import Button from '../../../components/Button';
import {THEME} from '../shared/Constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TogglePasswordVisibility} from '../../../components/InputFunctions';
import {themeSelector} from '../../../theme';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
const THEME_CONFIG = require('../../../theme/themes.json');
const langJson = require('../../../shared/lang/en.json');

const LoginComponent = () => {
  const THEME = themeSelector();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {dismiss, dismissAll} = useBottomSheetModal();
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    TogglePasswordVisibility();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: THEME_CONFIG[THEME].background},
      ]}>
      <Text style={[styles.welcome, {color: THEME_CONFIG[THEME].text}]}>
        {langJson.welcomeMessage}
      </Text>
      <BottomSheetInput
        placeholder={langJson.usernameField}
        cursorColor={THEME_CONFIG[THEME].primary}
        keyboardAppearance={THEME_CONFIG[THEME].theme}
        textContentType="username"
      />
      <BottomSheetInput
        placeholder={langJson.passwordField}
        cursorColor={THEME_CONFIG[THEME].primary}
        keyboardAppearance={THEME_CONFIG[THEME].theme}
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType="password"
        icon={
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons
              name={rightIcon}
              size={22}
              color={THEME_CONFIG[THEME].extra}
            />
          </Pressable>
        }
      />
      <Button
        styles={styles.button}
        text={langJson.login}
        buttonTheme="buttonPrimary"
        onPress={() => {
          dispatch({type: 'user/sessionActiveState'});
          dismissAll();
        }}
      />
      <Text style={[styles.forgotPassword, {color: THEME_CONFIG[THEME].text}]}>
        {langJson.forgotPassword}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 30,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 60,
  },
  welcome: {
    fontSize: 18,
  },
  button: {
    marginTop: 20,
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginComponent;
