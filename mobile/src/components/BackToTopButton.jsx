import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Text, View, FlatList, Image, TouchableHighlight} from 'react-native';
import {CoreStyles, HomeStyles} from '../theme/Styles';
import {useSelector} from 'react-redux';
import {request} from '../../shared/Api';
import {BaseStorageURL} from '../../shared/Constant';
import {useNavigation} from '@react-navigation/native';
import {langFileSelector} from '../shared/lang';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import Button from './Button';

const BackToTopButton = ({scrollDown, scrollRef}) => {
    //redux data selector
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const LANG = langFileSelector();

    //style
    const CORE_STYLE = CoreStyles();
    const createBtnDirection =
        sessionLang == 'en' ? {right: '34%'} : {left: '34%'};

    //hooks
    const viewRef = useRef(null);

    //effect
    useEffect(() => {
        if (!scrollDown) {
            viewRef.current.animate({
                1: {top: 10, scale: 1},
                0: {top: -80, scale: 0.3},
            });
        } else {
            viewRef.current.animate({
                0: {top: 10, scale: 1},
                1: {top: -80, scale: 0.3},
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
            style={[CORE_STYLE.createPostIconAnimation, createBtnDirection]}>
            <Button
                buttonStyle="buttonSolid"
                buttonTheme="buttonPrimary"
                style={CORE_STYLE.backTopBtnContainer}
                onPress={backToTop}>
                <View style={CORE_STYLE.backTopIconContainer}>
                    <Icon
                        name="arrow-up"
                        style={CORE_STYLE.createPostIcon}
                        color={CORE_STYLE.createPostIcon.color}
                    />
                    <Text style={CORE_STYLE.backToptext}>{LANG.home.backToTop}</Text>
                </View>
            </Button>
        </Animatable.View>
    );
};

export default BackToTopButton