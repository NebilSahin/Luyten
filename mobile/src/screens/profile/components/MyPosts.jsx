import React, {useState, useRef, useCallback} from 'react';
import {Text, View, FlatList, Image, TouchableHighlight} from 'react-native';
import {AuthStyles, CoreStyles, PostStyles} from '../../../theme/Styles';
import {useSelector} from 'react-redux';
import {request} from '../../../shared/Api';
import {BaseStorageURL} from '../../../shared/Constant';
import {useNavigation} from '@react-navigation/native';
import {langFileSelector} from '../../../shared/lang';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../../components/Button';
import BottomModal, {AlertPopUp} from '../../../components/BottomModal';
import BottomListModal from '../../../components/BottomListModal';
import BackToTopButton from '../../../components/BackToTopButton';
import EditPost from '../components/EditPost';
import DeletePost from './DeletePost';
import Post from './Post';

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

const PostMenu = ({post, refreshData, sheetRef, setMessage}) => {
    //styles
    const CORE_STYLE = CoreStyles();
    const AUTH_STYLE = AuthStyles();

    //redux selectors
    const LANG = langFileSelector();

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
    const POST_STYLE = PostStyles();

    //functions
    const sheetRef = useRef(null);
    const popupRef = useRef(null);
    const scrollRef = useRef(null);

    //redux state variable
    const LANG = langFileSelector();
    const userToken = useSelector(state => state.sessionUser.accessToken);

    //state variables
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [scrollDown, setScrollDown] = useState(true);
    const [offset, setOffset] = useState(0);
    const [postMenuData, setPostMenuData] = useState({});
    const [message, setMessage] = useState('');

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
                    setMessage('');
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
            .get('/myposts', {
                headers: {
                    Authorization: userToken ? 'Bearer ' + userToken : '',
                },
            })
            .then(function (response) {
                setPosts([]);
                setMessage('');
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

    return (
        <View onLayout={refreshData} style={CORE_STYLE.screeenContainer}>
            <BackToTopButton scrollDown={scrollDown} scrollRef={scrollRef} />
            <FlatList
                style={POST_STYLE.cardListContainer}
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
                data={posts.length ? posts : [emptyArray]}
                renderItem={
                    posts.length
                        ? renderItem
                        : () => (
                              <View style={POST_STYLE.cardListNoContainer}>
                                  <Text style={CORE_STYLE.noNotificationText}>
                                      {LANG.post.noPosts}
                                  </Text>
                              </View>
                          )
                }
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
            <BottomModal
                detached={true}
                component={<AlertPopUp message={message} />}
                sheetRef={popupRef}
            />
        </View>
    );
};

export default MyPosts;
