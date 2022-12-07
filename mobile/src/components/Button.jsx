import React, {useState, Component} from 'react';
import {Text, TouchableHighlight, StyleSheet, View} from 'react-native';
import {THEME} from '../shared/Constant';
import {useSelector} from 'react-redux';
import {themeSelector} from '../theme';

const THEME_CONFIG = require('../theme/themes.json');

const ButtonContent = props => {
  const THEME = themeSelector();
  const [color, setColor] = useState(
    THEME_CONFIG[THEME][props.buttonTheme].onHideUnderlay,
  );
  const styles = StyleSheet.create({
    buttonPrimary: {
      alignItems: 'center',
      backgroundColor: THEME_CONFIG[THEME][props.buttonTheme].color,
      borderRadius: 50,
      padding: 15,
      paddingLeft: 20,
      paddingRight: 20,
    },
    buttonSecondary: {
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: THEME_CONFIG[THEME][props.buttonTheme].color,
      // borderColor: THEME_CONFIG[THEME].extra,
      // borderWidth: 2,
      marginTop: 40,
      padding: 15,
      paddingLeft: 20,
      paddingRight: 20,
    },
    buttonSecondaryOutline: {
      alignItems: 'center',
      borderRadius: 50,
      // backgroundColor: THEME_CONFIG[THEME][props.buttonTheme].color,
      borderColor: THEME_CONFIG[THEME][props.buttonTheme].color,
      borderWidth: 2,
      marginTop: 40,
      padding: 15,
      paddingLeft: 20,
      paddingRight: 20,
    },
    buttonPrimaryOutline: {
      alignItems: 'center',
      borderRadius: 50,
      // backgroundColor: THEME_CONFIG[THEME].extra,
      borderColor: THEME_CONFIG[THEME][props.buttonTheme].color,
      borderWidth: 2,
      marginTop: 40,
      padding: 15,
      paddingLeft: 20,
      paddingRight: 20,
    },
    buttonExtra: {
      alignItems: 'center',
      borderRadius: 50,
      // backgroundColor: THEME_CONFIG[THEME].extra,
      borderColor: THEME_CONFIG[THEME][props.buttonTheme].color,
      borderWidth: 2,
      marginTop: 40,
      padding: 15,
      paddingLeft: 20,
      paddingRight: 20,
    },
  });
  return (
    <TouchableHighlight
      onPress={props.onPress}
      onShowUnderlay={() =>
        setColor(THEME_CONFIG[THEME][props.buttonTheme].onShowUnderlay)
      }
      onHideUnderlay={() =>
        setColor(THEME_CONFIG[THEME][props.buttonTheme].onHideUnderlay)
      }
      style={[styles[props.buttonTheme], props.styles]}
      underlayColor={THEME_CONFIG[THEME][props.buttonTheme].underlayColor}>
      <View>
        <Text style={{color: color}}>{props.text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default class Button extends Component {
  render() {
    return <ButtonContent {...this.props} />;
  }
}
