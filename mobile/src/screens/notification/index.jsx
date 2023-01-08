import React from 'react';
import {View, Text} from 'react-native';
import {langFileSelector} from '../../shared/lang';
import {CoreStyles} from '../../theme/Styles';


const Notification = () => {
    //styles
    const CORE_STYLE = CoreStyles();

    //redux data selector
    const LANG = langFileSelector();

    //render
    return (
        <View style={[CORE_STYLE.screeenContainer]}>
            <View style={CORE_STYLE.notificationContainer}>
                <Text style={CORE_STYLE.noNotificationText}>{LANG.core.noNotifications}</Text>
            </View>
        </View>
    );
};

export default Notification;
