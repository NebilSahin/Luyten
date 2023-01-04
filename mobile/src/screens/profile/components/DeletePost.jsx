import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Text, Keyboard, FlatList, Image, TouchableHighlight} from 'react-native';
import {
    AuthStyles,
    CoreStyles,
    HomeStyles,
    AlertStyles,
} from '../../../theme/Styles';
import {useSelector} from 'react-redux';
import {request} from '../../../shared/Api';
import {BaseStorageURL} from '../../../shared/Constant';
import {useNavigation} from '@react-navigation/native';
import {langFileSelector} from '../../../shared/lang';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import Button from '../../../components/Button';
import BottomModal, {ModalPopUp} from '../../../components/BottomModal';
import BackToTopButton from '../../../components/BackToTopButton';
import EditPost from '../components/EditPost';
import {themeSelector} from '../../../theme';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';

const profileImgPlacholder = require('../../../../assets/profile-image.png');
const THEME_CONFIG = require('../../../theme/themes.json');

export const DeletePost = ({refreshData, post}) => {
    //styles
    const ALERT_STYLE = AlertStyles();

    //redux selectors
    const THEME = themeSelector();
    const LANG = langFileSelector();
    const userToken = useSelector(state => state.sessionUser.accessToken);

    //modal dismiss function
    const {dismissAll} = useBottomSheetModal();

    //handle delete post request
    const handlePost = () => {
        Keyboard.dismiss();
        request
            .delete(`/posts/${post.id}`, {
                headers: {
                    Authorization: userToken ? 'Bearer ' + userToken : '',
                },
            })
            .then(function (response) {
                dismissAll();
                refreshData();
            })
            .catch(function (error) {
                if (!error.response) {
                    setMessage(LANG.authScreen.pleaseTryLater);
                    sheetRef.current?.present();
                }
                console.log(error.response.data);
            });
    };
    //render
    return (
        <ModalPopUp
            modalTitle={LANG.profile.logoutMessage}
            actionMessage={LANG.core.delete}
            actionStyle={{
                color: THEME_CONFIG[THEME].error.textColor,
            }}
            action={() => {
                handlePost();
            }}>
            <Text style={ALERT_STYLE.alertMessage}>
                {LANG.profile.deletePostMessage}
            </Text>
        </ModalPopUp>
    );
};

export default DeletePost;
