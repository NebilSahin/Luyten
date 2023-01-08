import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import {CoreStyles, PostStyles} from '../../theme/Styles';
import {useSelector} from 'react-redux';
import {request} from '../../shared/Api';
import {useIsFocused} from '@react-navigation/native';
import BottomListModal from '../../components/BottomListModal';
import CreatePost from '../home/components/CreatePost';
import BackToTopButton from '../../components/BackToTopButton';
import CreatePostButton from '../../components/CreatePostButton';
import PostToggleViewButton from './components/PostToggleViewButton';
import PostCardView from './components/PostCardView';
import PostListView from './components/PostListView';
import BottomModal, {AlertPopUp} from '../../components/BottomModal';
import {langFileSelector} from '../../shared/lang';

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

const Home = () => {
    //styles
    const CORE_STYLE = CoreStyles();
    const POST_STYLE = PostStyles();

    //functions
    const sheetRef = useRef(null);
    const popupRef = useRef(null);
    const scrollRef = useRef(null);
    const isFocused = useIsFocused();

    //redux state
    const userToken = useSelector(state => state.sessionUser.accessToken);
    const LANG = langFileSelector();

    //state variables
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [scrollDown, setScrollDown] = useState(true);
    const [offset, setOffset] = useState(0);
    const [cardView, setCardView] = useState(true);
    const [message, setMessage] = useState('');

    //render list items
    const renderItem = ({item}) =>
        cardView ? <PostCardView post={item} /> : <PostListView post={item} />;

    //callbacks
    const handleSnapPress = useCallback(index => {
        sheetRef.current?.present();
    }, []);

    //effects
    useEffect(() => {
        refreshData();
    }, [isFocused, cardView]);

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
                    if (response.data.data.length % 2 != 0 && cardView) {
                        response.data.data.push(emptyArray);
                    }
                    setPosts([...posts, ...response.data.data]);
                    setNextPage(response.data.next_page_url);
                    setRefreshing(false);
                })
                .catch(function (error) {
                    if (!error.response) {
                        setMessage(LANG.authScreen.pleaseTryLater);
                        popupRef.current?.present();
                    }
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
                if (response.data.data.length % 2 != 0 && cardView) {
                    response.data.data.push(emptyArray);
                }
                setPosts(null);
                setPosts(response.data.data);
                setNextPage(response.data.next_page_url);
                setRefreshing(false);
            })
            .catch(function (error) {
                if (!error.response) {
                    setMessage(LANG.authScreen.pleaseTryLater);
                    popupRef.current?.present();
                }
            });

    //render
    return (
        <>
            {isFocused && posts ? (
                <View
                    onLayout={refreshData}
                    style={CORE_STYLE.screeenContainer}>
                    <View style={CORE_STYLE.latestPostsTitleContainer}>
                        <Text style={CORE_STYLE.latestPostsTitle}>{LANG.post.latestPosts}</Text>
                        <PostToggleViewButton
                            cardView={cardView}
                            setCardView={setCardView}
                        />
                    </View>
                    <CreatePostButton
                        onPress={() => handleSnapPress(0)}
                        scrollDown={scrollDown}
                    />
                    <BackToTopButton
                        scrollDown={scrollDown}
                        scrollRef={scrollRef}
                    />
                    <FlatList
                        style={POST_STYLE.cardListContainer}
                        refreshing={refreshing}
                        ref={scrollRef}
                        onRefresh={refreshData}
                        onEndReached={loadData}
                        onScroll={event => {
                            let currentOffset =
                                event.nativeEvent.contentOffset.y;
                            setScrollDown(
                                currentOffset <= offset || offset <= 0
                                    ? true
                                    : false,
                            );
                            setOffset(currentOffset);
                        }}
                        data={posts}
                        renderItem={renderItem}
                        key={cardView ? '_' : '#'}
                        keyExtractor={post => post.id}
                        numColumns={cardView ? 2 : 1}
                        showsVerticalScrollIndicator={false}
                    />
                    <BottomListModal
                        sheetRef={sheetRef}
                        component={<CreatePost refreshData={refreshData} />}
                    />
                    <BottomModal
                        detached={true}
                        component={<AlertPopUp message={message} />}
                        sheetRef={popupRef}
                    />
                </View>
            ) : (
                <View style={CORE_STYLE.loadingIndicator}>
                    <ActivityIndicator
                        size="large"
                        color={CORE_STYLE.loadingIndicator.color}
                    />
                </View>
            )}
        </>
    );
};

export default Home;
