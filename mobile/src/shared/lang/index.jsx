import React, {useState, useRef, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Switch, StyleSheet} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import LANG_CONFIG_EN from './en.json';
import LANG_CONFIG_AR from './ar.json';
import Button from '../../components/Button';
import BottomModal from '../../components/BottomModal';

export const langFileSelector = () => {
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    if (sessionLang == 'en') {
        return LANG_CONFIG_EN;
    } else if (sessionLang == 'ar') {
        return LANG_CONFIG_AR;
    }
};

const LangList = () => {
  return ;
}

export const LangChangeElement = () => {
    const LANG = langFileSelector();
    const dispatch = useDispatch();
    const sheetRef = useRef(null);
    const handleSnapPress = useCallback(() => {
        sheetRef.current?.present();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <Button
                    styles={styles.button}
                    text={LANG.authScreen.login}
                    buttonStyle="buttonSolid"
                    buttonTheme="buttonPrimary"
                    onPress={handleSnapPress}
                />
            </View>
            <BottomModal
                detached={true}
                componentRef={
                    <Button
                        styles={styles.button}
                        text={'wafw'}
                        buttonStyle="buttonSolid"
                        buttonTheme="buttonPrimary"
                    />
                }
                sheetRef={sheetRef}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
