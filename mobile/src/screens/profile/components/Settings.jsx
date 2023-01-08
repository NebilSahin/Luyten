import React, {useRef, useCallback} from 'react';
import {Text, View} from 'react-native';
import {ThemeToggleElement} from '../../../theme';
import Button from '../../../components/Button';
import {langFileSelector, LangChangeElement} from '../../../shared/lang';
import {useDispatch} from 'react-redux';
import {ProfileStyles, SettingsStyles} from '../../../theme/Styles';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {themeSelector} from '../../../theme';
import BottomModal, {ModalPopUp} from '../../../components/BottomModal';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import THEME_CONFIG from '../../../theme/themes.json';

//logout popup modal content
const Logout = () => {
    //redux state data selector
    const LANG = langFileSelector();
    const THEME = themeSelector();

    //redux dispatcer
    const dispatch = useDispatch();

    //bottom sheet dismiss function
    const {dismissAll} = useBottomSheetModal();

    //render
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
    //styles
    const PROFILE_STYLE = ProfileStyles();
    const SETTINGS_STYLE = SettingsStyles();

    //redux state data selector
    const LANG = langFileSelector();
    const THEME = themeSelector();

    //ref
    const sheetRef = useRef(null);

    //bottom sheet handler
    const handleSnapPress = useCallback(() => {
        sheetRef.current?.present();
    }, []);

    //render
    return (
        <View style={PROFILE_STYLE.profileTabContainer}>
            <ThemeToggleElement />
            <LangChangeElement />
            <View style={SETTINGS_STYLE.settingsItemContainer}>
                <Button
                    customeStyle={SETTINGS_STYLE.settingsItemBtn}
                    buttonStyle="none"
                    buttonTheme="noneThemeButton"
                    onPress={handleSnapPress}>
                    <View style={SETTINGS_STYLE.settingsItemBtnContainer}>
                        <Text style={SETTINGS_STYLE.settingsItemTitle}>
                            {LANG.authScreen.logout}
                        </Text>
                        <View
                            style={SETTINGS_STYLE.settingsItemBtnContentContainer}>
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
                component={<Logout />}
                sheetRef={sheetRef}
            />
        </View>
    );
};

export default Settings;
