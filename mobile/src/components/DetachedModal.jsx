import React, {useRef, useMemo} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const DetachedModal = props => {
    const modalRef = useRef(null);
    const snapPoints = useMemo(() => ['25%'], []);
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={modalRef}
                snapPoints={snapPoints}
                detached={true}
                style={styles.sheetContainer}>
                <View style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheet>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    sheetContainer: {
        marginHorizontal: 24,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default DetachedModal;
