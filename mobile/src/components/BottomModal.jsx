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

export const AlertPopUp = ({message}) => {
    const LANG = langFileSelector();
    const {dismissAll} = useBottomSheetModal();
    const ALERT_STYLE = AlertStyles();
    return (
        <View style={ALERT_STYLE.alertContainer}>
            <Text style={ALERT_STYLE.alertMessageTitle}>
                {LANG.alert.alertMessageTitle}
            </Text>
            <Text style={ALERT_STYLE.alertMessage}>{message}</Text>
            <View style={ALERT_STYLE.alertButtonContainer}>
                <Button
                    styles={ALERT_STYLE.alertButton}
                    text={LANG.alert.ok}
                    buttonStyle="buttonSolid"
                    buttonTheme="noneThemeButton"
                    onPress={dismissAll}
                />
            </View>
        </View>
    );
};

const BottomSheetContent = props => {
    const CORE_STYLE = CoreStyles(props);
    const snapPoints = useMemo(
        () => [props.detached ? '60%' : 'CONTENT_HEIGHT'],
        [],
    );
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
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(snapPoints);
    return (
        <BottomSheetModal
            backgroundStyle={[CORE_STYLE.bottomSheetContainer]}
            handleIndicatorStyle={CORE_STYLE.bottomSheetIndicator}
            ref={props.sheetRef}
            index={0}
            detached={props.detached ? props.detached : false}
            enableDismissOnClose={true}
            keyboardBehavior="fillParent"
            keyboardBlurBehavior="restore"
            backdropComponent={props.detached ? renderBackdrop : ''}
            onChange={handleSheetChange}
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
            enablePanDownToClose={true}>
            <BottomSheetView
                style={CORE_STYLE.bottomSheetContent}
                onLayout={handleContentLayout}>
                {props.componentRef}
            </BottomSheetView>
        </BottomSheetModal>
    );
};

export default BottomSheetContent;
