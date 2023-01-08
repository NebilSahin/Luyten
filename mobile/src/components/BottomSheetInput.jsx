import React, {useRef} from 'react';
import {TouchableWithoutFeedback, View, Text} from 'react-native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {themeSelector} from '../theme';
import {CoreStyles} from '../theme/Styles';
import THEME_CONFIG from'../theme/themes.json';

const BottomSheetInputComponent = props => {
    //styles
    const CORE_STYLE = CoreStyles();

    //redux data selector
    const THEME = themeSelector();

    //functions
    const INPUT = useRef(null);

    //render
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                INPUT.current.focus();
            }}>
            <View
                style={[
                    CORE_STYLE.inputContainer,
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
                    style={[
                        CORE_STYLE.input,
                        {
                            color: THEME_CONFIG[THEME].text,
                            bottom: props.error ? 8 : 0,
                        },
                    ]}
                    placeholderTextColor={THEME_CONFIG[THEME].extra}
                    {...props}
                />
                <View style={[CORE_STYLE.icon, props.customeStyle]}>
                    {props.icon}
                </View>
                {props.error ? (
                    <Text
                        style={[
                            CORE_STYLE.error,
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
