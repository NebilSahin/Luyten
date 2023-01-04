import React, {useState} from 'react';
import {Text, TouchableHighlight} from 'react-native';
import {themeSelector} from '../theme';
import {CoreStyles} from '../theme/Styles';
const THEME_CONFIG = require('../theme/themes.json');

//custome button from a preset of themes defined in Themes.json
const CustomButton = props => {
    //styles
    const CORE_STYLE = CoreStyles(props);

    //redux data selector
    const THEME = themeSelector();

    //state variables
    const [color, setColor] = useState(
        THEME_CONFIG[THEME][props.buttonTheme].textColor,
    );

    //render
    return (
        <TouchableHighlight
            style={[
                CORE_STYLE[props.buttonStyle],
                {
                    backgroundColor:
                        THEME_CONFIG[THEME][props.buttonTheme].backgroundColor,
                    borderColor:
                        THEME_CONFIG[THEME][props.buttonTheme].borderColor,
                },
                props.customeStyle ? props.customeStyle : {},
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
                <Text
                    style={[
                        CORE_STYLE.buttonText,
                        {
                            color: color,
                        },
                    ]}>
                    {props.text}
                </Text>
            ) : (
                props.children
            )}
        </TouchableHighlight>
    );
};

export default CustomButton;
