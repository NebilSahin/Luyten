import React, {useEffect, useRef, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import Home from '../screens/home';
import Search from '../screens/search';
import Profile from '../screens/profile';
import Auth from '../screens/auth';
import {THEME} from '../shared/Constant';
import * as Animatable from 'react-native-animatable';
import {themeSelector} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {NavStyles, CoreStyles, ProfileStyles} from '../theme/Styles';
import {langFileSelector} from '../shared/lang';
import PostDetails from '../screens/home/components/PostDetails';
import {BaseStorageURL} from '../shared/Constant';
import NavBottomBar from './components/NavBottomBar';
import NavPostHeader from './components/NavPostHeader';

const THEME_CONFIG = require('../theme/themes.json');
const AppStack = createStackNavigator();

function AppNav() {
    //redux state data
    const sessionIsActive = useSelector(state => state.sessionUser.isActive);
    const THEME = themeSelector();
    const LANG = langFileSelector();

    //render
    return (
        <AppStack.Navigator
            initialRouteName={sessionIsActive ? 'BarNav' : 'AuthNav'}
            screenOptions={{
                headerShown: false,
            }}>
            {sessionIsActive ? (
                <>
                    <AppStack.Screen
                        name="BarNav"
                        component={NavBottomBar}
                        options={{
                            animationTypeForReplace: sessionIsActive
                                ? 'pop'
                                : 'push',
                        }}
                    />
                    <AppStack.Group
                        screenOptions={{
                            animation: 'slide_from_right',
                            headerShown: true,
                        }}>
                        <AppStack.Screen
                            name={LANG.core.postDetails}
                            component={PostDetails}
                            options={props => ({
                                header: () => <NavPostHeader {...props} />,
                            })}
                        />
                    </AppStack.Group>
                </>
            ) : (
                <AppStack.Screen name="AuthNav" component={Auth} />
            )}
        </AppStack.Navigator>
    );
}

export default AppNav;
