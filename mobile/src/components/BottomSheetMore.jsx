import React, {useCallback, useMemo, useRef, Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {THEME} from '../shared/Constant';
import {useSelector} from 'react-redux';
import Button from './Button';
import { useFocusEffect } from '@react-navigation/native';

const THEME_CONFIG = require('../theme/themes.json');
const langJson = require('../shared/lang/en.json');

const themeSelector = () => {
  const sessionTheme = useSelector(
    state => state.themeSelector.darkThemeEnabled,
  );
  return sessionTheme ? THEME.LIGHT : THEME.DARK;
};

const BottomSheetContent = props => {
  const THEME = themeSelector();
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() =>  [ 'CONTENT_HEIGHT'], []);
  const handleSheetChange = useCallback(index => {}, []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.present();
  }, []);
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);
  return (
    <View style={styles.container}>
      <BottomSheetModal
        backgroundStyle={[
          styles.BottomSheetContent,
          {backgroundColor: THEME_CONFIG[THEME].background},
        ]}
        handleIndicatorStyle={[{backgroundColor: THEME_CONFIG[THEME].extra}]}
        ref={sheetRef}
        index={0}
        keyboardBehavior="interactive"
        // snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChange}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose={true}>
        <BottomSheetView  onLayout={handleContentLayout}>
          {props.children}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default class BottomSheet extends Component {
  render() {
    return <BottomSheetContent {...this.props} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  BottomSheetContent: {
    borderRadius: 30,
  },
});
