import React, {Component, useRef, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native';
import {persistor, store} from './redux/AppStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNav from './navigation';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {themeSelector} from './theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Splash} from './screens/splash';
import {CoreStyles} from './theme/Styles';

export const THEME_CONFIG = require('./theme/themes.json');

const AppContainer = props => {
    const THEME = themeSelector();
    const CORE_STYLE = CoreStyles(props);

    return (
        <NavigationContainer
            theme={THEME === 'dark' ? DarkTheme : DefaultTheme}>
            <Splash>
                <View
                    onLayout={async () => {
                        await SystemNavigationBar.setBarMode(
                            THEME_CONFIG[THEME].opposite,
                            'status ',
                        );
                    }}
                    style={CORE_STYLE.app}>
                    <AppNav />
                </View>
            </Splash>
        </NavigationContainer>
    );
};

export default App = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <GestureHandlerRootView style={{flex: 1}}>
                    <PersistGate loading={null} persistor={persistor}>
                        <BottomSheetModalProvider>
                            <AppContainer />
                        </BottomSheetModalProvider>
                    </PersistGate>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </Provider>
    );
};
