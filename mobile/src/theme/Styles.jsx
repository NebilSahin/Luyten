import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {themeSelector} from '../theme';
import {color} from 'react-native-reanimated';
import {THEME_CONSTANT} from '../shared/Constant';
import {useSelector} from 'react-redux';

const THEME_CONFIG = require('../theme/themes.json');

export const ProfileStyles = () => {
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);

    return StyleSheet.create({
        profileContainer: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: THEME_CONFIG[THEME].background,
        },
        profileTabContainer: {
            height: '100%',
            backgroundColor: THEME_CONFIG[THEME].background,
            paddingHorizontal: 12,
            paddingVertical: 12,
        },
        profileDetailsContainer: {
            paddingHorizontal: 32,
            paddingVertical: 24,
        },
        profileTopTab: {
            tabBarPressOpacity: 0.2,
            tabBarPressColor: THEME_CONFIG[THEME].screenBorder,
            tabBarIndicatorContainerStyle: {
                borderBottomColor: THEME_CONFIG[THEME].screenBorder,
                borderBottomWidth: 1,
            },
            tabBarIndicatorStyle: {
                backgroundColor: THEME_CONFIG[THEME].primary,
            },
            tabBarLabelStyle: {color: THEME_CONFIG[THEME].text},
            tabBarStyle: {
                backgroundColor: THEME_CONFIG[THEME].background,
                elevation: 0,
            },
        },
        profileImageContainer: {
            flex: 1,
            textAlign: sessionLang == 'en' ? 'left' : 'right',
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
        },
        profileImage: {
            width: 80,
            height: 80,
            borderRadius: 200,
        },
        profileTopContainer: {
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
        },
        profileDataContainer: {
            width: '100%',
            flex: 2.5,
            justifyContent: 'center',
        },
        profileExtraDataContainer: {
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            textAlign: sessionLang == 'en' ? 'left' : 'right',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        profileDataText: {
            color: THEME_CONFIG[THEME].text,
            textAlign: sessionLang == 'en' ? 'left' : 'right',
        },
        profileUsernameContainer: {
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        editButtonText: {
            color: THEME_CONFIG[THEME].text,
        },
        profileUsername: {
            fontSize: 20,
            textAlign: sessionLang == 'en' ? 'left' : 'right',
        },
        profileCreatedat: {
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            fontSize: 12,
            textAlign: sessionLang == 'en' ? 'left' : 'right',
        },
        profileRole: {
            fontSize: 14,
            textAlign: sessionLang == 'en' ? 'left' : 'right',
        },
        editFormContainer: {
            paddingBottom: 100,
        },
    });
};

