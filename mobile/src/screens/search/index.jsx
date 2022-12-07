import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {themeSelector} from '../../theme';
const THEME_CONFIG = require('../../theme/themes.json');

const Search = () => {
  const THEME = themeSelector();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: THEME_CONFIG[THEME].screenBackground},
      ]}></View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Search;
