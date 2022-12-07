import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {themeSelector} from '../../theme';
const THEME_CONFIG = require('../../theme/themes.json');

const Home = () =>{
  const THEME = themeSelector();
    return (
      <View style={[styles.container, {backgroundColor: THEME_CONFIG[THEME].screenBackground}]}>
      </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})

export default Home