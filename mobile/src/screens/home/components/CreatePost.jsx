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
import {AuthStyles, CoreStyles, PostStyles} from '../../../theme/Styles';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import THEME_CONFIG from'../../../theme/themes.json';

const CreatePost = ({refreshData}) => {
    //styles
    const HOME_STYLE = PostStyles();
    const AUTH_STYLE = AuthStyles();
    const CORE_STYLE = CoreStyles();

    //functions
    const {dismiss} = useBottomSheetModal();
    const sheetRef = useRef(null);

    //redux data selectors
    const THEME = themeSelector();
    const LANG = langFileSelector();
    const userToken = useSelector(state => state.sessionUser.accessToken);

    //state variables
    const [message, setMessage] = useState('');
    const [asset, setAsset] = useState(null);
    const [postForm, setPostForm] = useState({
        title: null,
        description: null,
        post_image: null,
    });

    //form
    const formData = new FormData();

    //clear image path
    const clearImage = () => {
        setPostForm({...postForm, post_image: null});
        setAsset(null);
    };

    //handle creating post request
    const handlePost = () => {
        Keyboard.dismiss();
        if (postForm.title) {
            formData.append('title', postForm.title);
            formData.append('description', postForm.description);
            asset
                ? formData.append('post_image', {
                      uri: asset.uri,
                      name: asset.fileName,
                      type: asset.type,
                  })
                : null;
            request
                .post('/posts', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: userToken ? 'Bearer ' + userToken : '',
                    },
                })
                .then(function (response) {
                    dismiss();
                    refreshData();
                })
                .catch(function (error) {
                    if (!error.response) {
                        setMessage(LANG.authScreen.pleaseTryLater);
                        sheetRef.current?.present();
                    }
                });
        }
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
            <View style={AUTH_STYLE.SheetContainer}>
                <Text style={AUTH_STYLE.bottomSheetTitle}>
                    {LANG.post.createPostTitle}
                </Text>
                <BottomSheetInput
                    maxLength={40}
                    error={postForm.title == ''}
                    errorMessage={LANG.post.titleError}
                    placeholder={LANG.post.postTitleField}
                    cursorColor={
                        postForm.title == ''
                            ? THEME_CONFIG[THEME].error.textColor
                            : THEME_CONFIG[THEME].primary
                    }
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    value={postForm.title}
                    onChangeText={value =>
                        setPostForm(postForm => ({
                            ...postForm,
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
                    placeholder={LANG.post.postDescriptionField}
                    cursorColor={THEME_CONFIG[THEME].primary}
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    value={postForm.description}
                    onChangeText={value =>
                        setPostForm(postForm => ({
                            ...postForm,
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
                    style={CORE_STYLE.assetPickerButton}
                    imageURI={asset ? asset.uri : postForm.post_image}
                    clear={clearImage}
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
                        text={LANG.post.createButton}
                        buttonStyle="buttonSolid"
                        buttonTheme={
                            postForm.title == ''
                                ? 'buttonDisabled'
                                : 'buttonPrimary'
                        }
                        onPress={
                            postForm.title == null || postForm.title == ''
                                ? () => {
                                      setPostForm(postForm => ({
                                          ...postForm,
                                          title: '',
                                      }));
                                  }
                                : () => {
                                      handlePost();
                                  }
                        }
                    />
                </View>
            </View>
            <BottomModal
                detached={true}
                component={<AlertPopUp message={message} />}
                sheetRef={sheetRef}
            />
        </>
    );
};

export default CreatePost;
