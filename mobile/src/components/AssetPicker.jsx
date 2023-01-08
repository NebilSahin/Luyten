import React from 'react';
import {ImageBackground, Text, TouchableHighlight, View} from 'react-native';
import {themeSelector} from '../theme';
import {CoreStyles, PostStyles} from '../theme/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {langFileSelector} from '../shared/lang';
import Button from '../components/Button';
import THEME_CONFIG from'../theme/themes.json';

//renders a button for picken assets
const AssetPickerButton = props => {
    //styles
    const CORE_STYLE = CoreStyles();
    const HOME_STYLE = PostStyles();

    //redux data selectors
    const THEME = themeSelector();
    const LANG = langFileSelector();

    //render
    return (
        <TouchableHighlight
            underlayColor={
                THEME_CONFIG[THEME][props.buttonTheme].backgroundFocusColor
            }
            {...props}>
            {props.imageURI ? (
                <ImageBackground
                    style={[CORE_STYLE.assetImageContainer, props.customeStyle]}
                    resizeMode="cover"
                    imageStyle={{opacity: 0.4}}
                    source={{
                        uri: props.imageURI,
                    }}>
                    <View style={CORE_STYLE.assetPickerTextContainer}>
                        <Text
                            style={[
                                CORE_STYLE.assetPickerText,
                                {color: THEME_CONFIG[THEME].text},
                            ]}>
                            {LANG.core.assetChangeImage}
                        </Text>
                        <Icon
                            name="image-multiple"
                            size={40}
                            color={THEME_CONFIG[THEME].text}
                        />
                    </View>
                    <Button
                        text={LANG.core.clear}
                        customeStyle={CORE_STYLE.clearButton}
                        buttonStyle="buttonSolid"
                        buttonTheme="noneThemeButton"
                        onPress={() => {
                            props.clear();
                        }}
                    />
                </ImageBackground>
            ) : (
                <View style={CORE_STYLE.assetPickerTextEmptyContainer}>
                    <Text style={CORE_STYLE.assetPickerText}>
                        {LANG.core.assetPickImage}
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
