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

const Post = ({post, style}) => {
    //hooks
    const navigation = useNavigation();

    //language file
    const LANG = langFileSelector();

    //render
    return (
        <TouchableHighlight
            style={style.cardContainer}
            onPress={() =>
                navigation.navigate(LANG.core.postDetails, {
                    itemId: post.id,
                    post: post,
                })
            }>
            <View>
                <Image
                    style={style.cardImageContainer}
                    source={
                        post.file_path != '' && post.file_path != null
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

const CreatePostButton = ({scrollDown, onPress}) => {
    //redux data selector
    const sessionLang = useSelector(state => state.sessionUser.userLang);

    //style
    const CORE_STYLE = CoreStyles();
    const createBtnDirection =
        sessionLang == 'en' ? {right: '5%'} : {left: '5%'};

    //hooks
    const viewRef = useRef(null);

    //effect
    useEffect(() => {
        if (scrollDown) {
            viewRef.current.animate({
                0: {bottom: -80, scale: 0.3},
                1: {bottom: 20, scale: 1},
            });
        } else {
            viewRef.current.animate({
                0: {bottom: 20, scale: 1},
                1: {bottom: -80, scale: 0.3},
            });
        }
    }, [scrollDown]);

    //render
    return (
        <Animatable.View
            ref={viewRef}
            duration={600}
            style={[CORE_STYLE.createPostIconAnimation, createBtnDirection]}>
            <Button
                buttonStyle="buttonSolid"
                buttonTheme="buttonPrimary"
                style={CORE_STYLE.createPostIconContainer}
                onPress={onPress}>
                <Icon
                    name="plus"
                    style={CORE_STYLE.createPostIcon}
                    color={CORE_STYLE.createPostIcon.color}
                />
            </Button>
        </Animatable.View>
    );
};

const Home = () => {
    //styles
    const CORE_STYLE = CoreStyles();
    const HOME_STYLE = HomeStyles();

    //hooks
    const sheetRef = useRef(null);

    //redux state
    const userToken = useSelector(state => state.sessionUser.accessToken);

    //state variables
    const [posts, setPosts] = useState([]);
    const [scrollDown, setScrollDown] = useState(true);
    const [offset, SetOffset] = useState(0);

    //render list items
    const renderItem = ({item}) => <Post post={item} style={HOME_STYLE} />;

    //effects
    useEffect(() => {
        //request posts from db
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

    //callbacks
    const handleSnapPress = useCallback(index => {
        sheetRef.current?.present();
    }, []);

    //render
    return (
        <View style={CORE_STYLE.screeenContainer}>
            <CreatePostButton
                onPress={() => handleSnapPress(0)}
                scrollDown={scrollDown}
            />
            <FlatList
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
                showsVerticalScrollIndicator={false}
            />
            <BottomListModal sheetRef={sheetRef} component={<CreatePost />} />
        </View>
    );
};

export default Home;
