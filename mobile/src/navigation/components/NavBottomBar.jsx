import React, {useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import Home from '../../screens/home';
import Search from '../../screens/search';
import Profile from '../../screens/profile';
import * as Animatable from 'react-native-animatable';
import {themeSelector} from '../../theme';
import {langFileSelector} from '../../shared/lang';
import NavHeader from './NavHeader';
import {NavStyles} from '../../theme/Styles';

const THEME_CONFIG = require('../../theme/themes.json');
const BottomBar = createBottomTabNavigator();

//all screen of te app with teir icons
const AppScreens = [
    {
        route: 'Home',
        label: 'home',
        activeIcon: 'home-variant',
        inActiveIcon: 'home-variant-outline',
        component: Home,
    },
    {
        route: 'Search',
        label: 'search',
        activeIcon: 'feature-search',
        inActiveIcon: 'feature-search-outline',
        component: Search,
    },
    {
        route: 'Notification',
        label: 'notification',
        activeIcon: 'bell',
        inActiveIcon: 'bell-outline',
        component: Search,
    },
    {
        route: 'Profile',
        label: 'profile',
        activeIcon: 'account-box',
        inActiveIcon: 'account-box-outline',
        component: Profile,
    },
];

const TabButton = props => {
    //styles
    const NAV_STYLE = NavStyles(props);

    //redux state data selector
    const THEME = themeSelector();

    //state variables
    const {item, onPress, accessibilityState} = props;
    const focused = accessibilityState.selected;

    //ref
    const viewRef = useRef(null);

    //effects
    useEffect(() => {
        if (focused) {
            viewRef.current.animate({
                0: {scale: 2},
                0.2: {scale: 2.8},
                1: {scale: 2.5},
            });
        } else {
            viewRef.current.animate({0: {scale: 2.5}, 1: {scale: 2}});
        }
    }, [focused]);

    //render
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={NAV_STYLE.navButtonContainer}>
            <Animatable.View
                ref={viewRef}
                duration={600}
                style={NAV_STYLE.navButtonContainer}>
                <Icon
                    name={focused ? item.activeIcon : item.inActiveIcon}
                    color={
                        focused
                            ? THEME_CONFIG[THEME].primary
                            : THEME_CONFIG[THEME].secondaryDarkFaint
                    }
                />
            </Animatable.View>
        </TouchableOpacity>
    );
};

export const NavBottomBar = () => {
    //redux state data selector
    const LANG = langFileSelector();
    const THEME = themeSelector();

    //render
    return (
        <BottomBar.Navigator
            initialRouteName="home"
            screenOptions={{
                headerShown: true,
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: THEME_CONFIG[THEME].screenBorder,
                    elevation: 0,
                    backgroundColor: THEME_CONFIG[THEME].background,
                },
                headerBackgroundContainerStyle: {
                    borderBottomWidth: 1,
                    borderBottomColor: THEME_CONFIG[THEME].screenBorder,
                    backgroundColor: THEME_CONFIG[THEME].background,
                },
                headerStyle: {
                    elevation: 0,
                    backgroundColor: THEME_CONFIG[THEME].background,
                },
                headerTitleStyle: {
                    color: THEME_CONFIG[THEME].text,
                },
                headerTitle: props => <NavHeader {...props} />,
            }}>
            {AppScreens.map((item, index) => {
                return (
                    <BottomBar.Screen
                        key={index}
                        name={LANG.core[item.label]}
                        component={item.component}
                        options={{
                            tabBarButton: props => (
                                <TabButton {...props} item={item} />
                            ),
                        }}
                    />
                );
            })}
        </BottomBar.Navigator>
    );
};

export default NavBottomBar;
