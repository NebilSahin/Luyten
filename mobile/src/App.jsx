import React, {useEffect} from 'react';
import {View, BackHandler} from 'react-native';
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
import {Splash} from './screens/splash';
import {CoreStyles} from './theme/Styles';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import THEME_CONFIG from './theme/themes.json';

const AppContainer = props => {
    //styles
    const CORE_STYLE = CoreStyles(props);

    //redux selectors
    const THEME = themeSelector();

    //bottom sheet dismiss
    const {dismissAll} = useBottomSheetModal();

    //effect to dismiss on back press
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            dismissAll,
        );
        return () => backHandler.remove();
    }, []);

    //render
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

//rendering some essential componenets for base app
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
