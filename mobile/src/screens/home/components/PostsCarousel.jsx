import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Dimensions, Image, TouchableHighlight} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {request} from '../../../shared/Api';
import {useSelector} from 'react-redux';
import {langFileSelector} from '../../../shared/lang';
import PostCardView from './PostListView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import THEME_CONFIG from '../../../theme/themes.json';
import {themeSelector} from '../../../theme';
import {PostStyles} from '../../../theme/Styles';
import {BaseStorageURL} from '../../../shared/Constant';
import {useNavigation} from '@react-navigation/native';

const profileImgPlacholder = require('../../../../assets/profile-image.png');
const postImgPlacholder = require('../../../../assets/post-placeholder.png');

export const PostsCarousel = () => {
    //styles
    const POST_STYLE = PostStyles();
    const width = Dimensions.get('window').width;

    //redux state
    const userToken = useSelector(state => state.sessionUser.accessToken);
    const LANG = langFileSelector();
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    //ref
    const popupRef = useRef(null);

    //functions
    const navigation = useNavigation();

    //state variables
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');

    //effects
    useEffect(() => {
        request
            .get('/highest-viewed', {
                headers: {
                    Authorization: userToken ? 'Bearer ' + userToken : '',
                },
            })
            .then(function (response) {
                setPosts([]);
                setPosts(response.data.data);
            })
    }, []);

    //render list items
    const renderItem = ({item}) => (
        <TouchableHighlight
            disabled={item.id == 0}
            style={[
                POST_STYLE.cardContainer,
                {
                    opacity: item.id == 0 ? 0 : 1,
                    marginVertical: 0,
                    flex: 0,
                },
            ]}
            onPress={() =>
                navigation.navigate(LANG.core.postDetails, {
                    itemId: item.id,
                    post: item,
                })
            }>
            <View>
                <Image
                    style={POST_STYLE.cardImageContainer}
                    source={
                        item.post_image != '' && item.post_image != null
                            ? {uri: BaseStorageURL + item.post_image}
                            : postImgPlacholder
                    }
                />
                <View style={POST_STYLE.cardContentContainer}>
                    <Image
                        style={POST_STYLE.cardProfileImage}
                        source={
                            item.creator.profile_image
                                ? {
                                      uri:
                                          BaseStorageURL +
                                          item.creator.profile_image,
                                  }
                                : profileImgPlacholder
                        }
                    />
                    <View style={POST_STYLE.cardTitleContainer}>
                        <Text style={POST_STYLE.postTitle} numberOfLines={1}>
                            {item.title}
                        </Text>
                        <View style={POST_STYLE.cardCreatorContainer}>
                            <Text style={POST_STYLE.postCreator}>
                                {item.creator.username}
                            </Text>
                            <Text
                                style={[
                                    POST_STYLE.postViewsDetails,
                                    {color: THEME_CONFIG[THEME].titleLight},
                                ]}>
                                {item.views + ' '}
                                <Icon
                                    name="eye"
                                    style={POST_STYLE.listIcon}
                                    color={THEME_CONFIG[THEME].titleLight}
                                />
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    return (
            <Carousel
            loop={false}
                width={width}
                autoPlay={false}
                data={posts}
                autoPlayInterval={1500}
                scrollAnimationDuration={1000}
                mode="parallax"
                pagingEnabled={true}
                renderItem={renderItem}
            />
    );
};

export default PostsCarousel;
