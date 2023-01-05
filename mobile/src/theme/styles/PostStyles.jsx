import {StyleSheet} from 'react-native';
import {themeSelector} from '../index';
import {useSelector} from 'react-redux';
import {ThemeVariables} from '../../shared/Constant'

const THEME_CONFIG = require('../themes.json');

export const PostStyles = () => {
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    return StyleSheet.create({
        cardListContainer: {
            marginHorizontal: ThemeVariables.paddingS,
        },
        listContainer: {
            flex: 1,
            overflow: 'hidden',
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'flex-start',
            textAlign: isLtr ? 'left' : 'right',
        },
        listTouchableContainer: {
            borderRadius: 30,
            marginHorizontal: ThemeVariables.paddingS,
            color: THEME_CONFIG[THEME].navHeaderBackground,
        },
        listImageContainer: {
            borderRadius: 30,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginVertical: ThemeVariables.paddingM,
            height: 110,
            width: 160,
        },
        listImage: {
            height: 110,
            width: 160,
        },
        listContentContainer: {
            paddingHorizontal: ThemeVariables.paddingM,
            paddingVertical: ThemeVariables.paddingS,
            justifyContent: 'center',
        },
        listExtraContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        listTitleContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'flex-start',
        },
        listCreatorContainer: {
            paddingVertical: ThemeVariables.paddingS,
            flexDirection: isLtr ? 'row' : 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        listPostTitle: {
            fontSize: ThemeVariables.fontSizeXL,
            marginVertical: ThemeVariables.paddingS,
            fontWeight: '600',
            width: '70%',
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        listProfileImage: {
            width: 25,
            height: 25,
            borderRadius: 30,
        },
        listPostCreator: {
            marginHorizontal: ThemeVariables.paddingS,
            fontSize: ThemeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        listPostDate: {
            fontSize: ThemeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        cardImageContainer: {
            borderRadius: 30,
            height: 200,
            width: '100%',
        },
        cardContainer: {
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: ThemeVariables.paddingS,
            marginVertical: ThemeVariables.paddingM,
            borderRadius: 30,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            textAlign: isLtr ? 'left' : 'right',
        },
        cardContentContainer: {
            position: 'absolute',
            bottom: 0,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingHorizontal: ThemeVariables.paddingM,
            paddingVertical: ThemeVariables.paddingS,
            width: '100%',
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: THEME_CONFIG[THEME].cardBackground,
        },
        innerShadowContainer: {
            borderRadius: 30,
        },
        cardTitleContainer: {
            paddingHorizontal: ThemeVariables.paddingM,
            flexDirection: 'column',
            width: '90%',
        },
        cardCreatorContainer: {
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
        },
        postTitle: {
            fontSize: ThemeVariables.fontSizeL,
            fontWeight: '600',
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].titleLight,
        },
        cardProfileImage: {
            width: 30,
            height: 30,
            borderRadius: 30,
        },
        postCreator: {
            fontSize: ThemeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].titleLight,
        },
        postDate: {
            fontSize: ThemeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].titleLight,
        },
        creatPostButton: {
            width: '40%',
        },
        postContainer: {
            flex: 1,
            backgroundColor: THEME_CONFIG[THEME].background,
            height: '100%',
            width: '100%',
        },
        postImageContainer: {
            width: '100%',
            height: 200,
            backgroundColor: THEME_CONFIG[THEME].headerAltColor,
        },
        postImage: {
            width: '100%',
            height: 200,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
        },
        postTitleDetails: {
            fontSize: 24,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        postTitleDetailsContainer: {
            paddingVertical: ThemeVariables.paddingM,
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
        },
        postDetailsContainer: {
            paddingHorizontal: ThemeVariables.paddingL,
        },
        postCreatorDetails: {
            fontSize: ThemeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        postDateDetails: {
            fontSize: ThemeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        postDescriptionsDetails: {
            fontSize: ThemeVariables.fontSizeL,
            borderTopWidth: 1,
            borderTopColor: THEME_CONFIG[THEME].borderColor,
            paddingVertical: ThemeVariables.paddingM,
            textAlign: isLtr ? 'left' : 'right',
            color: THEME_CONFIG[THEME].text,
        },
        createPostIconAnimation: {
            position: 'absolute',
            zIndex: 10,
            borderRadius: 200,
        },
        createPostIconContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            borderRadius: 200,
            width: 60,
            height: 60,
            backgroundColor: THEME_CONFIG[THEME].primary,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        createPostIcon: {
            fontSize: 24,
            color: THEME_CONFIG[THEME].titleLight,
        },
    });
};