export const HomeStyles = () => {
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    return StyleSheet.create({
        cardImageContainer: {
            borderRadius: 30,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            height: 150,
            width: '100%',
        },
        cardContainer: {
            marginHorizontal: 12,
            marginVertical: 12,
            borderRadius: 30,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        cardContentContainer: {
            paddingHorizontal: 18,
            paddingVertical: 12,
            paddingTop: 6,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            width: '100%',
            backgroundColor: THEME_CONFIG[THEME].cardBackground,
        },
        innerShadowContainer: {
            borderRadius: 30,
        },
        postTitle: {
            fontSize: 18,
            color: THEME_CONFIG[THEME].text,
        },
        postCreator: {
            fontSize: 14,
            color: THEME_CONFIG[THEME].text,
        },
        postDate: {
            fontSize: 12,
            color: THEME_CONFIG[THEME].text,
        },
    });
};

export const CoreStyles = props => {
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);

    return StyleSheet.create({
        screeenContainer: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: THEME_CONFIG[THEME].background,
        },
        settingsItemContainer: {
            paddingVertical: 6,
            borderBottomWidth: 1,
            borderBottomColor: THEME_CONFIG[THEME].screenBorder,
        },
        settingsItemTitle: {
            alignSelf: 'center',
            color: THEME_CONFIG[THEME].text,
        },
        settingsItemBtnContainer: {
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            padding: 12,
        },
        settingsItemBtnContentContainer: {
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        settingsItemBtn: {
            borderRadius: 30,
        },
        bottomSheetContainer: {
            backgroundColor: THEME_CONFIG[THEME].background,
            marginHorizontal: props.detached ? 24 : null,
            borderRadius: 30,
        },
        bottomSheetContent: {
            margin: props.detached ? 22 : 30,
            marginTop: props.detached ? 18 : 30,
            marginHorizontal: props.detached ? 30 : null,
        },
        bottomSheetIndicator: {
            height: props.detached ? 0 : 5,
            backgroundColor: THEME_CONFIG[THEME].screenBorder,
            opacity: props.detached ? 0 : 1,
        },
        buttonSolid: {
            fontSize: 14,
            fontWeight: 900,
            alignItems: 'center',
            borderRadius: 50,
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
        },
        buttonOutline: {
            fontSize: 14,
            fontWeight: 900,
            alignItems: 'center',
            borderRadius: 50,
            borderWidth: 2,
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
        },
        bottomSheetScrollView: {
            height: 300,
        },
        icon: {
            marginHorizontal: 12,
        },
        navButtonContainer: {
            flex: 1,
            textAlign: sessionLang == 'en' ? 'left' : 'right',
            justifyContent: 'center',
            alignItems: 'center',
        },
        navProfileContainer: {
            flex: 1,
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            textAlign: sessionLang == 'en' ? 'left' : 'right',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        profileImageContainer: {
            flex: 1,
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
        },
        profileUsername: {
            flex: 1,
            fontSize: 12,
            color: THEME_CONFIG[THEME].text,
            paddingHorizontal: 10,
            alignSelf: 'center',
            textAlign: sessionLang == 'en' ? 'right' : 'left',
        },
        profileImage: {
            height: 30,
            width: 30,
            borderRadius: 50,
        },
        profileNavTitle: {
            flex: 3,
            fontSize: 18,
            fontWeight: '500',
            color: THEME_CONFIG[THEME].text,
            textAlign: sessionLang == 'en' ? 'left' : 'right',
        },
        postContainer: {
            flex: 1,
            backgroundColor: THEME_CONFIG[THEME].background,
            height: '100%',
            width: '100%',
        },
        postImageContainer: {
            width: '100%',
            height: 200,
        },
        postImage: {
            width: '100%',
            height: 200,
        },
        postTitle: {
            fontSize: 24,
            color: THEME_CONFIG[THEME].text,
        },
        postTitleDetailsContainer: {
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
        },
        postDetailsContainer: {
            padding: 12,
        },
        postCreator: {fontSize: 12, color: THEME_CONFIG[THEME].text},
        postDate: {fontSize: 12, color: THEME_CONFIG[THEME].text},
        postDescriptions: {
            fontSize: 16,
            padding: 12,
            color: THEME_CONFIG[THEME].text,
        },
    });
};

export const AuthStyles = () => {
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);

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
        inputContainer: {
            width: '100%',
            position: 'relative',
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            textAlign: sessionLang == 'en' ? 'left' : 'right',
            alignItems: 'center',
            borderRadius: 50,
            borderWidth: 2,
            marginTop: 10,
            padding: 3,
            paddingLeft: 20,
            paddingRight: 20,
        },
        input: {
            width: '95%',
            textAlign: sessionLang == 'en' ? 'left' : 'right',
        },
        icon: {
            with: '100%',
            alignItems: 'flex-end',
            alignContent: 'flex-end',
        },
        error: {
            position: 'absolute',
            bottom: 8,
            fontSize: 12,
            paddingHorizontal: 24,
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
            fontSize: 18,
            alignSelf: sessionLang == 'en' ? 'flex-start' : 'flex-end',
            textAlign: sessionLang == 'en' ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        alertMessage: {
            marginTop: 20,
            fontSize: 16,
            textAlign: 'center',
            color: THEME_CONFIG[THEME].text,
        },
        alertButtonContainer: {
            marginTop: 24,
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            justifyContent: 'space-evenly',
        },
        alertButton: {
            borderRadius: 30,
            justifyContent: 'center',
            textAlign: sessionLang == 'en' ? 'right' : 'left',
        },
        alertButtonText: {
            fontSize: 16,
            textAlign: 'center',
            color: THEME_CONFIG[THEME].primary,
        },
    });
};

export const LangStyles = () => {
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const THEME = themeSelector();
    return StyleSheet.create({
        langListContainer: {
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            color: THEME_CONFIG[THEME].text,
        },
        langCheckBox: {
            alignSelf: 'center',
            justifyContent: 'center',
            color: THEME_CONFIG[THEME].text,
        },
        langTitle: {
            alignContent: 'center',
            justifyContent: 'center',
            color: THEME_CONFIG[THEME].text,
        },
    });
};

export const ThemeSelectStyles = () => {
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const THEME = themeSelector();
    return StyleSheet.create({
        themeContainer: {
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: THEME_CONFIG[THEME].screenBorder,
        },
        themeTitle: {
            alignSelf: 'center',
        },
        themeBtn: {
            borderRadius: 30,
        },
        themeBtnContent: {
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            padding: 12,
        },
        themeBtnContainer: {
            flexDirection: sessionLang == 'en' ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    });
};
