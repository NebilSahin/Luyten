import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {CoreStyles} from '../../../theme/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {themeSelector} from '../../../theme';

const THEME_CONFIG = require('../../../theme/themes.json');

const PostToggleViewButton = ({cardView, setCardView}) => {
    //styles
    const CORE_STYLE = CoreStyles();

    //redux data selector
    const THEME = themeSelector();

    return (
        <View style={CORE_STYLE.toggleViewContainer}>
            <TouchableOpacity
                onPress={() => {
                    setCardView(true);
                }}>
                <Icon
                    name="view-dashboard"
                    style={CORE_STYLE.gridIcon}
                    color={
                        cardView
                            ? THEME_CONFIG[THEME].primary
                            : THEME_CONFIG[THEME].extra
                    }
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setCardView(false);
                }}>
                <Icon
                    name="format-list-bulleted-square"
                    style={CORE_STYLE.listIcon}
                    color={
                        !cardView
                            ? THEME_CONFIG[THEME].primary
                            : THEME_CONFIG[THEME].extra
                    }
                />
            </TouchableOpacity>
        </View>
    );
};

export default PostToggleViewButton;
