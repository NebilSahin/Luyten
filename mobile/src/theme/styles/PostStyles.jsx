import {StyleSheet} from 'react-native';
import {themeSelector} from '../index';
import {useSelector} from 'react-redux';
import {ThemeVariables} from '../../shared/Constant';
import THEME_CONFIG from '../themes.json';

export const PostStyles = () => {
    //redux stored lang and theme
    const THEME = themeSelector();
    const sessionLang = useSelector(state => state.sessionUser.userLang);
    const isLtr = sessionLang == 'en';

    //return stylesheet
    return StyleSheet.create({
        cardListContainer: {
            flex: 1,
            marginHorizontal: ThemeVariables.paddingS,
        },
        cardListNoContainer: {
            justifyContent: 'center',
            marginHorizontal: ThemeVariables.paddingS,
            marginVertical: ThemeVariables.paddingXL,
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
            flex: 1,
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
            flex: 1,
            fontSize: ThemeVariables.fontSizeXL,
            marginVertical: ThemeVariables.paddingS,
            fontWeight: '600',
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
            flexDirection: isLtr ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
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
            flex: 1,
            paddingHorizontal: ThemeVariables.paddingS,
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
        postViewsDetails:{
            fontSize: ThemeVariables.fontSizeM,
            textAlign: isLtr ? 'left' : 'right',
            flexDirection: isLtr ? 'row-reverse' : 'row-reverse',
            justifyContent:  isLtr ? 'flex-end' : 'flex-start',
            alignSelf: 'flex-end',
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
        searchScreenContainer:{
            flex: 0,
        },
        searchButtonContainer:{
            flex: 0,
            marginHorizontal: ThemeVariables.paddingM,
        },
        searchDataContainer:{
            flex: 1,
        },
        searchNoDataText:{
            flex: 1,
            marginVertical: ThemeVariables.paddingL,
            textAlign: 'center',
            color: THEME_CONFIG[THEME].text,
        }
    });
};
