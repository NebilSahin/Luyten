import {StyleSheet} from 'react-native';
import {themeSelector} from '..';
import {useSelector} from 'react-redux';
import {ThemeVariables} from '../../shared/Constant'

const THEME_CONFIG = require('../themes.json');

export const SettingsStyles = () => {
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

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

