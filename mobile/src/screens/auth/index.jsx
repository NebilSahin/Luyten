import React, {useEffect, useRef, useState, useCallback} from 'react';
import {CrossfadeImage} from 'react-native-crossfade-image';
import {Text, View, Image} from 'react-native';
import Login from '../auth/components/Login';
import Signup from '../auth/components/Signup';
import Button from '../../components/Button';
import BottomModal from '../../components/BottomModal';
import {langFileSelector} from '../../shared/lang';
import {AuthStyles} from '../../theme/Styles';
import {themeSelector} from '../../theme';
import {THEME_CONSTANT} from '../../shared/Constant';

//app logo
const logo = require('../../../assets/logo.png');

//background images
const backgroundImagesDarkArr = [
    require('../../../assets/bgImageDark-1.png'),
    require('../../../assets/bgImageDark-2.png'),
    require('../../../assets/bgImageDark-3.png'),
];

const Auth = () => {
    //styles
    const AUTH_STYLE = AuthStyles();

    //redux data selector
    const THEME = themeSelector();
    const LANG = langFileSelector();

    //ref variables
    const bottomRef = useRef(null);

    //state variables
    const [authsheetContent, setAuthsheetContent] = useState(null);
    const [imageSource, setImageSource] = useState(0);

    //handles what happens when each of the buttons are pressed
    const handleSnapPress = useCallback(sheetComponent => {
        setAuthsheetContent(sheetComponent);
        bottomRef.current?.present();
    }, []);

    //image cycle effect
    useEffect(() => {
        let interval;
        if (!interval) {
            interval = setInterval(() => {
                const newIndex =
                    imageSource + 1 === backgroundImagesDarkArr.length
                        ? 0
                        : imageSource + 1;
                setImageSource(newIndex);
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [imageSource]);

    //render
    return (
        <>
            <CrossfadeImage
                style={AUTH_STYLE.backgroundImage}
                source={backgroundImagesDarkArr[imageSource]}
                resizeMode="cover"
            />
            <View style={AUTH_STYLE.screenContainer}>
                <View style={AUTH_STYLE.titleContainer}>
                    <Image
                        source={logo}
                        style={AUTH_STYLE.logo}
                        resizeMode="contain"
                    />
                    <Text style={[AUTH_STYLE.titleText]}>
                        {LANG.authScreen.title}
                    </Text>
                    <Text style={[AUTH_STYLE.subtitleText]}>
                        {LANG.authScreen.subtitle}
                    </Text>
                </View>
                <View style={AUTH_STYLE.buttonContainer}>
                    <Button
                        customeStyle={AUTH_STYLE.button}
                        text={LANG.authScreen.login}
                        buttonStyle="buttonOutline"
                        buttonTheme="buttonSecondaryOutline"
                        onPress={() => handleSnapPress(<Login />)}
                    />
                    <Button
                        customeStyle={AUTH_STYLE.button}
                        text={LANG.authScreen.signup}
                        buttonStyle="buttonSolid"
                        buttonTheme="buttonPrimary"
                        onPress={() => handleSnapPress(<Signup />)}
                    />
                </View>
            </View>
            <BottomModal component={authsheetContent} sheetRef={bottomRef} />
        </>
    );
};

export default Auth;
