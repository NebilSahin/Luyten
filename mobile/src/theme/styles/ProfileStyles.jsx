import {StyleSheet} from 'react-native';
import {themeSelector} from '../../theme';
import {useSelector} from 'react-redux';
import {ThemeVariables} from '../../shared/Constant'

const THEME_CONFIG = require('../../theme/themes.json');

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
            paddingHorizontal: ThemeVariables.paddingM,
            paddingVertical: ThemeVariables.paddingM,
        },
        profileDetailsContainer: {
            paddingHorizontal: ThemeVariables.paddingXXL,
            paddingVertical: ThemeVariables.paddingXL,
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
            fontSize: ThemeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
        },
        profileRole: {
            fontSize: 14,
            textAlign: isLtr ? 'left' : 'right',
        },
        editFormContainer: {
            paddingBottom: 100,
        },
        profileEditImageContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: ThemeVariables.paddingXXL,
            height: 170,
            width: 170,
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
            padding: ThemeVariables.paddingXXL,
            overflow: 'hidden',
            borderColor: THEME_CONFIG[THEME].borderColor,
            backgroundColor: THEME_CONFIG[THEME].inputBackgroundColor,
        },
    });
};
