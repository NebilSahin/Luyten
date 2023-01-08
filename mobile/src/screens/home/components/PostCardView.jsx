import React from 'react';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import {PostStyles} from '../../../theme/Styles';
import {BaseStorageURL} from '../../../shared/Constant';
import {useNavigation} from '@react-navigation/native';
import {langFileSelector} from '../../../shared/lang';

const profileImgPlacholder = require('../../../../assets/profile-image.png');
const postImgPlacholder = require('../../../../assets/post-placeholder.png');

const PostCardView = ({post}) => {
    //styles
    const POST_STYLE = PostStyles();

    //functions
    const navigation = useNavigation();

    //language file
    const LANG = langFileSelector();

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
                        <Text style={POST_STYLE.postTitle} numberOfLines={1}>
                            {post.title}
                        </Text>
                        <View style={POST_STYLE.cardCreatorContainer}>
                            <Text style={POST_STYLE.postCreator}>
                                {post.creator.username}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default PostCardView;
