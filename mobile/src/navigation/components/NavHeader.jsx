import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NavStyles} from '../../theme/Styles';
import {langFileSelector} from '../../shared/lang';
import {BaseStorageURL} from '../../shared/Constant';

const profileImgPlacholder = require('../../../assets/profile-image.png');

export const NavHeader = props => {
    //styles
    const NAV_STYLE = NavStyles(props);

    //data selector from redux state
    const userProfile = useSelector(state => state.sessionUser.userProfile);
    const LANG = langFileSelector();

    //navigattion hook
    const navigation = useNavigation();

    //render
    return (
        <View style={NAV_STYLE.navProfileContainer}>
            <Text style={NAV_STYLE.navProfileTitle}>{props.children}</Text>
            <TouchableOpacity
                style={NAV_STYLE.navProfileImageContainer}
                onPress={() => navigation.navigate(LANG.core['profile'])}>
                <Text style={NAV_STYLE.navProfileUsername}>
                    {userProfile.user.username}
                </Text>
                <Image
                    style={NAV_STYLE.navProfileImage}
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

export default NavHeader;
