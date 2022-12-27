import React, {useRef, useCallback} from 'react';
import {Text, View} from 'react-native';
import {ThemeToggleElement} from '../../../theme';
import Button from '../../../components/Button';
import {langFileSelector, LangChangeElement} from '../../../shared/lang';
import {useDispatch} from 'react-redux';
import {ProfileStyles, CoreStyles} from '../../../theme/Styles';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {themeSelector} from '../../../theme';
import BottomModal, {ModalPopUp} from '../../../components/BottomModal';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';

const THEME_CONFIG = require('../../../theme/themes.json');

const Logout = () => {
    const LANG = langFileSelector();
    const dispatch = useDispatch();
    const {dismissAll} = useBottomSheetModal();
    const THEME = themeSelector();

    return (
        <ModalPopUp
            modalTitle={LANG.profile.logoutMessage}
            actionMessage={LANG.authScreen.logout}
            actionStyle={{color: THEME_CONFIG[THEME].error.textColor}}
            action={() => {
                dispatch({type: 'user/sessionActiveState'});
                dismissAll();
            }}></ModalPopUp>
    );
};
const Settings = props => {
    const LANG = langFileSelector();
    const PROFILE_STYLE = ProfileStyles();
    const CORE_STYLE = CoreStyles(props);
    const THEME = themeSelector();
    const sheetRef = useRef(null);
    const handleSnapPress = useCallback(() => {
        sheetRef.current?.present();
    }, []);

    return (
        <View style={PROFILE_STYLE.profileTabContainer}>
            <ThemeToggleElement />
            <LangChangeElement />
            <View style={CORE_STYLE.settingsItemContainer}>
                <Button
                    styles={CORE_STYLE.settingsItemBtn}
                    buttonStyle="none"
                    buttonTheme="noneThemeButton"
                    onPress={handleSnapPress}>
                    <View style={CORE_STYLE.settingsItemBtnContainer}>
                        <Text style={CORE_STYLE.settingsItemTitle}>
                            {LANG.authScreen.logout}
                        </Text>
                        <View
                            style={CORE_STYLE.settingsItemBtnContentContainer}>
                            <MCIIcon
                                size={24}
                                color={THEME_CONFIG[THEME].error.textColor}
                                name="logout-variant"
                            />
                        </View>
                    </View>
                </Button>
            </View>
            <BottomModal
                detached={true}
                componentRef={<Logout />}
                sheetRef={sheetRef}
            />
        </View>
    );
};

export default Settings;
