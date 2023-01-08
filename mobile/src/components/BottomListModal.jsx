import React, {useCallback, useMemo} from 'react';
import {
    BottomSheetModal,
    BottomSheetScrollView,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {CoreStyles} from '../theme/Styles';

const BottomListModal = props => {
    //styles
    const CORE_STYLE = CoreStyles();

    //variables
    const snapPoints = useMemo(() => ['70%'], []);

    // callbacks
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
    //render
    return (
        <BottomSheetModal
            ref={props.sheetRef}
            index={0}
            backgroundStyle={CORE_STYLE.bottomSheetContainer}
            handleIndicatorStyle={CORE_STYLE.bottomSheetIndicator}
            keyboardBehavior="fillParent"
            keyboardBlurBehavior="restore"
            backdropComponent={renderBackdrop}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            enableDismissOnClose={true}
            onChange={handleSheetChange}>
            <BottomSheetScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={CORE_STYLE.bottomSheetContent}>
                {props.component}
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
};

export default BottomListModal;
