import React, {useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import {
    BottomSheetModal,
    BottomSheetBackdrop,
    useBottomSheetDynamicSnapPoints,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import {CoreStyles, AlertStyles} from '../theme/Styles';
import {langFileSelector} from '../shared/lang';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import Button from '../components/Button';

//Pop up alert content for the modal
export const AlertPopUp = ({message}) => {
    //styles
    const ALERT_STYLE = AlertStyles();

    //redux data selector
    const LANG = langFileSelector();

    //bottom seet modal dismiss method
    const {dismissAll} = useBottomSheetModal();

    //render
    return (
        <View style={ALERT_STYLE.alertContainer}>
            <Text style={ALERT_STYLE.alertMessageTitle}>
                {LANG.alert.alertMessageTitle}
            </Text>
            <Text style={ALERT_STYLE.alertMessage}>{message}</Text>
            <View style={ALERT_STYLE.alertButtonContainer}>
                <Button
                    customeStyle={ALERT_STYLE.alertButton}
                    buttonStyle="buttonSolid"
                    buttonTheme="noneThemeButton"
                    onPress={dismissAll}>
                    <Text style={ALERT_STYLE.alertButtonText}>
                        {LANG.alert.ok}
                    </Text>
                </Button>
            </View>
        </View>
    );
};

//Popup modal for a custom message and action
export const ModalPopUp = props => {
    //styles
    const ALERT_STYLE = AlertStyles();

    //redux data selector
    const LANG = langFileSelector();

    //bottom seet modal dismiss method
    const {dismissAll} = useBottomSheetModal();

    //render
    return (
        <View style={ALERT_STYLE.alertContainer}>
            <Text style={ALERT_STYLE.alertMessageTitle}>
                {props.modalTitle}
            </Text>
            <View style={ALERT_STYLE.alertMessage}>{props.children}</View>
            {props.action ? (
                <View style={ALERT_STYLE.alertButtonContainer}>
                    <Button
                        styles={ALERT_STYLE.alertButton}
                        buttonStyle="buttonSolid"
                        buttonTheme="noneThemeButton"
                        onPress={dismissAll}>
                        <Text style={ALERT_STYLE.alertButtonText}>
                            {LANG.alert.cancel}
                        </Text>
                    </Button>
                    <Button
                        styles={ALERT_STYLE.alertButton}
                        buttonStyle="buttonSolid"
                        buttonTheme="noneThemeButton"
                        onPress={props.action}>
                        <Text
                            style={[
                                ALERT_STYLE.alertButtonText,
                                props.actionStyle,
                            ]}>
                            {props.actionMessage}
                        </Text>
                    </Button>
                </View>
            ) : (
                <View style={ALERT_STYLE.alertButtonContainer}>
                    <Button
                        styles={ALERT_STYLE.alertButton}
                        buttonStyle="buttonSolid"
                        buttonTheme="noneThemeButton"
                        onPress={dismissAll}>
                        <Text style={ALERT_STYLE.alertButtonText}>
                            {LANG.alert.ok}
                        </Text>
                    </Button>
                </View>
            )}
        </View>
    );
};

//bottom seet content renderer
const BottomSheetContent = props => {
    //styles
    const CORE_STYLE = CoreStyles(props);

    //variables
    const snapPoints = useMemo(
        () => [props.detached ? '60%' : 'CONTENT_HEIGHT'],
        [],
    );

    //handllers
    const handleSheetChange = useCallback(index => {}, []);
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        [],
    );

    //bottom shee dynamic height
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(snapPoints);

    //render
    return (
        <BottomSheetModal
            backgroundStyle={CORE_STYLE.bottomSheetContainer}
            handleIndicatorStyle={CORE_STYLE.bottomSheetIndicator}
            ref={props.sheetRef}
            index={0}
            detached={props.detached ? props.detached : false}
            enableDismissOnClose={true}
            keyboardBlurBehavior="restore"
            backdropComponent={
                props.detached || props.backdrop ? renderBackdrop : ''
            }
            onChange={handleSheetChange}
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
            enablePanDownToClose={true}>
            <BottomSheetView
                style={CORE_STYLE.bottomSheetContent}
                onLayout={handleContentLayout}>
                {props.component}
            </BottomSheetView>
        </BottomSheetModal>
    );
};

export default BottomSheetContent;
