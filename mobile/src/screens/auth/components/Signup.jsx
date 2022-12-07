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
import {useSelector} from 'react-redux';
import {THEME} from '../shared/Constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TogglePasswordVisibility,
  ToggleRePasswordVisibility,
} from '../../../components/InputFunctions';
import {themeSelector} from '../../../theme';

const THEME_CONFIG = require('../../../theme/themes.json');
const langJson = require('../../../shared/lang/en.json');

const SignupComponent = props => {
  const THEME = themeSelector();
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    TogglePasswordVisibility();
  const {rePasswordVisibility, reRightIcon, handleRePasswordVisibility} =
    ToggleRePasswordVisibility();

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
        placeholder={langJson.emailField}
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
      <BottomSheetInput
        placeholder={langJson.rePasswordField}
        cursorColor={THEME_CONFIG[THEME].primary}
        keyboardAppearance={THEME_CONFIG[THEME].theme}
        autoCorrect={false}
        secureTextEntry={rePasswordVisibility}
        textContentType="password"
        icon={
          <Pressable onPress={handleRePasswordVisibility}>
            <MaterialCommunityIcons
              name={reRightIcon}
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
        onPress={() => {}}
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
    paddingBottom: 100,
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

export default SignupComponent;
