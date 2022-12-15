import React, {useState, useRef} from 'react';
import {Text, Pressable, View, Keyboard} from 'react-native';
import BottomSheetInput from '../../../components/BottomSheetInput';
import Button from '../../../components/Button';
import {request} from '../../../shared/Api';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    TogglePasswordVisibility,
    ToggleRePasswordVisibility,
} from '../../../components/InputFunctions';
import {themeSelector} from '../../../theme';
import {langFileSelector} from '../../../shared/lang';
import {AuthStyles} from '../../../theme/Styles';
import BottomModal, {AlertPopUp} from '../../../components/BottomModal';

const THEME_CONFIG = require('../../../theme/themes.json');

const SignupComponent = () => {
    const THEME = themeSelector();
    const LANG = langFileSelector();
    const sheetRef = useRef(null);
    const {passwordVisibility, rightIcon, handlePasswordVisibility} =
        TogglePasswordVisibility();
    const {rePasswordVisibility, reRightIcon, handleRePasswordVisibility} =
        ToggleRePasswordVisibility();
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const [message, setMessage] = useState('');

    //handles the signup request and showes appropriate message in case of error
    const handleRegister = () => {
        Keyboard.dismiss();
        request
            .post('/register', {
                username: username,
                email: email,
                password: password,
            })
            .then(function () {
                setMessage(LANG.authScreen.signupSuccess);
                sheetRef.current?.present();
            })
            .catch(function (error) {
                if (
                    username == null ||
                    password == null ||
                    email == null ||
                    rePassword != password
                ) {
                    setUsername('');
                    setEmail('');
                    setPassword('');
                } else if (error.response.data.errors['username']) {
                    setUsername('');
                    setMessage(String(error.response.data.errors['username']));
                    sheetRef.current?.present();
                } else if (error.response.data.errors['email']) {
                    setEmail('');
                    setMessage(
                        String(error.response.data.errors['usernaemailme']),
                    );
                    sheetRef.current?.present();
                } else if (error.response.data.errors['password']) {
                    setPassword('');
                    setMessage(String(error.response.data.errors['password']));
                    sheetRef.current?.present();
                }
            });
    };

    return (
        <>
            <View
                style={[
                    AuthStyles().authSheetContainer,
                    {backgroundColor: THEME_CONFIG[THEME].background},
                ]}>
                <Text
                    style={[
                        AuthStyles().welcomeText,
                        {color: THEME_CONFIG[THEME].text},
                    ]}>
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
                    error={email == ''}
                    errorMessage="Email field is require!"
                    placeholder={LANG.authScreen.emailField}
                    cursorColor={THEME_CONFIG[THEME].primary}
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    textContentType="email"
                    onChangeText={value => setEmail(value)}
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
                <BottomSheetInput
                    error={rePassword != password}
                    errorMessage="Password field does not match!"
                    placeholder={LANG.authScreen.rePasswordField}
                    cursorColor={THEME_CONFIG[THEME].primary}
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    autoCorrect={false}
                    secureTextEntry={rePasswordVisibility}
                    textContentType="password"
                    onChangeText={value => setRePassword(value)}
                    icon={
                        <Pressable onPress={handleRePasswordVisibility}>
                            <MaterialCommunityIcons
                                name={reRightIcon}
                                size={22}
                                color={THEME_CONFIG[THEME].extra}
                            />
                        </Pressable>
                    }
                />
                <Button
                    styles={AuthStyles().submitButton}
                    text={LANG.authScreen.signup}
                    buttonStyle="buttonSolid"
                    buttonTheme={
                        username == '' ||
                        password == '' ||
                        email == '' ||
                        rePassword != password
                            ? 'buttonDisabled'
                            : 'buttonPrimary'
                    }
                    onPress={
                        username == '' ||
                        password == '' ||
                        email == '' ||
                        rePassword != password
                            ? null
                            : () => {
                                  handleRegister();
                              }
                    }
                />
                <Text
                    style={[
                        AuthStyles().forgotPasswordText,
                        {color: THEME_CONFIG[THEME].text},
                    ]}>
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

export default SignupComponent;
