import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, ActivityIndicator} from 'react-native';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeToggleElement} from '../../theme';
import {themeSelector} from '../../theme';
import {LangChangeElement} from '../../shared/lang';
import {request} from '../../shared/Api';
import ProfileDetails from './components/ProfileDetails';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {langFileSelector} from '../../shared/lang';
import Settings from './components/Settings';
import MyPosts from './components/MyPosts';
import {CoreStyles, ProfileStyles} from '../../theme/Styles';
import {useIsFocused} from '@react-navigation/native';
import {sessionUserProfileAction} from '../../redux/actions/UserActions';

const THEME_CONFIG = require('../../theme/themes.json');
const TabNav = createMaterialTopTabNavigator();

const ProfileTabs = () => {
    const LANG = langFileSelector();
    const PROFILE_STYLE = ProfileStyles();
    return (
        <TabNav.Navigator screenOptions={PROFILE_STYLE.profileTopTab}>
            <TabNav.Screen name={LANG.navScreens.myPosts} component={MyPosts} />
            <TabNav.Screen
                name={LANG.navScreens.settings}
                component={Settings}
            />
        </TabNav.Navigator>
    );
};

const Profile = props => {
    const userProfile = useSelector(state => state.sessionUser.userProfile);
    const userToken = useSelector(state => state.sessionUser.accessToken);
    const PROFILE_STYLE = ProfileStyles(props);
    const dispatch = useDispatch();

    useEffect(() => {
        request
            .get('/user/profile', {
                headers: {
                    Authorization: userToken
                        ? 'Bearer ' + userToken
                        : '',
                },
            })
            .then(function (response) {
                dispatch(sessionUserProfileAction(response.data));
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }, []);

    return (
        <>
            {userProfile ? (
                <View style={PROFILE_STYLE.profileContainer}>
                    <View style={PROFILE_STYLE.profileDetailsContainer}>
                        <ProfileDetails />
                    </View>
                    <View style={{flex: 4}}>
                        <ProfileTabs />
                    </View>
                </View>
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
        </>
    );
};

export default Profile;
