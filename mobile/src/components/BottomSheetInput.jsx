import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {THEME} from '../shared/Constant';
import {useSelector} from 'react-redux';
import {requestFrame} from 'react-native-reanimated/lib/reanimated2/core';
import {themeSelector} from '../theme';

const THEME_CONFIG = require('../theme/themes.json');

const BottomSheetInputComponent = props => {
  const THEME = themeSelector();
  const styles = StyleSheet.create({
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 50,
      borderColor: THEME_CONFIG[THEME].borderColor,
      backgroundColor: THEME_CONFIG[THEME].inputBackgroundColor,
      borderWidth: 1,
      marginTop: 10,
      padding: 3,
      paddingLeft: 20,
      paddingRight: 20,
    },
    input:{
      width: '95%',
      color: THEME_CONFIG[THEME].text
    },
    icon: {
      with: '100%',
      alignItems: 'flex-end',
      alignContent: 'flex-end',
    },
  });
  return (
    <View style={styles.inputContainer}>
      <BottomSheetTextInput
        maxLength={40}
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor={THEME_CONFIG[THEME].extra}
        cursorColor={props.cursorColor}
        keyboardAppearance={props.keyboardAppearance}
        autoCorrect={props.autoCorrect}
        textContentType={props.textContentType}
        secureTextEntry={props.secureTextEntry}
      />
      <View style={styles.icon}>{props.icon}</View>
    </View>
  );
};

export default  BottomSheetInputComponent;