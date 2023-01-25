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
        <View style={styles.buttonsContainer}>
            <TouchableOpacity
                onPress={onImageLibraryPress}
                style={styles.takePictureButton}
            >
                <Image
                    style={styles.buttonIcon}
                    source={require('../../assets/img/photoAddPic.png')}
                />
                <Text style={styles.takePictureButtonText}>
                    {'Use Gallery'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onCameraPress}
                style={styles.takePictureButton}
            >
                <Image
                    style={styles.buttonIcon}
                    source={{
                        uri: 'https://freeiconshop.com/wp-content/uploads/edd/camera-outline-filled.png'
                    }}
                />

                <Text style={styles.takePictureButtonText}>{'Use Camera'}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    takePictureButton: {
        // backgroundColor: 'white',
        borderRadius: 4,
        // paddingHorizontal: 34,
        paddingVertical: 16,
        flexDirection: 'row'
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    takePictureButtonText: {
        color: '#b97272',
        fontSize: 20
    },
    buttonIcon: {
        height: 40,
        width: 40,
        marginRight: 5
    }
});
