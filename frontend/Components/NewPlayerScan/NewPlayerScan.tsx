import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ImageSourcePropType,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Asset, ImagePickerResponse } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import CameraButtons from '../CameraButtons/CameraButtons';
import Spinner from 'react-native-loading-spinner-overlay';
import { PORT, SERVER_IP_ADDRESS } from '@env';
import { UserContext } from '../../App';
import Navbar from '../Navbar/Navbar';
import PictureOrNameSelector from './PictureOrNameSelector/PictureOrNameSelector';
import axios from 'axios';
import { SearchBar } from '../SearchBar/SearchBar';

//to shorten time to get a timeout from the server////////////

export const Timeout = (time: number) => {
    let controller = new AbortController();
    setTimeout(() => controller.abort(), time * 1000);
    return controller;
};

///////////////////////////////////////////////////////////////

export default function NewPlayerScan(props: any) {
    const [imagePickerResponse, setImagePickerResponse] =
        useState<ImagePickerResponse>();
    // const [playerName, setPlayerName] = useState('');
    const [formDataTest, setFormDataTest] = useState<FormData>();
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
    const navigation = props.navigation;
    let userContext = React.useContext(UserContext);
    const [freshStart, setFreshStart] = useState(false);
    const [identifyWithPicture, setIdentifyWithPicture] = useState(true);

    //////////////////////////autoComplete test/////////////////////////////////////////////
    const [allPlayersNames, setAllPlayersNames] = useState([]);
    const [filteredPlayerNames, setFilteredPlayerNames] = useState<
        Array<string>
    >([]);

    const [playerNameSearchValue, setPlayerNameSearchValue] = useState('');

    let autoCompleteKey = 1;

    //////////////////////////autoComplete test/////////////////////////////////////////////

    async function getPlayerStatsAndNavigate(pictureOrName: string) {
        setIsWaitingForResponse(true);

        let response = undefined;
        let playerData = undefined;
        try {
            switch (pictureOrName) {
                case 'picture':
                    response = await fetch(
                        `http://${SERVER_IP_ADDRESS}:${PORT}/api/uploadPicture`,
                        {
                            method: 'post',
                            body: formDataTest,
                            headers: {
                                Authorization: `Bearer ${userContext.userObject.idToken}`
                            },
                            signal: Timeout(15).signal
                        }
                    );

                    playerData = await response.json();
                    break;

                case 'playerName':
                    console.log(
                        '/////////////playerName is:////////////////////'
                    );
                    console.log(playerNameSearchValue);

                    response = await axios({
                        method: 'get',
                        url: `http://${SERVER_IP_ADDRESS}:${PORT}/api/getStatsByPlayerName`,
                        headers: {
                            Authorization: `Bearer ${userContext.userObject.idToken}`
                        },
                        params: { playerName: playerNameSearchValue },
                        signal: Timeout(15).signal

                        // data: { playerName: playerName }
                    });
                    playerData = response?.data;

                default:
                    break;
            }
            navigation.navigate('PlayerInfoScreen', {
                playerData,
                setFreshStart
            });
        } catch (error) {
            console.log(error);
            Alert.alert('bad/no response from server');
            setIsWaitingForResponse(false);
        }
    }

    async function submitPlayerForIdentification() {
        if (identifyWithPicture) {
            if (formDataTest) {
                getPlayerStatsAndNavigate('picture');
            } else Alert.alert('please add picture in order to submit');
        } else {
            if (playerNameSearchValue.length < 3)
                Alert.alert('player name must include at least 3 letters');
            else getPlayerStatsAndNavigate('playerName');
        }
    }

    useEffect(() => {
        if (imagePickerResponse) {
            const formData = new FormData();

            imagePickerResponse.assets?.map((img) => {
                formData.append('photo', {
                    uri: img.uri,
                    type: img.type,
                    name: img.fileName
                });
            });
            setFormDataTest(formData);
        }
    }, [imagePickerResponse]);

    useEffect(() => {
        if (isWaitingForResponse === true) {
            setShowLoadingSpinner(true);
        } else {
            setShowLoadingSpinner(false);
        }
    }, [isWaitingForResponse]);

    useEffect(() => {
        console.log('freshStart is: ' + freshStart);
        if (freshStart === true) {
            //clean all data at this screen
            setImagePickerResponse(undefined);
            // setPlayerName('');
            setPlayerNameSearchValue('');
            setFormDataTest(undefined);
            setIsWaitingForResponse(false);
            setShowLoadingSpinner(false);
            setFreshStart(false);
        }
    }, [freshStart]);

    useEffect(() => {
        const getPlayerNamesFunction = async () => {
            try {
                let response = await axios({
                    method: 'get',
                    url: `http://${SERVER_IP_ADDRESS}:${PORT}/api/autoCompleteNames`,
                    headers: {
                        Authorization: `Bearer ${userContext.userObject.idToken}`
                    },
                    signal: Timeout(10).signal

                    // data: { playerName: playerName }
                });
                // console.log(response?.data);
                setAllPlayersNames(response?.data.playerNames);
            } catch (error) {
                console.log(error);
            }
        };
        getPlayerNamesFunction();
    }, []);

    useEffect(() => {
        if (playerNameSearchValue.length === 0) setFilteredPlayerNames([]);
    }, [playerNameSearchValue]);

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#28449C', '#0064C3']}
            style={styles.linearGradient}
        >
            {showLoadingSpinner === true ? (
                <>
                    <Spinner
                        visible={showLoadingSpinner}
                        textContent={'Identifying...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </>
            ) : (
                <>
                    <Navbar navigation={navigation} />
                    <ScrollView>
                        <View style={styles.topContent}>
                            {/*//////////////////////if we want to put in a logo image uncomment the folowing:///////////////////////////// */}
                            {/* <View style={{ maxHeight: 100 }}>
                            <Image
                                style={{
                                    resizeMode: 'contain',
                                    maxHeight: 80,
                                    maxWidth: 80,
                                    alignSelf: 'center'
                                }}
                                source={require('../../assets/img/newPlayerScanLogo.png')}
                            />
                        </View> */}
                            {/*//////////////////////End of logo code snippet///////////////////////////// */}

                            <PictureOrNameSelector
                                identifyWithPicture={identifyWithPicture}
                                setIdentifyWithPicture={setIdentifyWithPicture}
                                setFreshStart={setFreshStart}
                            />
                        </View>

                        {identifyWithPicture === true ? (
                            <>
                                {/**View if user wants to upload playerPicture */}
                                <Text style={styles.descriptionText}>
                                    {
                                        'Please upload a picture of a player.\nThe picture has to be as clear as possible'
                                    }
                                </Text>
                                {imagePickerResponse !== null ? (
                                    <View style={{ alignItems: 'center' }}>
                                        {imagePickerResponse?.assets?.map(
                                            (img) => {
                                                return (
                                                    <View key={1}>
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                textAlign:
                                                                    'center',
                                                                marginBottom: 10
                                                            }}
                                                        >
                                                            Selected picture:
                                                        </Text>
                                                        <Image
                                                            style={{
                                                                width: 250,
                                                                height: 250,
                                                                resizeMode:
                                                                    'contain'
                                                            }}
                                                            source={{
                                                                uri: img.uri
                                                            }}
                                                        />
                                                    </View>
                                                );
                                            }
                                        )}
                                    </View>
                                ) : (
                                    <></>
                                )}

                                <CameraButtons
                                    pickerResponse={imagePickerResponse}
                                    setPickerResponse={setImagePickerResponse}
                                />
                            </>
                        ) : (
                            <>
                                {/**View if user wants to upload playerName */}
                                <Text style={styles.descriptionText}>
                                    {
                                        'Please Enter name of a player to get stats'
                                    }
                                </Text>

                                {/* <TextInput
                                    style={styles.nameInput}
                                    placeholder="NBA player name"
                                    onChangeText={(newText) =>
                                        setPlayerName(newText)
                                    }
                                    defaultValue={playerName}
                                    placeholderTextColor={'#132D42'}
                                /> */}

                                <SearchBar
                                    allNamesArray={allPlayersNames}
                                    setAllNamesArray={setAllPlayersNames}
                                    filteredPlayerNames={filteredPlayerNames}
                                    setFilteredPlayerNames={
                                        setFilteredPlayerNames
                                    }
                                    playerNameSearchValue={
                                        playerNameSearchValue
                                    }
                                    setPlayerNameSearchValue={
                                        setPlayerNameSearchValue
                                    }
                                />

                                <View>
                                    {filteredPlayerNames.map((playerName) => {
                                        return (
                                            <TouchableOpacity
                                                key={autoCompleteKey++}
                                                onPress={async () => {
                                                    setPlayerNameSearchValue(
                                                        playerName
                                                    );
                                                    setFilteredPlayerNames([]);
                                                    // setPlayerName(playerName);
                                                }}
                                            >
                                                <Text style={styles.itemText}>
                                                    {playerName}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </>
                        )}
                    </ScrollView>
                    <View
                        style={{
                            alignItems: 'center',
                            flex: 1
                        }}
                    >
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
                    </View>
                </>
            )}
        </LinearGradient>
    );
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    linearGradient: { flex: 1, justifyContent: 'space-between' },
    topContent: {
        flex: 1
        // alignItems: 'center'
    },
    // logoImgView: {
    //     flex: 0.3,
    //     marginTop: height * 0.0427795,
    //     maxHeight: height * 0.210559
    // },
    // logoPic: { flex: 0.5, Width: null, Height: null, resizeMode: 'contain' },
    descriptionText: {
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
        marginHorizontal: 10
    },
    nameInput: {
        backgroundColor: 'white',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        fontFamily: 'OpenSans-Regular',
        color: '#132D42',
        borderRadius: 10,
        marginHorizontal: width * 0.0533333333,
        fontSize: height * 0.02484472,
        textAlign: 'center',
        marginTop: 20
        // paddingRight: width * 0.03733333,
    },
    submitButton: {
        flex: 1
    },
    // submitButtonText: {
    //     color: '#b97272',
    //     fontSize: 20
    // },
    submitButtonIcon: {
        flex: 1,
        resizeMode: 'contain',
        height: 250,
        width: 250
    },
    spinnerTextStyle: { color: '#FFFFFF' },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0
    },
    itemText: {
        backgroundColor: 'white',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        fontFamily: 'OpenSans-Regular',
        color: '#132D42',
        borderRadius: 10,
        marginHorizontal: width * 0.0533333333,
        fontSize: height * 0.02484472,
        textAlign: 'center',
        marginTop: 0.5
    }
});
