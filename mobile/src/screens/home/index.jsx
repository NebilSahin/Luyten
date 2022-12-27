import React, {useState, useEffect} from 'react';
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    Image,
    TouchableHighlight,
} from 'react-native';
import {themeSelector} from '../../theme';
import {CoreStyles, HomeStyles} from '../../theme/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {request} from '../../shared/Api';
import {BaseStorageURL} from '../../shared/Constant';
import {useNavigation} from '@react-navigation/native';

const THEME_CONFIG = require('../../theme/themes.json');

const Post = ({post, style}) => {
    const navigation = useNavigation();
    return (
        <TouchableHighlight
            style={style.cardContainer}
            onPress={() =>
                navigation.navigate('Post details', {
                    itemId: post.id,
                    post: post,
                })
            }>
            <View>
                <Image
                    style={style.cardImageContainer}
                    source={
                        post.file_path != ''
                            ? {uri: BaseStorageURL + post.file_path}
                            : require('../../../assets/post-placeholder.png')
                    }
                />
                <View style={style.cardContentContainer}>
                    <Text style={style.postTitle}>{post.title}</Text>
                    <View>
                        <Text style={style.postCreator}>
                            {post.creator.username}
                        </Text>
                        <Text style={style.postDate}>{post.created_at}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const Home = props => {
    const CORE_STYLE = CoreStyles(props);
    const HOME_STYLE = HomeStyles();

    const userToken = useSelector(state => state.sessionUser.accessToken);
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);

    const renderItem = ({item}) => <Post post={item} style={HOME_STYLE} />;

    useEffect(() => {
        request
            .get('/posts', {
                headers: {
                    Authorization: userToken ? 'Bearer ' + userToken : '',
                },
            })
            .then(function (response) {
                setPosts(response.data.data);
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }, []);
    return (
        <View style={CORE_STYLE.screeenContainer}>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={post => post.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Home;
