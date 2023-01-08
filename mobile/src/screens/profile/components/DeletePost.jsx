import React, {useState, useRef} from 'react';
import {Text, Keyboard} from 'react-native';
import {AlertStyles} from '../../../theme/Styles';
import {useSelector} from 'react-redux';
import {request} from '../../../shared/Api';
import {langFileSelector} from '../../../shared/lang';
import {ModalPopUp} from '../../../components/BottomModal';
import {themeSelector} from '../../../theme';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import BottomModal, {AlertPopUp} from '../../../components/BottomModal';
import THEME_CONFIG from '../../../theme/themes.json';

export const DeletePost = ({post, refreshData}) => {
    //styles
    const ALERT_STYLE = AlertStyles();

    //redux selectors
    const THEME = themeSelector();
    const LANG = langFileSelector();
    const userToken = useSelector(state => state.sessionUser.accessToken);

    //modal dismiss function
    const {dismissAll} = useBottomSheetModal();

    //ref
    const sheetRef = useRef(null);

    //state variables
    const [message, setMessage] = useState('');

    //handle delete post request
    const handlePost = () => {
        Keyboard.dismiss();
        request
            .delete(`/posts/${post.id}`, {
                headers: {
                    Authorization: userToken ? 'Bearer ' + userToken : '',
                },
            })
            .then(function () {
                setMessage('');
                dismissAll();
                refreshData();
            })
            .catch(function (error) {
                if (!error.response) {
                    setMessage(LANG.authScreen.pleaseTryLater);
                    sheetRef.current?.present();
                }
            });
    };
    //render
    return (
        <>
            <ModalPopUp
                modalTitle={LANG.profile.logoutMessage}
                actionMessage={LANG.core.delete}
                actionStyle={{
                    color: THEME_CONFIG[THEME].error.textColor,
                }}
                action={() => {
                    handlePost();
                }}>
                <Text style={ALERT_STYLE.alertMessage}>
                    {LANG.profile.deletePostMessage}
                </Text>
            </ModalPopUp>
            <BottomModal
                detached={true}
                component={<AlertPopUp message={message} />}
                sheetRef={sheetRef}
            />
        </>
    );
};

export default DeletePost;
