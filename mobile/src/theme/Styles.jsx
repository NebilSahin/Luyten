import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {themeSelector} from '../theme';
import {color} from 'react-native-reanimated';
import {THEME_CONSTANT} from '../shared/Constant';
import {useSelector} from 'react-redux';

const THEME_CONFIG = require('../theme/themes.json');

const themeVariables = {
    paddingS: 6,
    paddingM: 12,
    paddingL: 18,
    paddingXL: 24,
    paddingXXL: 32,

    fontSizeS: 8,
    fontSizeM: 12,
    fontSizeL: 16,
    fontSizeXL: 18,
    fontSizeXXL: 24,
};

export const ProfileStyles = () => {
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    return StyleSheet.create({
        profileContainer: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: THEME_CONFIG[THEME].background,
        },
        profileTabContainer: {
            height: '100%',
            backgroundColor: THEME_CONFIG[THEME].background,
            paddingHorizontal: themeVariables.paddingM,
            paddingVertical: themeVariables.paddingM,
        },
        profileDetailsContainer: {
            paddingHorizontal: themeVariables.paddingXXL,
            paddingVertical: themeVariables.paddingXL,
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
            textAlign: isLtr ? 'left' : 'right',
            flexDirection: isLtr ? 'row' : 'row-reverse',
        },
        profileImage: {
            width: 80,
            height: 80,
            borderRadius: 200,
        },
        profileTopContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
        },
        profileDataContainer: {
            width: '100%',
            flex: 2.5,
            justifyContent: 'center',
        },
        profileExtraDataContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            textAlign: isLtr ? 'left' : 'right',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        profileDataText: {
            color: THEME_CONFIG[THEME].text,
            textAlign: isLtr ? 'left' : 'right',
        },
        profileUsernameContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        editButtonText: {
            color: THEME_CONFIG[THEME].text,
        },
        profileUsername: {
            fontSize: 20,
            textAlign: isLtr ? 'left' : 'right',
        },
        profileCreatedat: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            fontSize: themeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
        },
        profileRole: {
            fontSize: 14,
            textAlign: isLtr ? 'left' : 'right',
        },
        editFormContainer: {
            paddingBottom: 100,
        },
    });
};

export const HomeStyles = () => {
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    return StyleSheet.create({
        cardListContainer: {
            marginHorizontal: themeVariables.paddingS,
        },
        cardImageContainer: {
            borderRadius: 30,
            height: 200,
            width: '100%',
        },
        cardContainer: {
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: themeVariables.paddingS,
            marginVertical: themeVariables.paddingM,
            borderRadius: 30,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            textAlign: isLtr ? 'left' : 'right',
        },
        cardContentContainer: {
            position: 'absolute',
            bottom: 0,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingHorizontal: themeVariables.paddingM,
            paddingVertical: themeVariables.paddingS,
            width: '100%',
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: THEME_CONFIG[THEME].cardBackground,
        },
        innerShadowContainer: {
            borderRadius: 30,
        },
        cardTitleContainer: {
            paddingHorizontal: themeVariables.paddingM,
            flexDirection: 'column',
            width: '90%',
        },
        cardCreatorContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
        },
        postTitle: {
            fontSize: themeVariables.fontSizeL,
            fontWeight: '600',
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].titleLight,
        },
        cardProfileImage: {
            width: 30,
            height: 30,
            borderRadius: 30,
        },
        postCreator: {
            fontSize: themeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].titleLight,
        },
        postDate: {
            fontSize: themeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].titleLight,
        },
        creatPostButton: {
            width: '40%',
        },
    });
};

