import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Text, View, FlatList, Image, TouchableHighlight} from 'react-native';
import {CoreStyles, HomeStyles} from '../../theme/Styles';
import {useSelector} from 'react-redux';
import {request} from '../../shared/Api';
import {BaseStorageURL} from '../../shared/Constant';
import {useNavigation} from '@react-navigation/native';
import {langFileSelector} from '../../shared/lang';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import Button from '../../components/Button';
import BottomListModal from '../../components/BottomListModal';
import CreatePost from '../home/components/CreatePost';
import BackToTopButton from '../../components/BackToTopButton';
import CreatePostButton from '../../components/CreatePostButton';

const profileImgPlacholder = require('../../../assets/profile-image.png');
const emptyArray = {
    id: 0,
    title: null,
    description: null,
    file_path: null,
    user_identifier: null,
    created_at: null,
    updated_at: null,
    deleted_at: null,
    creator: {
        id: null,
        username: null,
        email: null,
        email_verified_at: null,
        role_identifier: null,
        created_at: null,
        updated_at: null,
        deleted_at: null,
    },
};

const Post = ({post}) => {
    //styles
    const HOME_STYLE = HomeStyles();

    //hooks
    const navigation = useNavigation();

    //language file
    const LANG = langFileSelector();

    //render
    return (
        <TouchableHighlight
            disabled={post.id == 0}
            style={[HOME_STYLE.cardContainer, {opacity: post.id == 0 ? 0 : 1}]}
            onPress={() =>
                navigation.navigate(LANG.core.postDetails, {
                    itemId: post.id,
                    post: post,
                })
            }>
            <View>
                <Image
                    style={HOME_STYLE.cardImageContainer}
                    source={
                        post.post_image != '' && post.post_image != null
                            ? {uri: BaseStorageURL + post.post_image}
                            : require('../../../assets/post-placeholder.png')
                    }
                />
                <View style={HOME_STYLE.cardContentContainer}>
                    <Image
                        style={HOME_STYLE.cardProfileImage}
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
                    <View style={HOME_STYLE.cardTitleContainer}>
                        <Text style={HOME_STYLE.postTitle} numberOfLines={1}>
                            {post.title}
                        </Text>
                        <View style={HOME_STYLE.cardCreatorContainer}>
                            <Text style={HOME_STYLE.postCreator}>
                                {post.creator.username}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const Home = () => {
    //styles
    const CORE_STYLE = CoreStyles();
    const HOME_STYLE = HomeStyles();

    //hooks
    const sheetRef = useRef(null);
    const scrollRef = useRef(null);

    //redux state
    const userToken = useSelector(state => state.sessionUser.accessToken);

    //state variables
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [scrollDown, setScrollDown] = useState(true);
    const [offset, SetOffset] = useState(0);

    //render list items
    const renderItem = ({item}) => <Post post={item} />;

    //request more posts from db
    const loadData = () => {
        if (nextPage) {
            setRefreshing(true);
            request
                .get(nextPage, {
                    headers: {
                        Authorization: userToken ? 'Bearer ' + userToken : '',
                    },
                })
                .then(function (response) {
                    if (response.data.data.length % 2 != 0) {
                        response.data.data.push(emptyArray);
                    }
                    setPosts([...posts, ...response.data.data]);
                    setNextPage(response.data.next_page_url);
                    setRefreshing(false);
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    };

    //request refresh posts from db
    const refreshData = () =>
        request
            .get('/posts', {
                headers: {
                    Authorization: userToken ? 'Bearer ' + userToken : '',
                },
            })
            .then(function (response) {
                if (response.data.data.length % 2 != 0) {
                    response.data.data.push(emptyArray);
                }
                setPosts(response.data.data);
                setNextPage(response.data.next_page_url);
                setRefreshing(false);
            })
            .catch(function (error) {
                console.log(error.response);
            });

    //callbacks
    const handleSnapPress = useCallback(index => {
        sheetRef.current?.present();
    }, []);

    //render
    return (
        <View onLayout={refreshData} style={CORE_STYLE.screeenContainer}>
            <CreatePostButton
                onPress={() => handleSnapPress(0)}
                scrollDown={scrollDown}
            />
            <BackToTopButton scrollDown={scrollDown} scrollRef={scrollRef} />
            <FlatList
                style={HOME_STYLE.cardListContainer}
                refreshing={refreshing}
                ref={scrollRef}
                onRefresh={refreshData}
                onEndReached={loadData}
                onScroll={event => {
                    let currentOffset = event.nativeEvent.contentOffset.y;
                    setScrollDown(
                        currentOffset <= offset || offset <= 0 ? true : false,
                    );
                    SetOffset(currentOffset);
                }}
                data={posts}
                renderItem={renderItem}
                keyExtractor={post => post.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
            <BottomListModal
                sheetRef={sheetRef}
                component={<CreatePost refreshData={refreshData} />}
            />
        </View>
    );
};

export default Home;
