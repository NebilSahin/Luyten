import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {PostStyles} from '../../../theme/Styles';
import {langFileSelector} from '../../../shared/lang';
import {request} from '../../../shared/Api';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import THEME_CONFIG from'../../../theme/themes.json';
import {themeSelector} from '../../../theme';

const PostDetails = ({route}, props) => {
    //styles
    const POST_STYLE = PostStyles(props);

    //post details
    const {post} = route.params;

    //redux data selector
    const LANG = langFileSelector();
    const userToken = useSelector(state => state.sessionUser.accessToken);
    const THEME = themeSelector();

    //effects
    useEffect(() => {
        //update the views count
        request
            .get(`/posts/${post.id}`, {
                headers: {
                    Authorization: userToken ? 'Bearer ' + userToken : '',
                },
            })
    }, []);

    //render
    return (
        <View style={POST_STYLE.postContainer}>
            <View style={POST_STYLE.postDetailsContainer}>
                <Text style={POST_STYLE.postTitleDetails}>{post.title}</Text>
                <Text style={POST_STYLE.postViewsDetails}>
                    {post.views + ' Views '}
                    <Icon
                        name="eye"
                        style={POST_STYLE.listIcon}
                        color={THEME_CONFIG[THEME].extra}
                    />
                </Text>
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
