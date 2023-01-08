import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {request} from '../../shared/Api';
import ProfileDetails from './components/ProfileDetails';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {langFileSelector} from '../../shared/lang';
import Settings from './components/Settings';
import MyPosts from './components/MyPosts';
import {CoreStyles, ProfileStyles} from '../../theme/Styles';
import {sessionUserProfileAction} from '../../redux/actions/UserActions';
import {useIsFocused} from '@react-navigation/native';

const TabNav = createMaterialTopTabNavigator();

const ProfileTabs = () => {
    //styles
    const PROFILE_STYLE = ProfileStyles();

    //redux state data selector
    const LANG = langFileSelector();

    //render
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
    //styles
    const CORE_STYLE = CoreStyles(props);
    const PROFILE_STYLE = ProfileStyles(props);

    //redux data selectors
    const userProfile = useSelector(state => state.sessionUser.userProfile);
    const userToken = useSelector(state => state.sessionUser.accessToken);

    //redux data dispatcher
    const dispatch = useDispatch();

    //functions
    const isFocused = useIsFocused();

    //effects
    useEffect(() => {
        request
            .get('/user/profile', {
                headers: {
                    Authorization: userToken ? 'Bearer ' + userToken : '',
                },
            })
            .then(function (response) {
                dispatch(sessionUserProfileAction(response.data));
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }, []);

    //render
    return (
        <>
            {userProfile && isFocused ? (
                <View style={PROFILE_STYLE.profileContainer}>
                    <View style={PROFILE_STYLE.profileDetailsContainer}>
                        <ProfileDetails />
                    </View>
                    <View style={{flex: 4}}>
                        <ProfileTabs />
                    </View>
                </View>
            ) : (
                <View style={CORE_STYLE.loadingIndicator}>
                    <ActivityIndicator size="large" color={CORE_STYLE.loadingIndicator.color} />
                </View>
            )}
        </>
    );
};

export default Profile;
