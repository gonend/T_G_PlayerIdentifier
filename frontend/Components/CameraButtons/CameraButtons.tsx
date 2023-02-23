import React, { useCallback, useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Text } from 'react-native-animatable';
// Import Image Picker
import {
    ImagePickerResponse,
    launchCamera,
    launchImageLibrary,
    OptionsCommon
} from 'react-native-image-picker';

import LinearGradient from 'react-native-linear-gradient';

export default function Camera(props: any) {
    const pickerResponse = props.pickerResponse;
    const setPickerResponse = props.setPickerResponse;

    const onImageLibraryPress = useCallback(() => {
        const options: OptionsCommon = {
            mediaType: 'photo',
            includeBase64: false
        };
        launchImageLibrary(options, setPickerResponse);
    }, []);

    const onCameraPress = React.useCallback(() => {
        const options: OptionsCommon = {
            mediaType: 'photo',
            includeBase64: false
        };
        launchCamera(options, setPickerResponse);
    }, []);

    return (
        <View style={styles.ViewWrapper}>
            <TouchableOpacity
                onPress={onImageLibraryPress}
                style={styles.ButtonContainer}
            >
                <Image
                    style={styles.ButtonIcon}
                    source={require('../../assets/img/photoAddPic.png')}
                />
                <Text style={styles.ButtonText}>{'Use Gallery'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onCameraPress}
                style={styles.ButtonContainer}
            >
                <Image
                    style={styles.ButtonIcon}
                    source={{
                        uri: 'https://freeiconshop.com/wp-content/uploads/edd/camera-outline-filled.png'
                    }}
                />

                <Text style={styles.ButtonText}>{'Use Camera'}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    ViewWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    ButtonContainer: {
        borderRadius: 4,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ButtonText: {
        color: '#b97272',
        fontSize: 20
    },
    ButtonIcon: {
        height: 40,
        width: 40,
        marginRight: 5
    }
});
