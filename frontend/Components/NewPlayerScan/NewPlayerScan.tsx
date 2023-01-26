import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Asset, ImagePickerResponse } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import CameraButtons from '../CameraButtons/CameraButtons';

export default function NewPlayerScan() {
    const [pickerResponse, setPickerResponse] = useState<ImagePickerResponse>();
    const [playerNumber, setPlayerNumber] = useState('');
    const [selectedPicture, setSelectedPicture] = useState<Asset>();
    const [formDataTest, setFormDataTest] = useState<FormData>();

    useEffect(() => {
        if (pickerResponse) {
            const formData = new FormData();

            pickerResponse.assets?.map((img) => {
                setSelectedPicture(img);
                formData.append('photo', {
                    uri: img.uri,
                    type: img.type,
                    name: img.fileName
                });
            });
            setFormDataTest(formData);
        }
    }, [pickerResponse]);

    async function submitPlayerForIdentification() {
        // const data = new FormData();
        // data.append('photo', {
        //     uri: selectedPicture?.uri,
        //     name: 'image' + selectedPicture?.fileName,
        //     type: selectedPicture?.type
        // });
        // console.log(data.getParts());

        // const setting = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     },
        //     body: data
        // };
        try {
            console.log('sharmuta');
            console.log(formDataTest?.getParts());

            let res = await fetch(
                `http://192.168.1.57:8080/api/uploadPicture`,
                {
                    method: 'post',
                    body: formDataTest
                }
            );

            // const fetchResponse = await fetch(
            //     'http://192.168.1.57:8080/api/uploadPicture',
            //     setting
            // );
            const dr = await res.json();

            console.log('====================================');
            console.log(dr);
            console.log('====================================');
            // const response = await fetchResponse.json();
            // console.log(response);
        } catch (e) {
            console.log(e);
        }
    }
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
                keyboardType="numeric"
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
        flex: 0.55,
        alignItems: 'center'
    },
    logoImgView: {
        flex: 0.9,
        marginTop: height * 0.0427795,
        maxHeight: height * 0.210559
    },
    logoPic: { flex: 1, Width: null, Height: null, resizeMode: 'contain' },
    descriptionText: {
        color: '#FFFFFF',
        fontSize: 18,
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
