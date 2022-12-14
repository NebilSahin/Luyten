import React, {useEffect, useRef} from 'react';
import {PostStyles} from '../theme/Styles';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import Button from './Button';

const CreatePostButton = ({scrollDown, onPress}) => {
    //redux data selector
    const sessionLang = useSelector(state => state.sessionUser.userLang);

    //style
    const POST_STYLE = PostStyles();
    const createBtnDirection =
        sessionLang == 'en' ? {right: '5%'} : {left: '5%'};

    //functions
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
            style={[POST_STYLE.createPostIconAnimation, createBtnDirection]}>
            <Button
                buttonStyle="buttonSolid"
                buttonTheme="buttonPrimary"
                style={POST_STYLE.createPostIconContainer}
                onPress={onPress}>
                <Icon
                    name="plus"
                    style={POST_STYLE.createPostIcon}
                    color={POST_STYLE.createPostIcon.color}
                />
            </Button>
        </Animatable.View>
    );
};
export default CreatePostButton;