import React, {useState, useRef} from 'react';
import {Text, Keyboard, View} from 'react-native';
import BottomSheetInput from '../../../components/BottomSheetInput';
import Button from '../../../components/Button';
import AssetPicker from '../../../components/AssetPicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {themeSelector} from '../../../theme';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {request} from '../../../shared/Api';
import {langFileSelector} from '../../../shared/lang';
import BottomModal, {AlertPopUp} from '../../../components/BottomModal';
import {AuthStyles, CoreStyles, HomeStyles} from '../../../theme/Styles';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
const THEME_CONFIG = require('../../../theme/themes.json');

const CreatePost = () => {
    //styles
    const HOME_STYLE = HomeStyles();
    const AUTH_STYLE = AuthStyles();
    const CORE_STYLE = CoreStyles();

    //hooks
    const {dismiss} = useBottomSheetModal();
    const sheetRef = useRef(null);

    //redux data selectors
    const THEME = themeSelector();
    const LANG = langFileSelector();
    const userToken = useSelector(state => state.sessionUser.accessToken);

    //state variables
    const [postForm, setPostForm] = useState({
        title: null,
        description: null,
        file_path: null,
    });
    const [message, setMessage] = useState('');
    const [asset, setAsset] = useState(null);

    //form
    const formData = new FormData();

    //handle creating post request
    const handlePost = () => {
        Keyboard.dismiss();
        formData.append('title', postForm.title);
        formData.append('description', postForm.description);
        formData.append('file_path', {
            uri: asset.uri,
            name: asset.fileName,
            type: asset.type,
        });

        request
            .post('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: userToken ? 'Bearer ' + userToken : '',
                },
            })
            .then(function (response) {
                dismiss();
                console.log(response.data);
            })
            .catch(function (error) {
                if (!error.response) {
                    setMessage(LANG.authScreen.pleaseTryLater);
                    sheetRef.current?.present();
                }
                console.log(error.response.data);

                // setPostForm(postForm => ({
                //     ...postForm,
                //     title: '',
                //     description: '',
                //     file_path: '',
                // }));
            });
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

    //render
    return (
        <>
            <View style={AUTH_STYLE.authSheetContainer}>
                <Text style={AUTH_STYLE.welcomeText}>
                    {LANG.home.createPostTitle}
                </Text>
                <BottomSheetInput
                    maxLength={40}
                    error={postForm.title == ''}
                    errorMessage={LANG.home.titleError}
                    placeholder={LANG.home.postTitleField}
                    cursorColor={
                        postForm.title == ''
                            ? THEME_CONFIG[THEME].error.textColor
                            : THEME_CONFIG[THEME].primary
                    }
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    value={postForm.title}
                    onChangeText={value =>
                        setPostForm(loginForm => ({
                            ...loginForm,
                            title: value,
                        }))
                    }
                    icon={
                        <Icon
                            name="format-title"
                            size={22}
                            color={THEME_CONFIG[THEME].extra}
                        />
                    }
                />
                <BottomSheetInput
                    multiline={true}
                    customeStyle={CORE_STYLE.multilineInput}
                    // error={postForm.description == ''}
                    // errorMessage={LANG.authScreen.passwordError}
                    placeholder={LANG.home.postDescriptionField}
                    cursorColor={
                        // postForm.description == ''
                        //     ? THEME_CONFIG[THEME].error.textColor
                        //     :
                        THEME_CONFIG[THEME].primary
                    }
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    value={postForm.description}
                    onChangeText={value =>
                        setPostForm(loginForm => ({
                            ...loginForm,
                            description: value,
                        }))
                    }
                    icon={
                        <Icon
                            name="file-document"
                            size={22}
                            color={THEME_CONFIG[THEME].extra}
                        />
                    }
                />
                <AssetPicker
                    text={asset ? asset.fileName : ''}
                    clear={setAsset}
                    buttonStyle="buttonSolid"
                    buttonTheme="noneThemeButton"
                    onPress={() => {
                        handleAssetPicker();
                    }}
                />
                <View style={CORE_STYLE.submitButtonDouble}>
                    <Button
                        customeStyle={HOME_STYLE.creatPostButton}
                        text={LANG.alert.cancel}
                        buttonStyle="buttonSolid"
                        buttonTheme={'buttonExtra'}
                        onPress={() => {
                            dismiss();
                        }}
                    />
                    <Button
                        customeStyle={HOME_STYLE.creatPostButton}
                        text={LANG.home.createButton}
                        buttonStyle="buttonSolid"
                        buttonTheme={
                            postForm.title == '' || postForm.description == ''
                                ? 'buttonDisabled'
                                : 'buttonPrimary'
                        }
                        onPress={
                            postForm.title == '' || postForm.description == ''
                                ? null
                                : () => {
                                      handlePost();
                                  }
                        }
                    />
                </View>
            </View>
            {/* <BottomModal
                detached={true}
                component={<AlertPopUp message={message} />}
                sheetRef={sheetRef}
            /> */}
        </>
    );
};

export default CreatePost;
