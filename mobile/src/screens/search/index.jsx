import React, {useState, useRef} from 'react';
import {View, FlatList, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {themeSelector} from '../../theme';
import {langFileSelector} from '../../shared/lang';
import {useSelector} from 'react-redux';
import {CoreStyles, PostStyles} from '../../theme/Styles';
import Input from '../../components/Input';
import BackToTopButton from '../../components/BackToTopButton';
import {request} from '../../shared/Api';
import PostListView from '../home/components/PostListView';
import THEME_CONFIG from '../../theme/themes.json';

const Search = () => {
    //styles
    const CORE_STYLE = CoreStyles();
    const POST_STYLE = PostStyles();

    //redux data selector
    const THEME = themeSelector();
    const LANG = langFileSelector();
    const userToken = useSelector(state => state.sessionUser.accessToken);

    //ref
    const scrollRef = useRef(null);

    //state variables
    const [searchData, setSearchData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [scrollDown, setScrollDown] = useState(true);
    const [offset, setOffset] = useState(0);
    const [searchResult, setSearchResult] = useState(LANG.post.searchPosts);

    //render list items
    const renderItem = ({item}) => <PostListView post={item} />;

    //request more posts from db
    const loadData = () => {
        if (nextPage) {
            setRefreshing(true);
            request
                .post(
                    nextPage,
                    {search_text: searchData},
                    {
                        headers: {
                            Authorization: userToken
                                ? 'Bearer ' + userToken
                                : '',
                        },
                    },
                )
                .then(function (response) {
                    setPosts([...posts, ...response.data.data]);
                    setNextPage(response.data.next_page_url);
                    setRefreshing(false);
                });
        }
    };

    //request refresh posts from db
    const search = () => {
        if (RegExp(/\S/).test(searchData)) {
            setRefreshing(true);
            request
                .post(
                    '/posts/search',
                    {search_text: searchData},
                    {
                        headers: {
                            Authorization: userToken
                                ? 'Bearer ' + userToken
                                : '',
                        },
                    },
                )
                .then(function (response) {
                    setPosts([]);
                    setPosts(response.data.data);
                    setNextPage(response.data.next_page_url);
                    setRefreshing(false);
                });
        } else {
            setSearchResult(LANG.post.noPosts);
            setPosts([]);
        }
    };

    //render
    return (
        <View style={[CORE_STYLE.screeenContainer]}>
            <View style={POST_STYLE.searchButtonContainer}>
                <Input
                    maxLength={40}
                    onEndEditing={search}
                    placeholder={LANG.authScreen.usernameField}
                    cursorColor={THEME_CONFIG[THEME].primary}
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    textContentType="none"
                    returnKeyType="search"
                    value={searchData}
                    onChangeText={value => setSearchData(value)}
                    icon={
                        <Icon
                            name="magnify"
                            size={28}
                            color={THEME_CONFIG[THEME].extra}
                        />
                    }
                />
            </View>
            <View style={POST_STYLE.searchDataContainer}>
                <BackToTopButton
                    scrollDown={scrollDown}
                    scrollRef={scrollRef}
                />

                {posts.length ? (
                    <FlatList
                        style={POST_STYLE.cardListContainer}
                        refreshing={refreshing}
                        ref={scrollRef}
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
                        keyExtractor={post => post.id}
                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <Text style={POST_STYLE.searchNoDataText}>
                        {searchResult}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default Search;
