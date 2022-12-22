import React, {useRef, useState} from 'react';
import {Text, View, Image, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProfileStyles, AuthStyles} from '../../../theme/Styles';
import {langFileSelector} from '../../../shared/lang';
import Button from '../../../components/Button';
import BottomModal from '../../../components/BottomModal';
import BottomSheetInput from '../../../components/BottomSheetInput';
import {themeSelector} from '../../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {request} from '../../../shared/Api';

const profileImgPlacholder = require('../../../../assets/profile-image.png');
const THEME_CONFIG = require('../../../theme/themes.json');

const EditProfileForm = () => {
    const LANG = langFileSelector();
    const AUTH_STYLE = AuthStyles();
    const PROFILE_STYLE = ProfileStyles();

    const THEME = themeSelector();

    const [editForm, setEditForm] = useState({
        username: null,
        email: null,
    });

    const [message, setMessage] = useState('');
    const sheetRef = useRef(null);

    //handling the login request and show the popup modal with the appropiate error message
    const handleLogin = () => {
        Keyboard.dismiss();
        request
            .post('/login', {
                username: editForm.username,
                email: editForm.email,
            })
            .then(function (response) {
                if (response.data['access_token']) {
                    dismiss();
                    dispatch(
                        sessionAccessTokenAction(response.data['access_token']),
                    );
                    dispatch({type: 'user/sessionActiveState'});
                } else {
                    setMessage(LANG.authScreen.incorrectCredentials);
                    sheetRef.current?.present();
                }
            })
            .catch(function (error) {
                if (!error.response) {
                    setMessage(LANG.authScreen.pleaseTryLater);
                    sheetRef.current?.present();
                }
                setEditForm(editForm => ({
                    ...editForm,
                    username: '',
                    email: '',
                }));
            });
    };
    return (
        <View style={PROFILE_STYLE.editFormContainer}>
            <Text style={AUTH_STYLE.welcomeText}>
                {LANG.profile.updateProfile}
            </Text>
            <BottomSheetInput
                error={editForm.username == ''}
                errorMessage={LANG.authScreen.usernameError}
                placeholder={LANG.authScreen.usernameField}
                cursorColor={
                    editForm.username == ''
                        ? THEME_CONFIG[THEME].error.textColor
                        : THEME_CONFIG[THEME].primary
                }
                keyboardAppearance={THEME_CONFIG[THEME].theme}
                textContentType="username"
                value={editForm.username}
                onChangeText={value =>
                    setEditForm(editForm => ({
                        ...editForm,
                        username: value,
                    }))
                }
                icon={
                    <Icon
                        name="account"
                        size={22}
                        color={THEME_CONFIG[THEME].extra}
                    />
                }
            />
            <BottomSheetInput
                error={editForm.email == ''}
                errorMessage={LANG.authScreen.emailError}
                placeholder={LANG.authScreen.emailField}
                cursorColor={
                    editForm.email == ''
                        ? THEME_CONFIG[THEME].error.textColor
                        : THEME_CONFIG[THEME].primary
                }
                keyboardAppearance={THEME_CONFIG[THEME].theme}
                textContentType="email"
                value={editForm.email}
                onChangeText={value =>
                    setEditForm(editForm => ({
                        ...editForm,
                        email: value,
                    }))
                }
                icon={
                    <Icon
                        name="email"
                        size={22}
                        color={THEME_CONFIG[THEME].extra}
                    />
                }
            />
            <Button
                styles={AUTH_STYLE.submitButton}
                text={LANG.profile.update}
                buttonStyle="buttonSolid"
                buttonTheme={
                    editForm.username == '' || editForm.email == ''
                        ? 'buttonDisabled'
                        : 'buttonPrimary'
                }
                onPress={
                    editForm.username == '' || editForm.email == ''
                        ? null
                        : () => {
                              handleLogin();
                          }
                }
            />
        </View>
    );
};

const ProfileDetails = ({profileDetails}) => {
    const PROFILE_STYLE = ProfileStyles();
    const LANG = langFileSelector();
    const bottomRef = useRef(null);
    const dispatch = useDispatch();

    return (
        <>
            <View style={PROFILE_STYLE.profileTopContainer}>
                <View style={PROFILE_STYLE.profileImageContainer}>
                    <Image
                        style={PROFILE_STYLE.profileImage}
                        source={profileImgPlacholder}
                    />
                </View>
                <View style={PROFILE_STYLE.profileDataContainer}>
                    <View
                        style={[
                            PROFILE_STYLE.profileUsernameContainer,
                            PROFILE_STYLE.profileDataText,
                        ]}>
                        <Text
                            style={[
                                PROFILE_STYLE.profileUsername,
                                PROFILE_STYLE.profileDataText,
                            ]}>
                            {profileDetails.username}
                        </Text>
                        <Button
                            styles={PROFILE_STYLE.editButton}
                            buttonStyle="buttonSolid"
                            buttonTheme="noneThemeButton"
                            onPress={() => {
                                bottomRef.current?.present();
                            }}>
                            <Text style={PROFILE_STYLE.editButtonText}>
                                {LANG.profile.edit}
                            </Text>
                        </Button>
                    </View>

                    <Text style={[PROFILE_STYLE.profileDataText]}>
                        {profileDetails.email}
                    </Text>
                    <View style={PROFILE_STYLE.profileExtraDataContainer}>
                        <View
                            style={[
                                PROFILE_STYLE.profileCreatedat,
                                PROFILE_STYLE.profileDataText,
                            ]}>
                            <Text
                                style={[
                                    PROFILE_STYLE.profileCreatedat,
                                    PROFILE_STYLE.profileDataText,
                                ]}>
                                {LANG.profile.createdAt}
                            </Text>
                            <Text
                                style={[
                                    PROFILE_STYLE.profileCreatedat,
                                    PROFILE_STYLE.profileDataText,
                                ]}>
                                {profileDetails.created_at}
                            </Text>
                        </View>
                        <Icon
                            size={16}
                            color={PROFILE_STYLE.profileDataText.color}
                            name={
                                profileDetails.role == 'Admin'
                                    ? 'shield-crown'
                                    : 'shield-account'
                            }>
                            <Text
                                style={[
                                    PROFILE_STYLE.profileRole,
                                    PROFILE_STYLE.profileDataText,
                                ]}>
                                {profileDetails.role == 'Admin'
                                    ? LANG.profile.admin
                                    : LANG.profile.user}
                            </Text>
                        </Icon>
                    </View>
                </View>
            </View>
            <BottomModal
                backdrop={true}
                componentRef={<EditProfileForm />}
                sheetRef={bottomRef}
            />
        </>
    );
};

export default ProfileDetails;
