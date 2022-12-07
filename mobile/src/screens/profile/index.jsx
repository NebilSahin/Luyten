import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {ThemeToggleElement} from '../../theme';
import {themeSelector} from '../../theme';

const THEME_CONFIG = require('../../theme/themes.json');
const langJson = require('../../shared/lang/en.json');

const Profile = () => {
  const dispatch = useDispatch();
  const THEME = themeSelector();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: THEME_CONFIG[THEME].screenBackground},
      ]}>
      <ThemeToggleElement />
      <Button
        styles={styles.button}
        text={langJson.logout}
        buttonTheme="buttonPrimary"
        onPress={() => {
          dispatch({type: 'user/sessionActiveState'});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  button: {
    marginTop: 20,
  },
});

export default Profile;
