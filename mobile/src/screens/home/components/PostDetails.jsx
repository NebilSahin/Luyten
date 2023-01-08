import React from 'react';
import {Text, View} from 'react-native';
import {PostStyles} from '../../../theme/Styles';
import {langFileSelector} from '../../../shared/lang';

const PostDetails = ({route}, props) => {
    //styles
    const POST_STYLE = PostStyles(props);

    //post details
    const {post} = route.params;

    //redux data selector
    const LANG = langFileSelector();

    //render
    return (
        <View style={POST_STYLE.postContainer}>
            <View style={POST_STYLE.postDetailsContainer}>
                <Text style={POST_STYLE.postTitleDetails}>{post.title}</Text>
                <View style={POST_STYLE.postTitleDetailsContainer}>
                    <Text style={POST_STYLE.postCreatorDetails}>
                        {post.creator.username}
                    </Text>
                    <Text style={POST_STYLE.postDateDetails}>
                        {`${post.created_at}`.split(':', 2)[0] +
                            ':' +
                            `${post.created_at}`.split(':', 2)[1]}
                    </Text>
                </View>
                <Text style={POST_STYLE.postDescriptionsDetails}>
                    {post.description != 'null'
                        ? post.description
                        : LANG.post.noDescription}
                </Text>
            </View>
        </View>
    );
};

export default PostDetails;
