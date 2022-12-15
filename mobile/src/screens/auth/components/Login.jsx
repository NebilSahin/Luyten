import React, {useState, useRef} from 'react';
import {Text, Pressable, Keyboard, View} from 'react-native';
import BottomSheetInput from '../../../components/BottomSheetInput';
import Button from '../../../components/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TogglePasswordVisibility} from '../../../components/InputFunctions';
import {themeSelector} from '../../../theme';
import {useDispatch} from 'react-redux';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {request} from '../../../shared/Api';
import {sessionAccessTokenAction} from '../../../redux/actions/UserActions';
import {langFileSelector} from '../../../shared/lang';
import BottomModal, {AlertPopUp} from '../../../components/BottomModal';
import {AuthStyles} from '../../../theme/Styles';
const THEME_CONFIG = require('../../../theme/themes.json');

const LoginComponent = () => {
    const {dismiss} = useBottomSheetModal();
    const dispatch = useDispatch();
    const THEME = themeSelector();
    const LANG = langFileSelector();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [message, setMessage] = useState('');
    const sheetRef = useRef(null);
    const AUTH_STYLE = AuthStyles();
    const {passwordVisibility, rightIcon, handlePasswordVisibility} =
        TogglePasswordVisibility();

    //handling the login request and show the popup modal with the appropiate error message
    const handleLogin = () => {
        Keyboard.dismiss();
        request
            .post('/login', {
                username: username,
                password: password,
            })
            .then(function (response) {
                if (response.data['access_token']) {
                    dismiss();
                    dispatch(
                        sessionAccessTokenAction(response.data['access_token']),
                    );
                    dispatch({type: 'user/sessionActiveState'});
                } else {
                    setMessage(LANG.authScreen.incorrectCredentials);
                    sheetRef.current?.present();
                }
            })
            .catch(function () {
                setUsername('');
                setPassword('');
            });
    };

    return (
        <>
            <View style={AUTH_STYLE.authSheetContainer}>
                <Text style={AUTH_STYLE.welcomeText}>
                    {LANG.authScreen.welcomeMessage}
                </Text>
                <BottomSheetInput
                    error={username == ''}
                    errorMessage="Username field is require!"
                    placeholder={LANG.authScreen.usernameField}
                    cursorColor={
                        username == ''
                            ? THEME_CONFIG[THEME].error.textColor
                            : THEME_CONFIG[THEME].primary
                    }
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    textContentType="username"
                    value={username}
                    onChangeText={value => setUsername(value)}
                />
                <BottomSheetInput
                    error={password == ''}
                    errorMessage="Password field is require!"
                    placeholder={LANG.authScreen.passwordField}
                    cursorColor={
                        password == ''
                            ? THEME_CONFIG[THEME].error.textColor
                            : THEME_CONFIG[THEME].primary
                    }
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    textContentType="password"
                    value={password}
                    onChangeText={value => setPassword(value)}
                    icon={
                        <Pressable onPress={handlePasswordVisibility}>
                            <MaterialCommunityIcons
                                name={rightIcon}
                                size={22}
                                color={THEME_CONFIG[THEME].extra}
                            />
                        </Pressable>
                    }
                />
                <Button
                    styles={AUTH_STYLE.submitButton}
                    text={LANG.authScreen.login}
                    buttonStyle="buttonSolid"
                    buttonTheme={
                        username == '' || password == ''
                            ? 'buttonDisabled'
                            : 'buttonPrimary'
                    }
                    onPress={
                        username == '' || password == ''
                            ? null
                            : () => {
                                  handleLogin();
                              }
                    }
                />
                <Text style={AUTH_STYLE.forgotPasswordText}>
                    {LANG.authScreen.forgotPassword}
                </Text>
            </View>
            <BottomModal
                detached={true}
                componentRef={<AlertPopUp message={message} />}
                sheetRef={sheetRef}
            />
        </>
    );
};

export default LoginComponent;
