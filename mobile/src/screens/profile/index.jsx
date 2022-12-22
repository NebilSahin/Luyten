import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, ActivityIndicator} from 'react-native';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {ThemeToggleElement} from '../../theme';
import {themeSelector} from '../../theme';
import {LangChangeElement} from '../../shared/lang';
import {request} from '../../shared/Api';
import {useSelector} from 'react-redux';
import ProfileDetails from './components/ProfileDetails';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {langFileSelector} from '../../shared/lang';
import Settings from './components/Settings';
import MyPosts from './components/MyPosts';
import {CoreStyles, ProfileStyles} from '../../theme/Styles';

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
    const THEME = themeSelector();
    const userToken = useSelector(state => state.sessionUser.userToken);
    const [profileDetails, setProfileDetails] = useState(null);
    const PROFILE_STYLE = ProfileStyles(props);

    useEffect(() => {
        request
            .get('/user/profile', {
                headers: {
                    Authorization: userToken ? 'Bearer ' + userToken : '',
                },
            })
            .then(function (response) {
                if (profileDetails == null) {
                    setProfileDetails(response.data.user);
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });

        request
            .get(
                `/roles/${
                    profileDetails ? profileDetails.role_identifier : '0'
                }`,
                {
                    headers: {
                        Authorization: userToken ? 'Bearer ' + userToken : '',
                    },
                },
            )
            .then(function (response) {
                if (profileDetails.role == null) {
                    setProfileDetails(profileDetails => ({
                        ...profileDetails,
                        role: response.data.data.title,
                    }));
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
    });

    return (
        <>
            {profileDetails ? (
                <View style={PROFILE_STYLE.profileContainer}>
                    <View style={PROFILE_STYLE.profileDetailsContainer}>
                        <ProfileDetails profileDetails={profileDetails} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    profileImageContainer: {},
    profileDataContainer: {},
    button: {
        marginTop: 20,
    },
});

export default Profile;
