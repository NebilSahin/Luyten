import {StyleSheet} from 'react-native';
import {themeSelector} from '../../theme';
import {useSelector} from 'react-redux';
import {ThemeVariables} from '../../shared/Constant';

import THEME_CONFIG from '../../theme/themes.json';

export const AlertStyles = () => {
    //redux stored lang and theme
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    //return stylesheet
    return StyleSheet.create({
        alertContainer: {
            marginHorizontal: ThemeVariables.paddingXL,
        },
        alertMessageTitle: {
            fontSize: ThemeVariables.fontSizeXL,
            alignSelf: 'center',
            textAlign: 'center',
            color: THEME_CONFIG[THEME].text,
        },
        alertMessage: {
            marginTop: 20,
            fontSize: ThemeVariables.fontSizeL,
            textAlign: 'center',
            color: THEME_CONFIG[THEME].text,
        },
        alertButtonContainer: {
            marginTop: ThemeVariables.paddingXL,
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-evenly',
        },
        alertButton: {
            borderRadius: 30,
            justifyContent: 'center',
            textAlign: isLtr ? 'right' : 'left',
        },
        alertButtonText: {
            fontSize: ThemeVariables.fontSizeL,
            textAlign: 'center',
            color: THEME_CONFIG[THEME].primary,
        },
    });
};
