import React, {useCallback, useMemo} from 'react';
import {StatusBar, View, Platform, StyleSheet} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {themeSelector} from '../theme';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const THEME_CONFIG = require('../theme/themes.json');
const langJson = require('../shared/lang/en.json');

const BottomSheetContent = props => {
  const THEME = themeSelector();
  const sheetRef = props.sheetRef;
  const componentRef = props.componentRef;
  const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const handleSheetChange = useCallback(index => {}, []);
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
    <View
      style={styles.container}>
      <BottomSheetModal
        backgroundStyle={[
          styles.BottomSheetContent,
          {backgroundColor: THEME_CONFIG[THEME].background},
        ]}
        handleIndicatorStyle={[{backgroundColor: THEME_CONFIG[THEME].extra}]}
        ref={sheetRef}
        index={0}
        enableDismissOnClose={true}
        // containerOffset={100}
        keyboardBehavior="interactive"
        keyboardBlurBehavior='restore'
        // backdropComponent={renderBackdrop}
        onChange={handleSheetChange}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose={true}>
        <BottomSheetView onLayout={handleContentLayout}>
          {componentRef}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

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

export default BottomSheetContent;
