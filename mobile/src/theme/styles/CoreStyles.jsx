import {StyleSheet} from 'react-native';
import {themeSelector} from '../../theme';
import {useSelector} from 'react-redux';
import {ThemeVariables} from '../../shared/Constant'

const THEME_CONFIG = require('../../theme/themes.json');

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
        loadingIndicator: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            color: THEME_CONFIG[THEME].primary,
            backgroundColor: THEME_CONFIG[THEME].background,
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
            marginHorizontal: ThemeVariables.paddingM,
        },

        backTopBtnContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            borderRadius: 200,
            paddingHorizontal: 16,
            paddingVertical: ThemeVariables.paddingS,
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
        editIconContainer: {
            position: 'absolute',
            top: 5,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            borderRadius: 200,
            padding: ThemeVariables.paddingS,
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
        toggleViewContainer: {
            paddingTop: ThemeVariables.paddingM,
            paddingHorizontal: ThemeVariables.paddingL,

            flexDirection: isLtr ? 'row-reverse' : 'row',
            alignItems: 'center',
        },
        gridIcon: {
            paddingHorizontal: ThemeVariables.paddingS,
            fontSize: ThemeVariables.fontSizeXXXL,
        },
        listIcon: {
            fontSize: ThemeVariables.fontSizeXXXL,
        },
        editMenuContainer: {
            borderRadius: 30,
            paddingVertical: ThemeVariables.paddingM,
            paddingHorizontal: ThemeVariables.paddingM,
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
            fontSize: ThemeVariables.fontSizeL,
            paddingHorizontal: ThemeVariables.paddingM,
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
            fontSize: ThemeVariables.fontSizeM,
            paddingHorizontal: ThemeVariables.paddingXL,
        },
        submitButtonDouble: {
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: isLtr ? 'row' : 'row-reverse',
            marginTop: 20,
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
            fontSize: ThemeVariables.fontSizeL,
            fontWeight: '600',
            textAlign: isLtr ? 'left' : 'right',
            marginHorizontal: ThemeVariables.paddingM,
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
        clearButton: {
            opacity: 0.8,
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            color: THEME_CONFIG[THEME].extra,
            fontSize: ThemeVariables.fontSizeM,
            width: '120%',
            fontWeight: '900',
            borderRadius: 30,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            marginHorizontal: ThemeVariables.paddingM,
            paddingVertical: 8,
            paddingHorizontal: ThemeVariables.paddingM,
        },
    });
};