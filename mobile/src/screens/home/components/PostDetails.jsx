import React, {useState, useEffect} from 'react';
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    Image,
    TouchableHighlight,
} from 'react-native';
import {CoreStyles, HomeStyles} from '../../../theme/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {request} from '../../shared/Api';
import {BaseStorageURL} from '../../../shared/Constant';
import {useNavigation} from '@react-navigation/native';

const PostDetails = ({route}, props) => {
    const {post} = route.params;
    const CORE_STYLE = CoreStyles(props);
    const HOME_STYLE = HomeStyles();

    const userToken = useSelector(state => state.sessionUser.accessToken);
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);

    return (
        <View style={CORE_STYLE.postContainer}>
            <View style={CORE_STYLE.postImageContainer}>
                <Image
                    style={CORE_STYLE.postImage}
                    source={
                        post.file_path != ''
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
                <Text style={CORE_STYLE.postDescriptions}>{post.title}</Text>
            </View>
        </View>
    );
};

export default PostDetails;
