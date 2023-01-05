import React, {useState, useRef, useCallback} from 'react';
import {Text, View, FlatList, Image, TouchableHighlight} from 'react-native';
import {
    AuthStyles,
    CoreStyles,
    PostStyles,
} from '../../../theme/Styles';
import {useSelector} from 'react-redux';
import {request} from '../../../shared/Api';
import {BaseStorageURL} from '../../../shared/Constant';
import {useNavigation} from '@react-navigation/native';
import {langFileSelector} from '../../../shared/lang';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../../components/Button';
import BottomModal from '../../../components/BottomModal';
import BottomListModal from '../../../components/BottomListModal';
import BackToTopButton from '../../../components/BackToTopButton';
import EditPost from '../components/EditPost';
import {themeSelector} from '../../../theme';
import DeletePost from './DeletePost';

const profileImgPlacholder = require('../../../../assets/profile-image.png');

const Post = ({post, sheetRef, setPostMenuData}) => {
    //styles
    const HOME_STYLE = PostStyles();
    const CORE_STYLE = CoreStyles();

    //hooks
    const navigation = useNavigation();

    //language file
    const LANG = langFileSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);

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
                            : require('../../../../assets/post-placeholder.png')
                    }
                />
                <Button
                    buttonStyle="buttonSolid"
                    buttonTheme="noneThemeButton"
                    style={[CORE_STYLE.editIconContainer, createBtnDirection]}
                    onPress={handleSnapPress}>
                    <Icon
                        name="dots-vertical"
                        style={CORE_STYLE.editIcon}
                    />
                </Button>
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
                            <Text style={HOME_STYLE.postDate}>
                                {post.created_at}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const PostMenu = ({post, refreshData}) => {
    //styles
    const CORE_STYLE = CoreStyles();
    const AUTH_STYLE = AuthStyles();

    //redux selectors
    const LANG = langFileSelector();
    const THEME = themeSelector();

    //ref
    const popupRef = useRef(null);
    const sheetListRef = useRef(null);

    //callbacks
    const handleSnapPress = useCallback(ref => {
        ref.current?.present();
    }, []);

    //render
    return (
        <View style={AUTH_STYLE.SheetContainer}>
            <Button
                buttonStyle="buttonSolid"
                buttonTheme="noneThemeButton"
                style={[CORE_STYLE.editMenuContainer]}
                onPress={() => {
                    handleSnapPress(sheetListRef);
                }}>
                <View style={CORE_STYLE.editMenuIconContainer}>
                    <Icon
                        name="square-edit-outline"
                        style={CORE_STYLE.editMenuIcon}
                    />
                    <Text style={CORE_STYLE.editMenutext}>
                        {LANG.profile.editPost}
                    </Text>
                </View>
            </Button>
            <Button
                buttonStyle="buttonSolid"
                buttonTheme="noneThemeButton"
                style={[CORE_STYLE.editMenuContainer]}
                onPress={() => {
                    handleSnapPress(popupRef);
                }}>
                <View style={CORE_STYLE.editMenuIconContainer}>
                    <Icon
                        name="delete-outline"
                        style={CORE_STYLE.editMenuIcon}
                    />
                    <Text style={CORE_STYLE.editMenutext}>
                        {LANG.profile.deletePost}
                    </Text>
                </View>
            </Button>
            <BottomModal
                detached={true}
                component={<DeletePost post={post} refreshData={refreshData} />}
                sheetRef={popupRef}
            />
            <BottomListModal
                sheetRef={sheetListRef}
                component={<EditPost post={post} refreshData={refreshData} />}
            />
        </View>
    );
};

const MyPosts = props => {
    //styles
    const CORE_STYLE = CoreStyles();
    const HOME_STYLE = PostStyles();

    //hooks
    const sheetRef = useRef(null);
    const scrollRef = useRef(null);

    //redux state variable
    const userToken = useSelector(state => state.sessionUser.accessToken);

    //state variables
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [scrollDown, setScrollDown] = useState(true);
    const [offset, setOffset] = useState(0);
    const [postMenuData, setPostMenuData] = useState({});

    //render list items
    const renderItem = ({item}) => (
        <Post
            post={item}
            sheetRef={sheetRef}
            setPostMenuData={setPostMenuData}
        />
    );

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
            .get('/myposts', {
                headers: {
                    Authorization: userToken ? 'Bearer ' + userToken : '',
                },
            })
            .then(function (response) {
                setPosts(null);
                setPosts(response.data.data);
                setNextPage(response.data.next_page_url);
                setRefreshing(false);
            })
            .catch(function (error) {
                console.log(error.response);
            });

    return (
        <View onLayout={refreshData} style={CORE_STYLE.screeenContainer}>
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
                    setOffset(currentOffset);
                }}
                data={posts}
                renderItem={renderItem}
                keyExtractor={post => post.id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
            />
            <BottomModal
                backdrop={true}
                sheetRef={sheetRef}
                component={
                    <PostMenu post={postMenuData} refreshData={refreshData} />
                }
            />
        </View>
    );
};

export default MyPosts;
