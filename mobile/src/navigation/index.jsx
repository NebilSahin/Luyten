import React, {useEffect, useRef, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
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
import {ProfileStyles, AuthStyles, CoreStyles} from '../theme/Styles';
import {langFileSelector} from '../shared/lang';
import PostDetails from '../screens/home/components/PostDetails';
import {BaseStorageURL} from '../shared/Constant';

const THEME_CONFIG = require('../theme/themes.json');
const profileImgPlacholder = require('../../assets/profile-image.png');

const AppStack = createStackNavigator();
const BottomBar = createBottomTabNavigator();

const TabArr = [
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
    const {item, onPress, accessibilityState} = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const THEME = themeSelector();
    const CORE_STYLE = CoreStyles(props);

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

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={CORE_STYLE.navButtonContainer}>
            <Animatable.View
                ref={viewRef}
                duration={600}
                style={CORE_STYLE.navButtonContainer}>
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

const HeaderComponent = props => {
    const userProfile = useSelector(state => state.sessionUser.userProfile);
    const CORE_STYLE = CoreStyles(props);
    const navigation = useNavigation();
    const LANG = langFileSelector();

    return (
        <View style={CORE_STYLE.navProfileContainer}>
            <Text style={CORE_STYLE.profileNavTitle}>{props.children}</Text>
            <TouchableOpacity
                style={CORE_STYLE.profileImageContainer}
                onPress={() => navigation.navigate(LANG.core['profile'])}>
                <Text style={CORE_STYLE.profileUsername}>
                    {userProfile.user.username}
                </Text>
                <Image
                    style={CORE_STYLE.profileImage}
                    source={
                        userProfile.user.profile_image != '' &&
                        userProfile.user.profile_image != null
                            ? {
                                  uri:
                                      BaseStorageURL +
                                      userProfile.user.profile_image,
                              }
                            : profileImgPlacholder
                    }
                />
            </TouchableOpacity>
        </View>
    );
};

const HeaderPost = props => {
    const CORE_STYLE = CoreStyles(props);
    const navigation = useNavigation();
    const sessionLang = useSelector(state => state.sessionUser.userLang);

    return (
        <ImageBackground
            style={CORE_STYLE.postHeaderContainer}
            source={
                props.route.params.post.post_image != '' &&
                props.route.params.post.post_image != null
                    ? {uri: BaseStorageURL + props.route.params.post.post_image}
                    : require('../../assets/post-placeholder.png')
            }>
            <View style={CORE_STYLE.postHeaderTitleContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                        name={
                            sessionLang == 'en' ? 'arrow-left' : 'arrow-right'
                        }
                        style={CORE_STYLE.postHeaderbackIcon}
                    />
                </TouchableOpacity>
                <Text style={CORE_STYLE.postHeaderTitle}>
                    {props.route.name}
                </Text>
            </View>
            <View style={CORE_STYLE.postHeaderBottomPadding}></View>
        </ImageBackground>
    );
};

function BottomBarNav() {
    const LANG = langFileSelector();
    const THEME = themeSelector();
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
                headerTitle: props => <HeaderComponent {...props} />,
            }}>
            {TabArr.map((item, index) => {
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
}

function AppNav() {
    const sessionIsActive = useSelector(state => state.sessionUser.isActive);
    const THEME = themeSelector();
    const LANG = langFileSelector();

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
                        component={BottomBarNav}
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

                            headerTintColor: THEME_CONFIG[THEME].text,
                            tabBarStyle: {
                                borderTopWidth: 1,
                                borderTopColor:
                                    THEME_CONFIG[THEME].screenBorder,
                                elevation: 0,
                                backgroundColor: THEME_CONFIG[THEME].background,
                            },
                            headerStyle: {
                                elevation: 0,
                                backgroundColor:
                                    THEME_CONFIG[THEME].headerAltColor,
                            },
                            headerTitleStyle: {
                                fontSize: 18,
                                color: THEME_CONFIG[THEME].text,
                            },
                            headerTitle: props => (
                                <HeaderPostComponent {...props} />
                            ),
                            headerLeft: null,
                        }}>
                        <AppStack.Screen
                            name={LANG.core.postDetails}
                            component={PostDetails}
                            options={props => ({
                                header: () => <HeaderPost {...props} />,
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
