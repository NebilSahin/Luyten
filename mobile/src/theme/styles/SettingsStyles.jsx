import {StyleSheet} from 'react-native';
import {themeSelector} from '..';
import {useSelector} from 'react-redux';
import {ThemeVariables} from '../../shared/Constant';
import THEME_CONFIG from '../themes.json';

export const SettingsStyles = () => {
    //redux stored lang and theme
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    //return stylesheet
    return StyleSheet.create({
        settingsItemContainer: {
            paddingVertical: ThemeVariables.paddingS,
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
            padding: ThemeVariables.paddingM,
        },
        settingsItemBtnContentContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        settingsItemBtn: {
            borderRadius: 30,
        },
    });
};
