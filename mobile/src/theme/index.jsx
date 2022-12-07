import React, {useState} from 'react';
import {Appearance, NativeModules} from 'react-native';
import {THEME_CONSTANT} from '../shared/Constant';
import {useSelector, useDispatch} from 'react-redux';
export const THEME_CONFIG = require('./themes.json');
import {View, Switch, StyleSheet} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { themeToggleAction } from '../redux/actions/UserActions';

export const themeSelector = () => {
  const sessionTheme = useSelector(
    state => state.themeSelector.isDarkThemeActive,
  );
  if (sessionTheme == null) {
    return Appearance.getColorScheme();
  } else {
    return sessionTheme ? THEME_CONSTANT.LIGHT : THEME_CONSTANT.DARK;
  }
};

export const ThemeToggleElement = () => {
  const THEME = themeSelector();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{
          false: THEME_CONFIG[THEME].switch.trackColorNotActive,
          true: THEME_CONFIG[THEME].switch.trackColorActive,
        }}
        thumbColor={
          THEME == THEME_CONSTANT.LIGHT
            ? THEME_CONFIG[THEME].switch.thumbColorActive
            : THEME_CONFIG[THEME].switch.thumbColorNotActive
        }
        ios_backgroundColor="#3e3e3e"
        onValueChange={async () => {
          await SystemNavigationBar.setBarMode(THEME, 'status ');
          dispatch(themeToggleAction(THEME));
        }}
        value={THEME == THEME_CONSTANT.LIGHT}
      />
    </View>
  );
};

class ThemeStore {
  defaultTheme = THEME_CONSTANT.LIGHT;

  constructor() {
    const deviceTheme = Appearance.getColorScheme();
    if (deviceTheme) {
      this.defaultTheme = deviceTheme;
    }
  }
}

export const themeStore = new ThemeStore();
const theme = THEME_CONFIG[themeStore.defaultTheme];


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default theme;
