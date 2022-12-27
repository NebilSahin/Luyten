import React, {Component} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {THEME} from '../shared/Constant';
import {useSelector} from 'react-redux';

const THEME_CONFIG = require('../theme/themes.json');

const themeSelector = () => {
  const sessionTheme = useSelector(
    state => state.themeSelector.darkThemeEnabled,
  );
  return sessionTheme ? THEME.LIGHT : THEME.DARK;
};

const InputComponent = (props) => {
  const THEME = themeSelector();
  const styles = StyleSheet.create({
    inputContainer: {
      borderRadius: 50,
      borderColor: THEME_CONFIG[THEME].extra,
      borderWidth: 1,
      marginTop: 10,
      padding: 2,
      paddingLeft: 20,
      paddingRight: 20,
    },
    input: {
      color: THEME_CONFIG[THEME].test,
    },
  });
  return (
    <View style={styles.inputContainer}>
      <TextInput
        maxLength={40}
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor={THEME_CONFIG[THEME].extra}
        cursorColor={props.cursorColor}
        keyboardAppearance={props.keyboardAppearance}
        textContentType={props.textContentType}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

export default class Input extends Component {
  render() {
    return <InputComponent {...this.props} />;
  }
}
