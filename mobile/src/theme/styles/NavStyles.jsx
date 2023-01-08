import {StyleSheet} from 'react-native';
import {themeSelector} from '../../theme';
import {useSelector} from 'react-redux';
import {ThemeVariables} from '../../shared/Constant';
import THEME_CONFIG from '../../theme/themes.json';

export const NavStyles = () => {
    //redux stored lang and theme
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    //return stylesheet
    return StyleSheet.create({
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
        navProfileTitle: {
            flex: 3,
            fontSize: ThemeVariables.fontSizeXL,
            fontWeight: '500',
            color: THEME_CONFIG[THEME].text,
            textAlign: isLtr ? 'left' : 'right',
        },
        navProfileImageContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
        },
        navProfileUsername: {
            fontSize: ThemeVariables.fontSizeM,
            color: THEME_CONFIG[THEME].text,
            paddingHorizontal: 10,
            alignSelf: 'center',
            textAlign: isLtr ? 'right' : 'left',
        },
        navProfileImage: {
            height: 30,
            width: 30,
            borderRadius: 50,
        },
        navPostHeaderContainer: {
            height: 300,
            width: '100%',
            paddingTop: ThemeVariables.paddingXXL,
            overflow: 'hidden',
        },
        navPostHeaderTitleContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            textAlign: isLtr ? 'left' : 'right',
            justifyContent: 'space-between',
            backgroundColor: THEME_CONFIG[THEME].navHeaderBackground,
            margin: ThemeVariables.paddingM,
            paddingVertical: ThemeVariables.paddingM,
            paddingHorizontal: ThemeVariables.paddingS,
            borderRadius: 30,
        },
        navPostHeaderBottomPadding: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 15,
            backgroundColor: THEME_CONFIG[THEME].background,
        },
        navPostHeaderTitle: {
            flex: 4,
            fontSize: ThemeVariables.fontSizeXL,
            fontWeight: '500',
            color: THEME_CONFIG[THEME].text,
            textAlign: isLtr ? 'left' : 'right',
        },
        navPostHeaderbackIcon: {
            color: THEME_CONFIG[THEME].text,
            fontSize: 24,
            paddingHorizontal: ThemeVariables.paddingM,
            textAlign: isLtr ? 'left' : 'right',
        },
    });
};
