import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import CameraButtons from '../CameraButtons/CameraButtons';

export default function NewPlayerScan() {
    const [pickerResponse, setPickerResponse] = useState<ImagePickerResponse>();
    const [playerNumber, setPlayerNumber] = useState('');
    useEffect(() => {
        if (pickerResponse) {
            pickerResponse.assets?.map((img) => {
                console.log(img.uri);
            });
        }
    }, [pickerResponse]);

    function submitPlayerForIdentification() {}
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#28449C', '#0064C3']}
            style={styles.linearGradient}
        >
            <View style={styles.topContent}>
                <View style={styles.logoImgView}>
                    <Image
                        style={styles.logoPic}
                        source={require('../../assets/img/newPlayerScanLogo.png')}
                    />
                </View>
                <Text style={styles.descriptionText}>
                    {
                        'Please upload a picture of a player.\nThe picture has to be as clear as possible'
                    }
                </Text>
            </View>

            {pickerResponse !== null ? (
                <View style={{ alignItems: 'center' }}>
                    {pickerResponse?.assets?.map((img) => {
                        return (
                            <View key={1}>
                                <Text
                                    style={{
                                        color: 'white',
                                        textAlign: 'center',
                                        marginTop: 10,
                                        marginBottom: 10
                                    }}
                                >
                                    Selected picture:
                                </Text>
                                <Image
                                    style={{
                                        width: 250,
                                        height: 250
                                    }}
                                    source={{ uri: img.uri }}
                                />
                            </View>
                        );
                    })}
                </View>
            ) : (
                <></>
            )}

            <CameraButtons
                pickerResponse={pickerResponse}
                setPickerResponse={setPickerResponse}
            />
            <TextInput
                style={styles.numberInput}
                placeholder="Shirt number (Optional)"
                onChangeText={(newText) => setPlayerNumber(newText)}
                defaultValue={playerNumber}
                placeholderTextColor={'#132D42'}
            />

            <TouchableOpacity
                onPress={submitPlayerForIdentification}
                style={styles.submitButton}
            >
                <Image
                    style={styles.submitButtonIcon}
                    source={{
                        uri: 'https://icon-library.com/images/submit-button-icon-png/submit-button-icon-png-0.jpg'
                    }}
                />
            </TouchableOpacity>
            {/* <Text>asfsa</Text> */}
        </LinearGradient>
    );
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    linearGradient: { flex: 1, justifyContent: 'space-between' },
    topContent: {
        flex: 0.66,
        marginTop: 20,
        alignItems: 'center'
    },
    logoImgView: {
        flex: 0.66,
        marginTop: height * 0.0427795,
        maxHeight: height * 0.210559
    },
    logoPic: { flex: 1, Width: null, Height: null, resizeMode: 'contain' },
    descriptionText: {
        color: '#FFFFFF',
        fontSize: 21,
        marginTop: 20,
        textAlign: 'center'
    },
    numberInput: {
        backgroundColor: 'white',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        fontFamily: 'OpenSans-Regular',
        color: '#132D42',
        borderRadius: 10,
        marginHorizontal: width * 0.0533333333,
        fontSize: height * 0.02484472,
        textAlign: 'center'
        // paddingRight: width * 0.03733333,
    },
    submitButton: { flex: 0.2 },
    // submitButtonText: {
    //     color: '#b97272',
    //     fontSize: 20
    // },
    submitButtonIcon: { flex: 0.95, resizeMode: 'contain' }
    // picturePreviewView: { flex: 1 }
});
