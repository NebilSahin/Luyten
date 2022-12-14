import React, {useState, useRef} from 'react';
import {Text, Pressable, Keyboard, View} from 'react-native';
import BottomSheetInput from '../../../components/BottomSheetInput';
import Button from '../../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TogglePasswordVisibility} from '../../../components/InputFunctions';
import {themeSelector} from '../../../theme';
import {useDispatch} from 'react-redux';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {request} from '../../../shared/Api';
import {
    sessionUserProfileAction,
    sessionAccessTokenAction,
} from '../../../redux/actions/UserActions';
import {langFileSelector} from '../../../shared/lang';
import BottomModal, {AlertPopUp} from '../../../components/BottomModal';
import {AuthStyles} from '../../../theme/Styles';
import THEME_CONFIG from '../../../theme/themes.json';

const LoginComponent = () => {
    //styles
    const AUTH_STYLE = AuthStyles();

    //redux data selector
    const THEME = themeSelector();
    const LANG = langFileSelector();

    //modal dismiss hook
    const {dismiss} = useBottomSheetModal();

    //redux dispatcher
    const dispatch = useDispatch();

    //state variables
    const [loginForm, setLoginForm] = useState({
        username: null,
        password: null,
    });
    const [message, setMessage] = useState('');

    //ref
    const sheetRef = useRef(null);

    //password visibility function
    const {passwordVisibility, rightIcon, handlePasswordVisibility} =
        TogglePasswordVisibility();

    //handling the login request and show the popup modal with the appropiate error message
    const handleLogin = () => {
        Keyboard.dismiss();
        request
            .post('/login', {
                username: loginForm.username,
                password: loginForm.password,
            })
            .then(function (response) {
                if (response.data['access_token']) {
                    dismiss();
                    dispatch(sessionUserProfileAction(response.data));
                    dispatch(
                        sessionAccessTokenAction(response.data.access_token),
                    );
                    dispatch({type: 'user/sessionActiveState'});
                } else {
                    setMessage(LANG.authScreen.incorrectCredentials);
                    sheetRef.current?.present();
                }
            })
            .catch(function (error) {
                if (!error.response) {
                    setMessage(LANG.authScreen.pleaseTryLater);
                    sheetRef.current?.present();
                }
                setLoginForm(loginForm => ({
                    ...loginForm,
                    username: '',
                    password: '',
                }));
            });
    };

    //render
    return (
        <>
            <View style={AUTH_STYLE.SheetContainer}>
                <Text style={AUTH_STYLE.bottomSheetTitle}>
                    {LANG.authScreen.welcomeMessage}
                </Text>
                <BottomSheetInput
                    maxLength={40}
                    error={loginForm.username == ''}
                    errorMessage={LANG.authScreen.usernameError}
                    placeholder={LANG.authScreen.usernameField}
                    cursorColor={
                        loginForm.username == ''
                            ? THEME_CONFIG[THEME].error.textColor
                            : THEME_CONFIG[THEME].primary
                    }
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    textContentType="username"
                    value={loginForm.username}
                    onChangeText={value =>
                        setLoginForm(loginForm => ({
                            ...loginForm,
                            username: value,
                        }))
                    }
                    icon={
                        <Icon
                            name="account"
                            size={22}
                            color={THEME_CONFIG[THEME].extra}
                        />
                    }
                />
                <BottomSheetInput
                    maxLength={40}
                    error={loginForm.password == ''}
                    errorMessage={LANG.authScreen.passwordError}
                    placeholder={LANG.authScreen.passwordField}
                    cursorColor={
                        loginForm.password == ''
                            ? THEME_CONFIG[THEME].error.textColor
                            : THEME_CONFIG[THEME].primary
                    }
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    textContentType="password"
                    value={loginForm.password}
                    onChangeText={value =>
                        setLoginForm(loginForm => ({
                            ...loginForm,
                            password: value,
                        }))
                    }
                    icon={
                        <Pressable onPress={handlePasswordVisibility}>
                            <Icon
                                name={rightIcon}
                                size={22}
                                color={THEME_CONFIG[THEME].extra}
                            />
                        </Pressable>
                    }
                />
                <Button
                    customeStyle={AUTH_STYLE.submitButton}
                    text={LANG.authScreen.login}
                    buttonStyle="buttonSolid"
                    buttonTheme={
                        loginForm.username == '' || loginForm.password == ''
                            ? 'buttonDisabled'
                            : 'buttonPrimary'
                    }
                    onPress={
                        loginForm.username == '' || loginForm.password == ''
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
                component={<AlertPopUp message={message} />}
                sheetRef={sheetRef}
            />
        </>
    );
};

export default LoginComponent;
