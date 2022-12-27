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
import {CoreStyles, LangStyles} from '../../theme/Styles';
import {ModalPopUp} from '../../components/BottomModal';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {themeSelector} from '../../theme';

const THEME_CONFIG = require('../../theme/themes.json');

export const langFileSelector = () => {
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    if (sessionLang == LANGUAGE.en.code) {
        return LANG_CONFIG_EN;
    } else if (sessionLang == LANGUAGE.ar.code) {
        return LANG_CONFIG_AR;
    }
};

const LangList = props => {
    const dispatch = useDispatch();
    const LANG_STYLE = LangStyles(props);
    const LANG = langFileSelector();
    const THEME = themeSelector();

    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const [checkBoxState, setCheckBoxState] = useState(
        LANGUAGE_CODE_LIST.map((item, index) => ({
            [item]: sessionLang == item ? true : false,
        })),
    );
    const toggleCheckBox = (langIndex, langName) => {
        if (sessionLang != checkBoxState[langIndex][langName]) {
            dispatch(sessionUserLangAction(langName));
        }
        const updatedCheckBoxState = LANGUAGE_CODE_LIST.map((item, index) => ({
            [item]: langIndex == index ? true : false,
        }));
        setCheckBoxState(updatedCheckBoxState);
    };

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
    const LANG = langFileSelector();
    const THEME = themeSelector();

    const CORE_STYLE = CoreStyles(props);
    const sheetRef = useRef(null);
    const handleSnapPress = useCallback(() => {
        sheetRef.current?.present();
    }, []);

    return (
        <>
            <View style={CORE_STYLE.settingsItemContainer}>
                <Button
                    style={CORE_STYLE.settingsItemBtn}
                    buttonStyle="none"
                    buttonTheme="noneThemeButton"
                    onPress={handleSnapPress}>
                    <View style={CORE_STYLE.settingsItemBtnContainer}>
                        <Text style={CORE_STYLE.settingsItemTitle}>
                            {LANG.profile.changeLang}
                        </Text>
                        <View
                            style={CORE_STYLE.settingsItemBtnContentContainer}>
                            <Text style={[CORE_STYLE.settingsItemTitle, , {marginHorizontal: 6}]}>
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
                componentRef={<LangList />}
                sheetRef={sheetRef}
            />
        </>
    );
};
