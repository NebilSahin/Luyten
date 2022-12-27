import React, {useState, Component} from 'react';
import {Text, TouchableHighlight, StyleSheet, View} from 'react-native';
import {themeSelector} from '../theme';
import {CoreStyles} from '../theme/Styles';
const THEME_CONFIG = require('../theme/themes.json');

//custome button that has preset of themes to choss from defined in Themes.json
const CustomButton = props => {
    const THEME = themeSelector();
    const CORE_STYLE = CoreStyles(props);
    const [color, setColor] = useState(
        THEME_CONFIG[THEME][props.buttonTheme].textColor,
    );
    return (
        <TouchableHighlight
            style={[
                CORE_STYLE[props.buttonStyle],
                props.styles,
                {
                    backgroundColor:
                        THEME_CONFIG[THEME][props.buttonTheme].backgroundColor,
                    borderColor:
                        THEME_CONFIG[THEME][props.buttonTheme].borderColor,
                },
            ]}
            onShowUnderlay={() =>
                setColor(THEME_CONFIG[THEME][props.buttonTheme].textFocusColor)
            }
            onHideUnderlay={() =>
                setColor(THEME_CONFIG[THEME][props.buttonTheme].textColor)
            }
            underlayColor={
                THEME_CONFIG[THEME][props.buttonTheme].backgroundFocusColor
            }
            {...props}>
            {props.text ? (
                <Text style={{color: color, fontSize: CORE_STYLE[props.buttonStyle].fontSize}}>{props.text}</Text>
            ) : (
                props.children
            )}
        </TouchableHighlight>
    );
};

export default CustomButton;
