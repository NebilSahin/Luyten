import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {themeSelector} from '../theme';
import {CoreStyles} from '../theme/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {langFileSelector} from '../shared/lang';
import Button from '../components/Button';
const THEME_CONFIG = require('../theme/themes.json');

//renders a button for picken assets
const AssetPickerButton = props => {
    //styles
    const CORE_STYLE = CoreStyles();

    //redux data selectors
    const THEME = themeSelector();
    const LANG = langFileSelector();

    //render
    return (
        <TouchableHighlight
            style={CORE_STYLE.assetPickerButton}
            underlayColor={
                THEME_CONFIG[THEME][props.buttonTheme].backgroundFocusColor
            }
            {...props}>
            {props.text != '' ? (
                <>
                    <View style={CORE_STYLE.assetPickerTextContainer}>
                        <Icon
                            name="image-multiple"
                            size={20}
                            color={THEME_CONFIG[THEME].primary}
                        />
                        <Text
                            style={[
                                CORE_STYLE.assetPickerText,
                                {
                                    fontSize: 14,
                                    fontWeight: '400',
                                    color: THEME_CONFIG[THEME].extra,
                                },
                            ]}>
                            {props.text}
                        </Text>
                    </View>
                    <Button
                        text={LANG.core.clear}
                        buttonStyle="clearButton"
                        buttonTheme="noneThemeButton"
                        onPress={() => {
                            props.clear();
                        }}
                    />
                </>
            ) : (
                <View style={CORE_STYLE.assetPickerTextContainer}>
                    <Text style={CORE_STYLE.assetPickerText}>
                        {LANG.core.assetPicker}
                    </Text>
                    <Icon
                        name="image-multiple"
                        size={40}
                        color={THEME_CONFIG[THEME].extra}
                    />
                </View>
            )}
        </TouchableHighlight>
    );
};

export default AssetPickerButton;
