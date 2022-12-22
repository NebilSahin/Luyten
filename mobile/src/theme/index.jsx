import React, {useState} from 'react';
import {Appearance, NativeModules} from 'react-native';
import {THEME_CONSTANT} from '../shared/Constant';
import {useSelector, useDispatch} from 'react-redux';
export const THEME_CONFIG = require('./themes.json');
import {View, Switch, StyleSheet, Text} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {themeToggleAction} from '../redux/actions/UserActions';
import Button from '../components/Button';
import {langFileSelector} from '../shared/lang';
import {useCallback} from 'react';
import {CoreStyles} from '../theme/Styles';

export const themeSelector = () => {
    const sessionTheme = useSelector(
        state => state.sessionTheme.isDarkThemeActive,
    );
    if (sessionTheme == null) {
        return Appearance.getColorScheme();
    } else {
        return sessionTheme ? THEME_CONSTANT.LIGHT : THEME_CONSTANT.DARK;
    }
};

export const ThemeToggleElement = (props) => {
    const THEME = themeSelector();
    const LANG = langFileSelector();
    const CORE_STYLE = CoreStyles(props);

    const dispatch = useDispatch();
    const handleThemeChange = useCallback(() => {
        SystemNavigationBar.setBarMode(THEME, 'status ');
        dispatch(themeToggleAction(THEME));
    });

    return (
        <View style={CORE_STYLE.settingsItemContainer}>
            <Button
                style={CORE_STYLE.settingsItemBtn}
                buttonStyle="none"
                buttonTheme="noneThemeButton"
                onPress={handleThemeChange}>
                <View style={CORE_STYLE.settingsItemBtnContainer}>
                    <Text style={CORE_STYLE.settingsItemTitle}>
                        {LANG.core.toggleTheme}
                    </Text>
                    <View style={CORE_STYLE.settingsItemBtnContentContainer}>
                        <Switch
                            trackColor={{
                                false: THEME_CONFIG[THEME].switch
                                    .trackColorNotActive,
                                true: THEME_CONFIG[THEME].switch
                                    .trackColorActive,
                            }}
                            thumbColor={
                                THEME == THEME_CONSTANT.DARK
                                    ? THEME_CONFIG[THEME].switch
                                          .thumbColorActive
                                    : THEME_CONFIG[THEME].switch
                                          .thumbColorNotActive
                            }
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={handleThemeChange}
                            value={THEME == THEME_CONSTANT.DARK}
                        />
                    </View>
                </View>
            </Button>
        </View>
    );
};