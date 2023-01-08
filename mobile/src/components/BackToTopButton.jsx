import React, {useEffect, useRef} from 'react';
import {Text, View} from 'react-native';
import {PostStyles, CoreStyles} from '../theme/Styles';
import {useSelector} from 'react-redux';
import {langFileSelector} from '../shared/lang';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import Button from './Button';

const BackToTopButton = ({scrollDown, scrollRef}) => {
    //redux data selector
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const LANG = langFileSelector();

    //style
    const POST_STYLE = PostStyles();
    const CORE_STYLE = CoreStyles();

    const createBtnDirection =
        sessionLang == 'en' ? {right: '34%'} : {left: '34%'};

    //functions
    const viewRef = useRef(null);

    //effect
    useEffect(() => {
        if (!scrollDown) {
            viewRef.current.animate({
                1: {top: 10, scale: 1},
                0: {top: -100, scale: 0.3},
            });
        } else {
            viewRef.current.animate({
                0: {top: 10, scale: 1},
                1: {top: -100, scale: 0.3},
            });
        }
    }, [scrollDown]);

    const backToTop = () => {
        scrollRef.current.scrollToIndex({animated: true, index: '0'});
    }

    //render
    return (
        <Animatable.View
            ref={viewRef}
            duration={600}
            style={[POST_STYLE.createPostIconAnimation, createBtnDirection]}
            >
            <Button
                buttonStyle="buttonSolid"
                buttonTheme="buttonPrimary"
                style={CORE_STYLE.backTopBtnContainer}
                onPress={backToTop}>
                <View style={CORE_STYLE.backTopIconContainer}>
                    <Icon
                        name="arrow-up"
                        style={POST_STYLE.createPostIcon}
                        color={POST_STYLE.createPostIcon.color}
                    />
                    <Text style={CORE_STYLE.backToptext}>{LANG.post.backToTop}</Text>
                </View>
            </Button>
        </Animatable.View>
    );
};

export default BackToTopButton