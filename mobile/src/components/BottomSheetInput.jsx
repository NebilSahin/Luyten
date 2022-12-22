import React, {useRef} from 'react';
import {TouchableWithoutFeedback, View, Text} from 'react-native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {THEME} from '../shared/Constant';
import {useSelector} from 'react-redux';
import {requestFrame} from 'react-native-reanimated/lib/reanimated2/core';
import {themeSelector} from '../theme';
import {AuthStyles} from '../theme/Styles';

const THEME_CONFIG = require('../theme/themes.json');

const BottomSheetInputComponent = props => {
    const THEME = themeSelector();
    const AUTH_STYLE = AuthStyles();
    const INPUT = useRef(null);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                INPUT.current.focus();
            }}>
            <View
                style={[
                    AUTH_STYLE.inputContainer,
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
                    ref={INPUT}
                    maxLength={40}
                    style={[
                        AUTH_STYLE.input,
                        {
                            color: THEME_CONFIG[THEME].text,
                            bottom: props.error ? 8 : 0,
                        },
                    ]}
                    placeholderTextColor={THEME_CONFIG[THEME].extra}
                    {...props}
                />
                <View style={AUTH_STYLE.icon}>{props.icon}</View>
                {props.error ? (
                    <Text
                        style={[
                            AUTH_STYLE.error,
                            {
                                color: THEME_CONFIG[THEME].error.textColor,
                                opacity: props.error ? 1 : 0,
                            },
                        ]}>
                        {props.errorMessage}
                    </Text>
                ) : null}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default BottomSheetInputComponent;
