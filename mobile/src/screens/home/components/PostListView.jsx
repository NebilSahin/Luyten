import React from 'react';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import {PostStyles} from '../../../theme/Styles';
import {BaseStorageURL} from '../../../shared/Constant';
import {useNavigation} from '@react-navigation/native';
import {langFileSelector} from '../../../shared/lang';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import THEME_CONFIG from '../../../theme/themes.json';
import {themeSelector} from '../../../theme';

const profileImgPlacholder = require('../../../../assets/profile-image.png');
const postImgPlacholder = require('../../../../assets/post-placeholder.png');

export const PostListView = ({post}) => {
    //styles
    const POST_STYLE = PostStyles();

    //functions
    const navigation = useNavigation();

    //redux data selector
    const LANG = langFileSelector();
    const THEME = themeSelector();

    //render
    return (
        <TouchableHighlight
            disabled={post.id == 0}
            underlayColor={POST_STYLE.listTouchableContainer.color}
            style={[
                POST_STYLE.listTouchableContainer,
                {opacity: post.id == 0 ? 0 : 1},
            ]}
            onPress={() =>
                navigation.navigate(LANG.core.postDetails, {
                    itemId: post.id,
                    post: post,
                })
            }>
            <View style={POST_STYLE.listContainer}>
                <View style={POST_STYLE.listImageContainer}>
                    <Image
                        style={POST_STYLE.listImage}
                        source={
                            post.post_image != '' && post.post_image != null
                                ? {uri: BaseStorageURL + post.post_image}
                                : postImgPlacholder
                        }
                    />
                </View>
                <View style={POST_STYLE.listContentContainer}>
                    <View style={POST_STYLE.listTitleContainer}>
                        <Text
                            style={POST_STYLE.listPostTitle}
                            numberOfLines={2}>
                            {post.title}
                        </Text>
                    </View>
                    <View style={POST_STYLE.listPostDate}>
                        <Text style={POST_STYLE.listPostDate}>
                            {`${post.created_at}`.split(':', 2)[0] +
                                ':' +
                                `${post.created_at}`.split(':', 2)[1]}
                        </Text>
                        <Text style={POST_STYLE.postViewsDetails}>
                            {post.views + ' Views '}
                            <Icon
                                name="eye"
                                style={POST_STYLE.listIcon}
                                color={THEME_CONFIG[THEME].extra}
                            />
                        </Text>
                    </View>
                    <View style={POST_STYLE.listExtraContainer}>
                        <View style={POST_STYLE.listCreatorContainer}>
                            <Image
                                style={POST_STYLE.listProfileImage}
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
                            <Text style={POST_STYLE.listPostCreator}>
                                {post.creator.username}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default PostListView;
