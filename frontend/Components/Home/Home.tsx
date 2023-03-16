import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
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
    //This components is accessable through app navigation
    //successfully logging in to this app will get you here (or via the app menu).
    //This component includes the folowing:
    //1: user history for player he already identified
    //2: a button that will navigate to newPlayerScan screen.

    let userContext = React.useContext(UserContext); //includes most of the user data.
    const navigation = props.navigation; //for navigation between app screens
    const [modalVisible, setModalVisible] = useState(false); //use State to control modal appreance
    const { getHistoryFlag } = props.route.params; //a reference to a flag in the login component. this flag will determine if fetching history array is required.
    const [historyPlayerNameChosen, setHistoryPlayerNameChosen] = useState(''); //Will be send to modal component to store a history entery selected by the user

    //function that toggles the modal useState (off->on||on->off)
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    //navigates to newPlayerScan
    //most of the user info is stored in userContext that is shared between the app components.
    const navigateToNewPlayerScan = () => {
        navigation.navigate('NewPlayerScan');
    };

    const getUserSearchHistory = async () => {
        //Function that is activated by a USE_EFFECT_1
        //Function will run if fetching userHistoryPlayers is required.
        try {
            let response = await axios({
                method: 'get',
                url: `http://${SERVER_IP_ADDRESS}:${PORT}/api/getUserPlayersHistory`,
                headers: {
                    Authorization: `Bearer ${userContext.idToken}`
                },
                signal: Timeout(10).signal
            });
            console.log(response?.data.players);
            userContext.setUserHistoryPlayersArr(
                Object.values(response?.data.players)
            );
            if (getHistoryFlag) getHistoryFlag.current = false;
        } catch (error) {
            console.log('error while getting user search history');
            console.log(error);
        }
    };

    const getHistoryPlayerStats = async () => {
        //Function that is activated by USE_EFFECT_2
        //Function will run if a history entery was chosen from the userHistoryPlayers array.
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

            navigation.navigate('PlayerDetailsScreen', {
                playerData
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        //USE_EFFECT_1
        //use effect that takes effect if getHistoryFlag=true||undefined;
        //getHistoryFlag is the reference we got from login component.
        //it determine if this useEffect will use Axios to get the history array from the backend
        if (getHistoryFlag === undefined || getHistoryFlag?.current) {
            console.log('fetching user history...');
            getUserSearchHistory();
        }
    }, [getHistoryFlag]);

    useEffect(() => {
        //USE_EFFECT_2
        //useEffect that takes effect after a history entery was chosen from the userHistoryPlayers array.
        //the useEffect will activate getHistoryPlayerStats function
        if (historyPlayerNameChosen.length > 0) {
            getHistoryPlayerStats();
        }
    }, [historyPlayerNameChosen]);

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
