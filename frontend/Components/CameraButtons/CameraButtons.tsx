import React, { useCallback } from 'react';
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Text } from 'react-native-animatable';
import {
    launchCamera,
    launchImageLibrary,
    OptionsCommon
} from 'react-native-image-picker';

export default function Camera(props: any) {
    //This component include buttons that interact with phone camera||photo gallery
    //It is placed inside NewPlayerScan
    const setPickerResponse = props.setPickerResponse;

    const onImageLibraryPress = useCallback(() => {
        //this function is runned when a user press the image library button
        const options: OptionsCommon = {
            mediaType: 'photo',
            includeBase64: false
        };
        launchImageLibrary(options, setPickerResponse);
    }, []);

    const onCameraPress = React.useCallback(() => {
        //this function is runned when a user press the camera button
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
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    ViewWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: width * 0.05555555
    },
    ButtonContainer: {
        paddingVertical: height * 0.02395209,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ButtonText: {
        color: '#b97272',
        fontSize: height * 0.0299401
    },
    ButtonIcon: {
        height: height * 0.059880239,
        width: width * 0.11111111,
        marginRight: width * 0.01388888
    }
});
