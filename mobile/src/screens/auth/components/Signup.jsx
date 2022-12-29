import React, {useState, useRef} from 'react';
import {Text, Pressable, View, Keyboard} from 'react-native';
import BottomSheetInput from '../../../components/BottomSheetInput';
import Button from '../../../components/Button';
import {request} from '../../../shared/Api';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    const [signUpForm, setSignUpForm] = useState({
        username: null,
        email: null,
        password: null,
        rePassword: null,
    });
    const [message, setMessage] = useState('');

    //handles the signup request and showes appropriate message in case of error
    const handleRegister = () => {
        Keyboard.dismiss();
        request
            .post('/register', {
                username: signUpForm.username,
                email: signUpForm.email,
                password: signUpForm.password,
            })
            .then(function () {
                setMessage(LANG.authScreen.signupSuccess);
                sheetRef.current?.present();
            })
            .catch(function (error) {
                if (!error.response) {
                    setMessage(LANG.authScreen.pleaseTryLater);
                    sheetRef.current?.present();
                } else if (
                    signUpForm.username == null ||
                    signUpForm.password == null ||
                    signUpForm.email == null ||
                    signUpForm.rePassword != signUpForm.password
                ) {
                    setSignUpForm(signUpForm => ({
                        ...signUpForm,
                        username: '',
                        email: '',
                        password: '',
                    }));
                } else if (error.response.data.errors['username']) {
                    setSignUpForm(signUpForm => ({
                        ...signUpForm,
                        username: null,
                    }));
                    setMessage(String(error.response.data.errors['username']));
                    sheetRef.current?.present();
                } else if (error.response.data.errors['email']) {
                    setSignUpForm(signUpForm => ({
                        ...signUpForm,
                        email: null,
                    }));
                    setMessage(
                        String(error.response.data.errors['usernaemailme']),
                    );
                    sheetRef.current?.present();
                } else if (error.response.data.errors['password']) {
                    setSignUpForm(signUpForm => ({
                        ...signUpForm,
                        password: null,
                    }));
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
                    maxLength={40}
                    error={signUpForm.username == ''}
                    errorMessage={LANG.authScreen.usernameError}
                    placeholder={LANG.authScreen.usernameField}
                    cursorColor={
                        signUpForm.username == ''
                            ? THEME_CONFIG[THEME].error.textColor
                            : THEME_CONFIG[THEME].primary
                    }
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    textContentType="username"
                    value={signUpForm.username}
                    onChangeText={value =>
                        setSignUpForm(signUpForm => ({
                            ...signUpForm,
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
                    error={signUpForm.email == ''}
                    errorMessage={LANG.authScreen.emailError}
                    placeholder={LANG.authScreen.emailField}
                    cursorColor={THEME_CONFIG[THEME].primary}
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    textContentType="email"
                    value={signUpForm.email}
                    onChangeText={value =>
                        setSignUpForm(signUpForm => ({
                            ...signUpForm,
                            email: value,
                        }))
                    }
                    icon={
                        <Icon
                            name="email"
                            size={22}
                            color={THEME_CONFIG[THEME].extra}
                        />
                    }
                />
                <BottomSheetInput
                    maxLength={40}
                    error={signUpForm.password == ''}
                    errorMessage={LANG.authScreen.passwordError}
                    placeholder={LANG.authScreen.passwordField}
                    cursorColor={
                        signUpForm.password == ''
                            ? THEME_CONFIG[THEME].error.textColor
                            : THEME_CONFIG[THEME].primary
                    }
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    textContentType="password"
                    value={signUpForm.password}
                    onChangeText={value =>
                        setSignUpForm(signUpForm => ({
                            ...signUpForm,
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
                <BottomSheetInput
                    maxLength={40}
                    error={signUpForm.rePassword != signUpForm.password}
                    errorMessage={LANG.authScreen.rePasswordError}
                    placeholder={LANG.authScreen.rePasswordField}
                    cursorColor={
                        signUpForm.password == ''
                            ? THEME_CONFIG[THEME].error.textColor
                            : THEME_CONFIG[THEME].primary
                    }
                    keyboardAppearance={THEME_CONFIG[THEME].theme}
                    autoCorrect={false}
                    secureTextEntry={rePasswordVisibility}
                    textContentType="password"
                    onChangeText={value =>
                        setSignUpForm(signUpForm => ({
                            ...signUpForm,
                            rePassword: value,
                        }))
                    }
                    icon={
                        <Pressable onPress={handleRePasswordVisibility}>
                            <Icon
                                name={reRightIcon}
                                size={22}
                                color={THEME_CONFIG[THEME].extra}
                            />
                        </Pressable>
                    }
                />
                <Button
                    customeStyle={AuthStyles().submitButton}
                    text={LANG.authScreen.signup}
                    buttonStyle="buttonSolid"
                    buttonTheme={
                        signUpForm.username == '' ||
                        signUpForm.password == '' ||
                        signUpForm.email == '' ||
                        signUpForm.rePassword != signUpForm.password
                            ? 'buttonDisabled'
                            : 'buttonPrimary'
                    }
                    onPress={
                        signUpForm.username == '' ||
                        signUpForm.password == '' ||
                        signUpForm.email == '' ||
                        signUpForm.rePassword != signUpForm.password
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
                component={<AlertPopUp message={message} />}
                sheetRef={sheetRef}
            />
        </>
    );
};

export default SignupComponent;
