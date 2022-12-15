import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {THEME} from '../shared/Constant';
import {useSelector} from 'react-redux';
import {requestFrame} from 'react-native-reanimated/lib/reanimated2/core';
import {themeSelector} from '../theme';

const THEME_CONFIG = require('../theme/themes.json');

const BottomSheetInputComponent = props => {
    const THEME = themeSelector();
    return (
        <>
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: props.error
                            ? THEME_CONFIG[THEME].error.textColor
                            : THEME_CONFIG[THEME].borderColor,
                        backgroundColor: props.error
                            ? THEME_CONFIG[THEME].error.backgroundColor
                            : THEME_CONFIG[THEME].inputBackgroundColor,
                    },
                ]}>
                <BottomSheetTextInput
                    maxLength={40}
                    style={[styles.input, {color: THEME_CONFIG[THEME].text,}]}
                    placeholderTextColor={THEME_CONFIG[THEME].extra}
                    {...props}
                />
                <View style={styles.icon}>{props.icon}</View>
            </View>
            {props.error ? (
                <Text
                    style={[
                        styles.error,
                        {
                            color: THEME_CONFIG[THEME].error.textColor,
                            opacity: props.error ? 1 : 0,
                        },
                    ]}>
                    {props.errorMessage}
                </Text>
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        marginTop: 10,
        padding: 3,
        paddingLeft: 20,
        paddingRight: 20,
    },
    input: {
        width: '95%',
    },
    icon: {
        with: '100%',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
    },
    error: {
      fontSize: 12,
        paddingLeft: 20,
    },
});

export default BottomSheetInputComponent;
