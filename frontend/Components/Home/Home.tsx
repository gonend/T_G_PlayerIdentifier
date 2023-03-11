import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { UserContext } from '../../App';
import Navbar from '../Navbar/Navbar';
import { Timeout } from '../NewPlayerScan/NewPlayerScan';
import PlayersHistoryModal from '../PlayersHistoryModal/PlayersHistoryModal';
import { PORT, SERVER_IP_ADDRESS } from '@env';

function Home(props: any) {
    let userContext = React.useContext(UserContext);
    const navigation = props.navigation;
    const [modalVisible, setModalVisible] = useState(false);
    const [userPlayersHistoryObject, setUserPlayersHistoryObject] =
        useState<{}>({});
    // const [userHistoryPlayersArr, setUserHistoryPlayersArr] = useState<
    //     string[]
    // >([]);

    const [historyPlayerNameChosen, setHistoryPlayerNameChosen] = useState('');

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const navigateToNewPlayerScan = () => {
        navigation.navigate('NewPlayerScan');
    };

    const getHistoryPlayerStats = async () => {
        try {
            let response = await axios({
                method: 'get',
                url: `http://${SERVER_IP_ADDRESS}:${PORT}/api/getStatsByPlayerName`,
                headers: {
                    Authorization: `Bearer ${userContext.idToken}`
                },
                params: { playerName: historyPlayerNameChosen },
                signal: Timeout(15).signal

                // data: { playerName: playerName }
            });
            const playerData = response?.data;

            console.log(playerData);

            navigation.navigate('PlayerInfoScreen', {
                playerData
            });
        } catch (error) {
            console.log(error);
        }
    };

    // const getCurrentTokenForUser = async () => {
    //     // let token = await userContext.userObject?.getIdToken(true);
    //     console.log('token for this user is:');
    //     console.log('//////////////Start of token//////////////');
    //     console.log(userContext.idToken);
    //     console.log('//////////////End of token//////////////');
    //     // console.log(userContext.userObject.user);
    // };

    // useEffect(() => {
    //     getCurrentTokenForUser();
    // }, []);

    const getUserSearchHistory = async () => {
        try {
            let response = await axios({
                method: 'get',
                url: `http://${SERVER_IP_ADDRESS}:${PORT}/api/getUserPlayersHistory`,
                headers: {
                    Authorization: `Bearer ${userContext.idToken}`
                },
                signal: Timeout(10).signal
            });
            userContext.setUserHistoryPlayersArr(
                Object.values(response?.data.players)
            );
        } catch (error) {
            console.log('error while getting user search history');
            console.log(error);
        }
    };

    useEffect(() => {
        getUserSearchHistory();
    }, []);

    useEffect(() => {
        if (historyPlayerNameChosen.length > 0) {
            getHistoryPlayerStats();
        }
    }, [historyPlayerNameChosen]);

    // useEffect(() => {
    //     if (userPlayersHistoryObject) {
    //         let playersArr: string[] = Object.values(userPlayersHistoryObject);
    //         userContext.setUserHistoryPlayersArr(playersArr);
    //     }
    // }, [userPlayersHistoryObject]);

    return (
        <View style={styles.container}>
            <Navbar navigation={navigation} />

            <View style={styles.upperTexts}>
                <Text style={styles.WelcomeText}>
                    {`Welcome ${userContext.userObject?.displayName}`}
                </Text>
                <Text style={styles.descriptionHeader}>
                    {
                        'If you are curious about NBA players statistics you came to the right place!'
                    }
                </Text>

                <Text style={styles.instructionsText}>
                    {
                        'You can scan a new player or pick a player you already searched for.\nJust pick the option thats right for you.'
                    }
                </Text>
            </View>
            <View style={styles.horizontalRulerView}></View>

            <View style={styles.buttonsView}>
                <TouchableOpacity
                    onPress={toggleModal}
                    style={styles.scanNewPlayerButton}
                >
                    <Image
                        style={styles.buttonIcon}
                        source={{
                            uri: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/clock_history.png'
                        }}
                    />
                    <Text style={styles.scanNewPlayerButtonText}>
                        {'My players history'}
                    </Text>
                </TouchableOpacity>
                {modalVisible === true ? (
                    <PlayersHistoryModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        navigation={navigation}
                        setHistoryPlayerNameChosen={setHistoryPlayerNameChosen}
                    />
                ) : (
                    <></>
                )}

                <TouchableOpacity
                    onPress={navigateToNewPlayerScan}
                    style={styles.scanNewPlayerButton}
                >
                    <Image
                        style={styles.buttonIcon}
                        source={{
                            uri: 'https://icons.iconarchive.com/icons/hopstarter/button/256/Button-Add-icon.png'
                        }}
                    />
                    <Text style={styles.scanNewPlayerButtonText}>
                        {'Scan new player'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: { flex: 1 },
    upperTexts: { alignItems: 'center', marginHorizontal: 20 },
    WelcomeText: { fontSize: 30, textAlign: 'center' },
    descriptionHeader: { fontSize: 20, marginTop: 10, textAlign: 'center' },
    instructionsText: { marginTop: 10 },
    buttonsView: { marginTop: 0 },
    scanNewPlayerButton: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        paddingHorizontal: 34,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scanNewPlayerButtonText: {
        color: '#b97272',
        fontSize: 20
    },
    buttonIcon: {
        height: 24,
        width: 24,
        marginRight: 5,
        marginTop: 10
    },
    horizontalRulerView: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#1850AB',
        backgroundColor: '#1850AB',
        borderWidth: 1.5,

        marginTop: height * 0.024068
    }
});
export default Home;
