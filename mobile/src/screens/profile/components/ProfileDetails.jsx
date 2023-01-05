import React, {useRef, useState} from 'react';
import {Text, View, Image, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    ProfileStyles,
    AuthStyles,
    AlertStyles,
    CoreStyles,
} from '../../../theme/Styles';
import {langFileSelector} from '../../../shared/lang';
import Button from '../../../components/Button';
import BottomModal, {
    ModalPopUp,
} from '../../../components/BottomModal';
import BottomSheetInput from '../../../components/BottomSheetInput';
import {themeSelector} from '../../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {request} from '../../../shared/Api';
import {sessionUserProfileAction} from '../../../redux/actions/UserActions';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import AssetPicker from '../../../components/AssetPicker';
import {launchImageLibrary} from 'react-native-image-picker';
import {BaseStorageURL} from '../../../shared/Constant';

const profileImgPlacholder = require('../../../../assets/profile-image.png');
const THEME_CONFIG = require('../../../theme/themes.json');

const EditProfileForm = ({bottomSheet}) => {
    //styles
    const AUTH_STYLE = AuthStyles();
    const ALERT_STYLE = AlertStyles();
    const PROFILE_STYLE = ProfileStyles();
    const CORE_STYLE = CoreStyles();

    //redux selectors and data dispatcher
    const LANG = langFileSelector();
    const THEME = themeSelector();
    const userProfile = useSelector(state => state.sessionUser.userProfile);
    const userToken = useSelector(state => state.sessionUser.accessToken);
    const dispatch = useDispatch();

    //dismissing the bottom sheet function
    const {dismiss} = useBottomSheetModal();

    //state variables
    const [message, setMessage] = useState('');
    const [asset, setAsset] = useState(null);
    const [editForm, setEditForm] = useState({
        username: userProfile.user.username,
        email: userProfile.user.email,
        profile_image: userProfile.user.profile_image
            ? BaseStorageURL + userProfile.user.profile_image
            : null,
    });

    //variables
    let requestData = {};

    //ref
    const sheetRef = useRef(null);

    //form
    const formData = new FormData();
    formData.append('_method', 'PUT');

    //clear image path
    const clearImage = () => {
        setEditForm({...editForm, profile_image: null});
        setAsset(null);
    };

    //handle asset picking
    const handleAssetPicker = () => {
        launchImageLibrary(
            {mediaType: 'photo', selectionLimit: 1},
            response => {
                setAsset(response.assets ? response.assets[0] : null);
            },
        );
    };

    //handling the update request and show the popup modal with the appropiate error message
    const handleUpdate = () => {
        Keyboard.dismiss();
        formData.append('username', editForm.username);
        formData.append('email', editForm.email);
        if (asset) {
            formData.append('profile_image', {
                uri: asset.uri,
                name: asset.fileName,
                type: asset.type,
            });
        } else if (!editForm.profile_image) {
            request
                .post('/user/delete-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: userToken ? 'Bearer ' + userToken : '',
                    },
                })
                .then(function (response) {
                    // console.log(response);
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
        request
            .post('/user/update-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: userToken ? 'Bearer ' + userToken : '',
                },
            })
            .then(function (response) {
                dismiss(bottomSheet);
                dispatch(sessionUserProfileAction(response.data));
                setMessage(LANG.profile.updatedAlert);
                sheetRef.current?.present();
            })
            .catch(function (error) {
                console.log(error.response);
                if (error.response) {
                    setMessage(LANG.authScreen.pleaseTryLater);
                    sheetRef.current?.present();
                }
            });
    };
    return (
        <>
            <View style={PROFILE_STYLE.editFormContainer}>
                <Text style={AUTH_STYLE.bottomSheetTitle}>
                    {LANG.profile.updateProfile}
                </Text>
                <AssetPicker
                    style={PROFILE_STYLE.profilePickerButton}
                    customeStyle={PROFILE_STYLE.profileEditImageContainer}
                    imageURI={asset ? asset.uri : editForm.profile_image}
                    clear={clearImage}
                    buttonStyle="buttonSolid"
                    buttonTheme="noneThemeButton"
                    onPress={() => {
                        handleAssetPicker();
                    }}
                />
                <BottomSheetInput
                    maxLength={40}
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
                    maxLength={40}
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
                    customeStyle={AUTH_STYLE.submitButton}
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
                                  handleUpdate();
                              }
                    }
                />
            </View>
            <BottomModal
                detached={true}
                component={
                    <ModalPopUp modalTitle={LANG.core.alert}>
                        <Text style={ALERT_STYLE.alertMessage}>{message}</Text>
                    </ModalPopUp>
                }
                sheetRef={sheetRef}
            />
        </>
    );
};

const ProfileDetails = () => {
    const PROFILE_STYLE = ProfileStyles();
    const LANG = langFileSelector();
    const bottomRef = useRef(null);
    const userProfile = useSelector(state => state.sessionUser.userProfile);

    return (
        <>
            <View style={PROFILE_STYLE.profileTopContainer}>
                <View style={PROFILE_STYLE.profileImageContainer}>
                    <Image
                        style={PROFILE_STYLE.profileImage}
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
                            {userProfile.user.username}
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
                        {userProfile.user.email}
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
                                {userProfile.user.created_at}
                            </Text>
                        </View>
                        <Icon
                            size={16}
                            color={PROFILE_STYLE.profileDataText.color}
                            name={
                                userProfile.user.role == 'Admin'
                                    ? 'shield-crown'
                                    : 'shield-account'
                            }>
                            <Text
                                style={[
                                    PROFILE_STYLE.profileRole,
                                    PROFILE_STYLE.profileDataText,
                                ]}>
                                {userProfile.user.role == 'Admin'
                                    ? LANG.profile.admin
                                    : LANG.profile.user}
                            </Text>
                        </Icon>
                    </View>
                </View>
            </View>
            <BottomModal
                backdrop={true}
                component={<EditProfileForm bottomSheet={bottomRef} />}
                sheetRef={bottomRef}
            />
        </>
    );
};

export default ProfileDetails;
