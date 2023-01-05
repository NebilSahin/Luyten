import React, {} from 'react';
import {View} from 'react-native';
import {themeSelector} from '../../theme';
const THEME_CONFIG = require('../../theme/themes.json');

const Search = () => {
  const THEME = themeSelector();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: THEME_CONFIG[THEME].background},
      ]}></View>
  );
};


export default Search;