export const CoreStyles = (props = null) => {
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isDetached = props != null ? (props.detached ? true : false) : false;
    const isLtr = sessionLang == 'en';

    return StyleSheet.create({
        app: {
            width: '100%',
            height: '100%',
            flex: 1,
            backgroundColor: THEME_CONFIG[THEME].background,
            direction: isLtr ? 'ltr' : 'rtl',
        },
        splashContainer: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: '#6cc5cf',
            alignItems: 'center',
            justifyContent: 'center',
        },
        splashImage: {
            width: 150,
            height: 150,
        },
        screeenContainer: {
            direction: 'inherit',
            flex: 1,
            justifyContent: 'center',
            backgroundColor: THEME_CONFIG[THEME].background,
        },
        settingsItemContainer: {
            paddingVertical: themeVariables.paddingS,
            borderBottomWidth: 1,
            borderBottomColor: THEME_CONFIG[THEME].screenBorder,
        },
        settingsItemTitle: {
            alignSelf: 'center',
            color: THEME_CONFIG[THEME].text,
        },
        settingsItemBtnContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            padding: themeVariables.paddingM,
        },
        settingsItemBtnContentContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        settingsItemBtn: {
            borderRadius: 30,
        },
        bottomSheetContainer: {
            backgroundColor: THEME_CONFIG[THEME].background,
            marginHorizontal: isDetached ? 24 : null,
            borderRadius: 30,
        },
        bottomSheetContent: {
            margin: isDetached ? 22 : 30,
            marginTop: isDetached ? 18 : 30,
            marginHorizontal: isDetached ? 30 : null,
        },
        bottomSheetIndicator: {
            height: isDetached ? 0 : 5,
            backgroundColor: THEME_CONFIG[THEME].secondaryDarkFaint,
            opacity: isDetached ? 0 : 1,
        },
        buttonSolid: {
            fontWeight: 900,
            alignItems: 'center',
            borderRadius: 50,
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
        },
        buttonOutline: {
            fontWeight: 900,
            alignItems: 'center',
            borderRadius: 50,
            borderWidth: 2,
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
        },
        buttonText: {
            fontSize: 14,
            fontWeight: 'bold',
        },
        bottomSheetScrollView: {
            height: 300,
        },
        icon: {
            marginHorizontal: themeVariables.paddingM,
        },
        navButtonContainer: {
            flex: 1,
            textAlign: isLtr ? 'left' : 'right',
            justifyContent: 'center',
            alignItems: 'center',
        },
        navProfileContainer: {
            flex: 1,
            flexDirection: isLtr ? 'row' : 'row-reverse',
            textAlign: isLtr ? 'left' : 'right',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        profileImageContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
        },
        profileUsername: {
            fontSize: themeVariables.fontSizeM,
            color: THEME_CONFIG[THEME].text,
            paddingHorizontal: 10,
            alignSelf: 'center',
            textAlign: isLtr ? 'right' : 'left',
        },
        profileImage: {
            height: 30,
            width: 30,
            borderRadius: 50,
        },
        profileNavTitle: {
            flex: 3,
            fontSize: themeVariables.fontSizeXL,
            fontWeight: '500',
            color: THEME_CONFIG[THEME].text,
            textAlign: isLtr ? 'left' : 'right',
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
            backgroundColor: THEME_CONFIG[THEME].headerAltColor,
        },
        postImage: {
            width: '100%',
            height: 200,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
        },
        postTitle: {
            fontSize: 24,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        postTitleDetailsContainer: {
            paddingVertical: themeVariables.paddingM,
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
        },
        postDetailsContainer: {
            paddingHorizontal: themeVariables.paddingL,
        },
        postCreator: {
            fontSize: themeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        postDate: {
            fontSize: themeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        postDescriptions: {
            fontSize: themeVariables.fontSizeL,
            borderTopWidth: 1,
            borderTopColor: THEME_CONFIG[THEME].borderColor,
            paddingVertical: themeVariables.paddingM,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        postHeaderContainer: {
            height: 300,
            width: '100%',
            paddingTop: themeVariables.paddingXXL,
            overflow: 'hidden',
        },
        postHeaderTitleContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            textAlign: isLtr ? 'left' : 'right',
            justifyContent: 'space-between',
            backgroundColor: THEME_CONFIG[THEME].navHeaderBackground,
            margin: themeVariables.paddingM,
            paddingVertical: themeVariables.paddingM,
            paddingHorizontal: themeVariables.paddingS,
            borderRadius: 30,
        },
        postHeaderBottomPadding:{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 15,
            backgroundColor: THEME_CONFIG[THEME].background,

        },
        postHeaderTitle: {
            flex: 4,
            fontSize: themeVariables.fontSizeXL,
            fontWeight: '500',
            color: THEME_CONFIG[THEME].text,
            textAlign: isLtr ? 'left' : 'right',
        },
        postHeaderbackIcon: {
            color: THEME_CONFIG[THEME].text,
            fontSize: 24,
            paddingHorizontal: themeVariables.paddingM,
            textAlign: isLtr ? 'left' : 'right',
        },
        createPostIconAnimation: {
            position: 'absolute',
            zIndex: 10,
            borderRadius: 200,
        },
        createPostIconContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            borderRadius: 200,
            width: 60,
            height: 60,
            backgroundColor: THEME_CONFIG[THEME].primary,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        backTopBtnContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            borderRadius: 200,
            paddingHorizontal: 16,
            paddingVertical: themeVariables.paddingS,
            backgroundColor: THEME_CONFIG[THEME].primary,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        backTopIconContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            alignItems: 'center',
        },
        backToptext: {
            color: THEME_CONFIG[THEME].titleLight,
            fontWeight: '600',
        },
        createPostIcon: {
            fontSize: 24,
            color: THEME_CONFIG[THEME].titleLight,
        },
        editIconContainer: {
            position: 'absolute',
            top: 5,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            borderRadius: 200,
            padding: themeVariables.paddingS,
            backgroundColor: THEME_CONFIG[THEME].cardBackground,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        editIcon: {
            fontSize: 24,
            color: THEME_CONFIG[THEME].titleLight,
        },
        editMenuContainer: {
            borderRadius: 30,
            paddingVertical: themeVariables.paddingM,
            paddingHorizontal: themeVariables.paddingM,
        },
        editMenuIconContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            alignItems: 'center',
        },
        editMenuIcon: {
            fontSize: 28,
            color: THEME_CONFIG[THEME].primary,
        },
        editMenutext: {
            fontSize: themeVariables.fontSizeL,
            paddingHorizontal: themeVariables.paddingM,
            color: THEME_CONFIG[THEME].text,
        },
        inputContainer: {
            width: '100%',
            position: 'relative',
            flexDirection: isLtr ? 'row' : 'row-reverse',
            textAlign: isLtr ? 'left' : 'right',
            alignItems: 'flex-start',
            borderRadius: 30,
            borderWidth: 2,
            marginTop: 10,
            padding: 3,
            paddingLeft: 20,
            paddingRight: 20,
        },
        input: {
            width: '95%',
            textAlign: isLtr ? 'left' : 'right',
        },
        multilineInput: {
            height: 150,
            paddingVertical: 10,
            alignSelf: 'flex-start',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
        },
        icon: {
            with: '100%',
            alignSelf: 'center',
            alignItems: 'center',
            alignContent: 'center',
        },
        error: {
            position: 'absolute',
            bottom: 8,
            fontSize: themeVariables.fontSizeM,
            paddingHorizontal: themeVariables.paddingXL,
        },
        submitButtonDouble: {
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: isLtr ? 'row' : 'row-reverse',
            marginTop: 20,
        },
        profilePickerButton: {
            width: 170,
            height: 170,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 300,
            borderStyle: 'dashed',
            borderWidth: 2,
            marginTop: 10,
            padding: themeVariables.paddingXXL,
            overflow: 'hidden',
            borderColor: THEME_CONFIG[THEME].borderColor,
            backgroundColor: THEME_CONFIG[THEME].inputBackgroundColor,
        },
        assetPickerButton: {
            width: '100%',
            height: 125,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            borderStyle: 'dashed',
            borderWidth: 2,
            marginTop: 10,
            overflow: 'hidden',
            borderColor: THEME_CONFIG[THEME].borderColor,
            backgroundColor: THEME_CONFIG[THEME].inputBackgroundColor,
        },
        assetPickerText: {
            fontSize: themeVariables.fontSizeL,
            fontWeight: '600',
            textAlign: isLtr ? 'left' : 'right',
            marginHorizontal: themeVariables.paddingM,
            color: THEME_CONFIG[THEME].extra,
        },
        assetPickerTextContainer: {
            opacity: 0.8,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: isLtr ? 'row' : 'row-reverse',
        },
        assetPickerTextEmptyContainer: {
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: isLtr ? 'row' : 'row-reverse',
        },
        assetImageContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 125,
            width: '100%',
        },
        profileEditImageContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: themeVariables.paddingXXL,
            height: 170,
            width: 170,
        },
        clearButton: {
            opacity: 0.8,
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            color: THEME_CONFIG[THEME].extra,
            fontSize: themeVariables.fontSizeM,
            width: '120%',
            fontWeight: '900',
            borderRadius: 30,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            marginHorizontal: themeVariables.paddingM,
            paddingVertical: 8,
            paddingHorizontal: themeVariables.paddingM,
        },
    });
};

