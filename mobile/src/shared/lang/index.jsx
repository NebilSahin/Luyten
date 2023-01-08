import React, {useState, useRef, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, ScrollView, Text} from 'react-native';
import LANG_CONFIG_EN from './en.json';
import LANG_CONFIG_AR from './ar.json';
import Button from '../../components/Button';
import BottomModal from '../../components/BottomModal';
import CheckBox from '@react-native-community/checkbox';
import {LANGUAGE_CODE_LIST, LANGUAGE} from '../Constant';
import {sessionUserLangAction} from '../../redux/actions/UserActions';
import {SettingsStyles, LangStyles} from '../../theme/Styles';
import {ModalPopUp} from '../../components/BottomModal';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {themeSelector} from '../../theme';
import THEME_CONFIG from'../../theme/themes.json';

export const langFileSelector = () => {
    //session redux stored lang
    const sessionLang = useSelector(state => state.sessionUser.userLang);

    //set the lang file to be returned
    if (sessionLang == LANGUAGE.en.code) {
        return LANG_CONFIG_EN;
    } else if (sessionLang == LANGUAGE.ar.code) {
        return LANG_CONFIG_AR;
    }
};

const LangList = props => {
    //styles
    const LANG_STYLE = LangStyles(props);

    //redux state data selector
    const LANG = langFileSelector();
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);

    //redux state data dispatcher
    const dispatch = useDispatch();

    //state variable
    const [checkBoxState, setCheckBoxState] = useState(
        LANGUAGE_CODE_LIST.map((item, index) => ({
            [item]: sessionLang == item ? true : false,
        })),
    );

    //toogle checkbox function
    const toggleCheckBox = (langIndex, langName) => {
        if (sessionLang != checkBoxState[langIndex][langName]) {
            dispatch(sessionUserLangAction(langName));
        }
        const updatedCheckBoxState = LANGUAGE_CODE_LIST.map((item, index) => ({
            [item]: langIndex == index ? true : false,
        }));
        setCheckBoxState(updatedCheckBoxState);
    };

    //render
    return (
        <ModalPopUp modalTitle={LANG.profile.changeLangModal}>
            <ScrollView>
                {LANGUAGE_CODE_LIST.map((item, index) => {
                    return (
                        <View style={LANG_STYLE.langListContainer} key={index}>
                            <Text style={LANG_STYLE.langTitle}>
                                {LANGUAGE[item].title}
                            </Text>
                            <CheckBox
                                tintColors={{true: THEME_CONFIG[THEME].primary, false: THEME_CONFIG[THEME].screenBorder}}
                                style={LANG_STYLE.langCheckBox}
                                disabled={false}
                                value={checkBoxState[index][item]}
                                onValueChange={() =>
                                    toggleCheckBox(index, item)
                                }
                            />
                        </View>
                    );
                })}
            </ScrollView>
        </ModalPopUp>
    );
};

export const LangChangeElement = props => {
    //styles
    const SETTINGS_STYLE = SettingsStyles(props);

    //redux state data selector
    const LANG = langFileSelector();
    const THEME = themeSelector();

    //ref
    const sheetRef = useRef(null);

    //functions
    const handleSnapPress = useCallback(() => {
        sheetRef.current?.present();
    }, []);

    //render
    return (
        <>
            <View style={SETTINGS_STYLE.settingsItemContainer}>
                <Button
                    style={SETTINGS_STYLE.settingsItemBtn}
                    buttonStyle="none"
                    buttonTheme="noneThemeButton"
                    onPress={handleSnapPress}>
                    <View style={SETTINGS_STYLE.settingsItemBtnContainer}>
                        <Text style={SETTINGS_STYLE.settingsItemTitle}>
                            {LANG.profile.changeLang}
                        </Text>
                        <View
                            style={SETTINGS_STYLE.settingsItemBtnContentContainer}>
                            <Text style={[SETTINGS_STYLE.settingsItemTitle, , {marginHorizontal: 6}]}>
                                {LANG.langTitle}
                            </Text>
                            <MCIIcon
                                size={22}
                                color={THEME_CONFIG[THEME].extra}
                                name="translate"
                            />
                        </View>
                    </View>
                </Button>
            </View>
            <BottomModal
                detached={true}
                component={<LangList />}
                sheetRef={sheetRef}
            />
        </>
    );
};
