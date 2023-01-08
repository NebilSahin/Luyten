import {StyleSheet} from 'react-native';
import {themeSelector} from '../../theme';
import {useSelector} from 'react-redux';
import {ThemeVariables} from '../../shared/Constant';
import THEME_CONFIG from'../../theme/themes.json';

export const ThemeStyles = () => {
    //redux stored lang and theme 
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    //return stylesheet
    return StyleSheet.create({
        themeContainer: {
            paddingVertical: ThemeVariables.paddingM,
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
            padding: ThemeVariables.paddingM,
        },
        themeBtnContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    });
};

