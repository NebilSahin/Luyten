import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, TouchableOpacity, View, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NavStyles} from '../../theme/Styles';
import {BaseStorageURL} from '../../shared/Constant';

const postImgPlacholder = require('../../../assets/post-placeholder.png');

export const NavPostHeader = props => {
    const NAV_STYLE = NavStyles(props);
    const navigation = useNavigation();
    const sessionLang = useSelector(state => state.sessionUser.userLang);

    return (
        <ImageBackground
            style={NAV_STYLE.navPostHeaderContainer}
            source={
                props.route.params.post.post_image != '' &&
                props.route.params.post.post_image != null
                    ? {uri: BaseStorageURL + props.route.params.post.post_image}
                    : postImgPlacholder
            }>
            <View style={NAV_STYLE.navPostHeaderTitleContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                        name={
                            sessionLang == 'en' ? 'arrow-left' : 'arrow-right'
                        }
                        style={NAV_STYLE.navPostHeaderbackIcon}
                    />
                </TouchableOpacity>
                <Text style={NAV_STYLE.navPostHeaderTitle}>
                    {props.route.name}
                </Text>
            </View>
            <View style={NAV_STYLE.navPostHeaderBottomPadding}></View>
        </ImageBackground>
    );
};

export default NavPostHeader;
