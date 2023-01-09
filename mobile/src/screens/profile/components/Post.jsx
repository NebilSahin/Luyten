import React, {useCallback} from 'react';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import {CoreStyles, PostStyles} from '../../../theme/Styles';
import {useSelector} from 'react-redux';
import {BaseStorageURL} from '../../../shared/Constant';
import {useNavigation} from '@react-navigation/native';
import {langFileSelector} from '../../../shared/lang';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../../components/Button';
import THEME_CONFIG from '../../../theme/themes.json';
import {themeSelector} from '../../../theme';

const profileImgPlacholder = require('../../../../assets/profile-image.png');
const postImgPlacholder = require('../../../../assets/post-placeholder.png');

const Post = ({post, sheetRef, setPostMenuData}) => {
    //styles
    const POST_STYLE = PostStyles();
    const CORE_STYLE = CoreStyles();

    //functions
    const navigation = useNavigation();

    //redux data
    const LANG = langFileSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const THEME = themeSelector();

    const createBtnDirection =
        sessionLang == 'en' ? {right: '3%'} : {left: '3%'};

    //callbacks
    const handleSnapPress = useCallback(index => {
        setPostMenuData(post);
        sheetRef.current?.present();
    }, []);

    //render
    return (
        <TouchableHighlight
            disabled={post.id == 0}
            style={[POST_STYLE.cardContainer, {opacity: post.id == 0 ? 0 : 1}]}
            onPress={() =>
                navigation.navigate(LANG.core.postDetails, {
                    itemId: post.id,
                    post: post,
                })
            }>
            <View>
                <Image
                    style={POST_STYLE.cardImageContainer}
                    source={
                        post.post_image != '' && post.post_image != null
                            ? {uri: BaseStorageURL + post.post_image}
                            : postImgPlacholder
                    }
                />
                <Button
                    buttonStyle="buttonSolid"
                    buttonTheme="noneThemeButton"
                    style={[CORE_STYLE.editIconContainer, createBtnDirection]}
                    onPress={handleSnapPress}>
                    <Icon name="dots-vertical" style={CORE_STYLE.editIcon} />
                </Button>
                <View style={POST_STYLE.cardContentContainer}>
                    <Image
                        style={POST_STYLE.cardProfileImage}
                        source={
                            post.creator.profile_image
                                ? {
                                      uri:
                                          BaseStorageURL +
                                          post.creator.profile_image,
                                  }
                                : profileImgPlacholder
                        }
                    />
                    <View style={POST_STYLE.cardTitleContainer}>
                        <View style={POST_STYLE.cardCreatorContainer}>
                            <Text
                                style={POST_STYLE.postTitle}
                                numberOfLines={1}>
                                {post.title}
                            </Text>
                            <Text
                                style={[
                                    POST_STYLE.postViewsDetails,
                                    {color: THEME_CONFIG[THEME].titleLight},
                                ]}>
                                {post.views + ' Views '}
                                <Icon
                                    name="eye"
                                    style={POST_STYLE.listIcon}
                                    color={THEME_CONFIG[THEME].extra}
                                />
                            </Text>
                        </View>
                        <View style={POST_STYLE.cardCreatorContainer}>
                            <Text style={POST_STYLE.postCreator}>
                                {post.creator.username}
                            </Text>
                            <Text style={POST_STYLE.postDate}>
                                {`${post.created_at}`.split(':', 2)[0] +
                                    ':' +
                                    `${post.created_at}`.split(':', 2)[1]}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default Post;