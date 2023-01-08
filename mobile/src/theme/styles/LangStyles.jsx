import {StyleSheet} from 'react-native';
import {themeSelector} from '../../theme';
import {useSelector} from 'react-redux';
import THEME_CONFIG from '../../theme/themes.json';

export const LangStyles = () => {
    //redux stored lang and theme
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    //return stylesheet
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
