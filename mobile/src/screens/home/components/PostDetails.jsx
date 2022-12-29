import React from 'react';
import {Text, View, Image} from 'react-native';
import {CoreStyles} from '../../../theme/Styles';
import {useSelector} from 'react-redux';
import {BaseStorageURL} from '../../../shared/Constant';
import { langFileSelector } from '../../../shared/lang';

const PostDetails = ({route}, props) => {
    //styles
    const CORE_STYLE = CoreStyles(props);

    //post details
    const {post} = route.params;

    //redux data selector
    const LANG = langFileSelector();

    //render
    return (
        <View style={CORE_STYLE.postContainer}>
            <View style={CORE_STYLE.postImageContainer}>
                <Image
                    style={CORE_STYLE.postImage}
                    source={
                        post.file_path != '' && post.file_path != null
                            ? {uri: BaseStorageURL + post.file_path}
                            : require('../../../../assets/post-placeholder.png')
                    }
                />
            </View>
            <View style={CORE_STYLE.postDetailsContainer}>
                <Text style={CORE_STYLE.postTitle}>{post.title}</Text>
                <View style={CORE_STYLE.postTitleDetailsContainer}>
                    <Text style={CORE_STYLE.postCreator}>
                        {post.creator.username}
                    </Text>
                    <Text style={CORE_STYLE.postDate}>{post.created_at}</Text>
                </View>
                <Text style={CORE_STYLE.postDescriptions}>
                    {post.description != 'null' ? post.description : LANG.home.noDescription}
                </Text>
            </View>
        </View>
    );
};

export default PostDetails;
