import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import CameraButtons from '../CameraButtons/CameraButtons';
import Spinner from 'react-native-loading-spinner-overlay';
import { PORT, SERVER_IP_ADDRESS, SERVER_URL } from '@env';
import { UserContext } from '../../App';
import Navbar from '../Navbar/Navbar';
import PictureOrNameSelector from './PictureOrNameSelector/PictureOrNameSelector';
import axios from 'axios';
import { SearchBar } from './SearchBar/SearchBar';

//to shorten time to get a timeout from the server////////////

export const Timeout = (time: number) => {
    let controller = new AbortController();
    setTimeout(() => controller.abort(), time * 1000);
    return controller;
};

///////////////////////////////////////////////////////////////

export default function NewPlayerScan(props: any) {
    //This compoenent allows a user to identify new players by their picture or by their name.
    //A user will get to this screen if autorized and pressed on the scan new player button in home screen.

    //This component includes the folowing:
    //1: a selector component that lets the user decode whether to use a player picture or a player name to identify
    //2: based on the user choice, the screen options will change respectively.
    //3: submit button that will senc the request to the backend server for identification.

    const [imagePickerResponse, setImagePickerResponse] =
        useState<ImagePickerResponse>();
    // const [playerName, setPlayerName] = useState('');
    const [formDataTest, setFormDataTest] = useState<FormData>();
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
    const navigation = props.navigation;
    let userContext = React.useContext(UserContext);
    // const [freshStart, setFreshStart] = useState(false);

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
                    response = await fetch(`${SERVER_URL}/api/uploadPicture`, {
                        method: 'post',
                        body: formDataTest,
                        headers: {
                            Authorization: `Bearer ${userContext.idToken}`
                        },
                        signal: Timeout(15).signal
                    });

                    playerData = await response.json();
                    break;

                case 'playerName':
                    console.log(
                        '/////////////playerName is:////////////////////'
                    );
                    console.log(playerNameSearchValue);

                    response = await axios({
                        method: 'get',
                        url: `${SERVER_URL}/api/getStatsByPlayerName`,
                        headers: {
                            Authorization: `Bearer ${userContext.idToken}`
                        },
                        params: { playerName: playerNameSearchValue },
                        signal: Timeout(15).signal

                        // data: { playerName: playerName }
                    });
                    playerData = response?.data;

                default:
                    break;
            }
            //Adding player to history array if its a new entery.
            //this method saves us axios calls to our backend and the history array stays updated.
            let playerNameAdditionToHistory =
                playerData.playerObject.playerInfo.first_name +
                ' ' +
                playerData.playerObject.playerInfo.last_name;

            let playerIndexInHistoryArr =
                userContext.userHistoryPlayersArr.indexOf(
                    playerNameAdditionToHistory
                );

            if (playerIndexInHistoryArr === -1) {
                userContext.setUserHistoryPlayersArr([
                    playerNameAdditionToHistory,
                    ...userContext.userHistoryPlayersArr
                ]);

                console.log(
                    'History array was updated with a new player entery.'
                );
            } else {
                //getting the last searched value to be the first in history
                let tempHistoryArr = userContext.userHistoryPlayersArr;
                tempHistoryArr.splice(playerIndexInHistoryArr, 1);
                userContext.setUserHistoryPlayersArr([
                    playerNameAdditionToHistory,
                    ...tempHistoryArr
                ]);
            }

            navigation.navigate('PlayerDetailsScreen', {
                playerData
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
        if (userContext.freshStart === true) {
            console.log('freshStart is: ' + userContext.freshStart);
            console.log('clearing data...');
            //clean all data at this screen
            setImagePickerResponse(undefined);
            setPlayerNameSearchValue('');
            setFormDataTest(undefined);
            setIsWaitingForResponse(false);
            setShowLoadingSpinner(false);
            userContext.setFreshStart(false);
        }
    }, [userContext.freshStart]);

    useEffect(() => {
        const getPlayerNamesFunction = async () => {
            try {
                // console.log( `http://${SERVER_IP_ADDRESS}:${PORT}/api/autoCompleteNames`)
                let response = await axios({
                    method: 'get',
                    url: `${SERVER_URL}/api/autoCompleteNames`,
                    headers: {
                        Authorization: `Bearer ${userContext.idToken}`
                    },
                    signal: Timeout(10).signal
                });
                setAllPlayersNames(response?.data.playerNames);
            } catch (error) {
                console.log('error while getting player names');
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
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0, y: 1 }}
            colors={['#315466', '#2a6381']}
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
                    <Navbar
                        navigation={navigation}
                        titleName={'New Scan'}
                        leftImageRole={'goBack'}
                    />
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
                                                                marginBottom:
                                                                    height *
                                                                    0.014970059,
                                                                fontFamily:
                                                                    'OpenSans-Regular'
                                                            }}
                                                        >
                                                            Selected picture:
                                                        </Text>
                                                        <Image
                                                            style={{
                                                                width:
                                                                    width *
                                                                    0.6944444444,
                                                                height:
                                                                    height *
                                                                    0.363372093,
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

                                <ScrollView
                                    style={{ maxHeight: height * 0.2180232558 }}
                                >
                                    {filteredPlayerNames?.map((playerName) => {
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
                                </ScrollView>
                            </>
                        )}
                        {formDataTest !== undefined ||
                        playerNameSearchValue.length > 0 ? (
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
                                        source={require('../../assets/img/submitButton.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <></>
                        )}
                    </ScrollView>
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
        fontSize: height * 0.0259461,
        marginTop: height * 0.02994011,
        textAlign: 'center',
        marginHorizontal: width * 0.02777777,
        fontFamily: 'OpenSans-Regular'
    },
    // nameInput: {
    //     backgroundColor: 'red',
    //     borderBottomColor: 'red',
    //     borderBottomWidth: width * 0.0027777777,
    //     fontFamily: 'OpenSans-Regular',
    //     color: '#132D42',
    //     borderRadius: width * 0.027777777,
    //     marginHorizontal: width * 0.0533333333,
    //     fontSize: height * 0.02484472,
    //     textAlign: 'center',
    //     marginTop: height * 0.02994011
    //     // paddingRight: width * 0.03733333,
    // },
    submitButton: {
        flex: 0.8
    },
    // submitButtonText: {
    //     color: '#b97272',
    //     fontSize: 20
    // },
    submitButtonIcon: {
        flex: 0.5,
        resizeMode: 'contain',
        height: height * 0.374251497,
        width: width * 0.694444444
    },
    spinnerTextStyle: { color: '#FFFFFF', fontFamily: 'OpenSans-Regular' },
    autocompleteContainer: {
        backgroundColor: '#ffffff'
    },
    itemText: {
        backgroundColor: 'white',
        borderBottomColor: '#000000',
        borderBottomWidth: width * 0.002777777,
        fontFamily: 'OpenSans-Regular',
        color: '#132D42',
        borderRadius: height * 0.0277777777,
        marginHorizontal: width * 0.0533333333,
        fontSize: height * 0.02484472,
        textAlign: 'center',
        marginTop: 0.0000000598
    }
});
