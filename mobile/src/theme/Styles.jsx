import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {themeSelector} from '../theme';
import {color} from 'react-native-reanimated';
import {THEME_CONSTANT} from '../shared/Constant';
import {useSelector} from 'react-redux';

const THEME_CONFIG = require('../theme/themes.json');

export const CoreStyles = props => {
    const THEME = themeSelector();
    return StyleSheet.create({
        bottomSheetContainer: {
            backgroundColor: THEME_CONFIG[THEME].background,
            marginHorizontal: props.detached ? 24 : null,
            borderRadius: 30,
            padding: props.detached ? null : 24,
        },
        bottomSheetContent: {
            flex: 1,
            justifyContent: 'center',
            margin: props.detached ? null : 30,
            marginHorizontal: props.detached ? 30 : null,
            marginBottom: props.detached ? 24 : null,
        },
        bottomSheetIndicator: {
            height: props.detached ? 0 : 5,
            backgroundColor: THEME_CONFIG[THEME].extra,
            opacity: props.detached ? 0 : 1,
        },
        buttonSolid: {
            alignItems: 'center',
            borderRadius: 50,
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
        },
        buttonOutline: {
            alignItems: 'center',
            borderRadius: 50,
            borderWidth: 2,
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
        },
    });
};

export const AuthStyles = () => {
    const THEME = themeSelector();

    return StyleSheet.create({
        screenContainer: {
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
        titleText: {
            color: THEME_CONFIG[THEME].titleLight,
            fontSize: 34,
            fontWeight: 'bold',
        },
        subtitleText: {
            color: THEME_CONFIG[THEME].titleLight,
            fontSize: 24,
            fontWeight: 'bold',
        },
        background: {
            opacity: THEME == THEME_CONSTANT.DARK ? 0.5 : 0,
            backgroundColor: THEME_CONFIG[THEME].background,
            resizeMode: 'cover',
            height: '100%',
            width: '100%',
            position: 'absolute',
        },
        backgroundImage: {
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
        authSheetContainer: {
            paddingBottom: 100,
            backgroundColor: THEME_CONFIG[THEME].background,
        },
        welcomeText: {
            fontSize: 18,
            color: THEME_CONFIG[THEME].text,
        },
        submitButton: {
            marginTop: 20,
        },
        forgotPasswordText: {
            color: THEME_CONFIG[THEME].text,
            textAlign: 'center',
            marginTop: 10,
        },
    });
};
export const AlertStyles = () => {
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const THEME = themeSelector();
    return StyleSheet.create({
        alertContainer: {
            marginHorizontal: 24,
        },
        alertMessageTitle: {
            fontSize: 24,
            alignSelf: sessionLang == 'en' ? 'flex-start' : 'flex-end',
            textAlign: sessionLang == 'en' ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        alertMessage: {
            marginTop: 24,
            fontSize: 18,
            textAlign: 'center',
            color: THEME_CONFIG[THEME].text,
        },
        alertButtonContainer: {
            marginTop: 24,
        },
        alertButton: {
            borderRadius: 30,
            fontSize: 18,
            justifyContent: 'center',
            textAlign: sessionLang == 'en' ? 'right' : 'left',
        },
        alertButtonText: {
            fontSize: 18,
            textAlign: 'center',
            color: THEME_CONFIG[THEME].text,
        },
    });
};