export const AuthStyles = () => {
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

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
            textAlign: 'center',
            fontSize: 34,
            fontWeight: 'bold',
        },
        subtitleText: {
            color: THEME_CONFIG[THEME].titleLight,
            textAlign: 'center',
            fontSize: 34,
            fontWeight: 'bold',
        },
        backgroundImage: {
            position: 'absolute',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
            height: '100%',
        },
        logo: {
            width: 100,
            height: 150,
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
        SheetContainer: {
            paddingBottom: 100,
            backgroundColor: THEME_CONFIG[THEME].background,
        },
        bottomSheetTitle: {
            fontSize: themeVariables.fontSizeXL,
            textAlign: 'center',
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
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    return StyleSheet.create({
        alertContainer: {
            marginHorizontal: themeVariables.paddingXL,
        },
        alertMessageTitle: {
            fontSize: themeVariables.fontSizeXL,
            alignSelf: 'center',
            textAlign: 'center',
            color: THEME_CONFIG[THEME].text,
        },
        alertMessage: {
            marginTop: 20,
            fontSize: themeVariables.fontSizeL,
            textAlign: 'center',
            color: THEME_CONFIG[THEME].text,
        },
        alertButtonContainer: {
            marginTop: themeVariables.paddingXL,
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-evenly',
        },
        alertButton: {
            borderRadius: 30,
            justifyContent: 'center',
            textAlign: isLtr ? 'right' : 'left',
        },
        alertButtonText: {
            fontSize: themeVariables.fontSizeL,
            textAlign: 'center',
            color: THEME_CONFIG[THEME].primary,
        },
    });
};

export const LangStyles = () => {
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    return StyleSheet.create({
        langListContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
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
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    return StyleSheet.create({
        themeContainer: {
            paddingVertical: themeVariables.paddingM,
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
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            padding: themeVariables.paddingM,
        },
        themeBtnContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    });
};
