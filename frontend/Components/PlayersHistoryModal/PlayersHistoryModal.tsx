import React, { useEffect } from 'react';
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../../App';
import GenericPlayerHistoryButton from './GenericPlayerHistoryButton';

export default function PlayersHistoryModal(props: any) {
    //This compoenent shows all the players that was identified by the user in the past.
    //A user will get to this screen from home screen by pressing the My player history button.

    const {
        modalVisible,
        setModalVisible,
        navigation,
        getPlayerStats,
        setHistoryPlayerNameChosen
    } = props;
    let userContext = React.useContext(UserContext);

    // const [playersArr, setPlayersArr] = useState<string[]>([]);

    let playersHistoryKeys = 0;

    // useEffect(() => {
    //     if (userPlayersHistory) {
    //         let playersArr: string[] = Object.values(userPlayersHistory);
    //         setPlayersArr(playersArr);
    //     }
    // }, [userPlayersHistory]);

    useEffect(() => {
        console.log('this is user players history from modal component:');
        console.log(userContext.userHistoryPlayersArr);
    }, []);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text
                            onPress={() => setModalVisible(!modalVisible)}
                            style={styles.xText}
                        >
                            {'X'}
                        </Text>

                        {userContext.userHistoryPlayersArr.length > 0 ? (
                            <View>
                                <Text style={styles.instructionsText}>
                                    {'Pick a player to get stats'}
                                </Text>
                                <ScrollView horizontal={true}>
                                    {userContext.userHistoryPlayersArr?.map(
                                        (currPlayer: string) => {
                                            return (
                                                <GenericPlayerHistoryButton
                                                    key={playersHistoryKeys++}
                                                    playerName={currPlayer}
                                                    navigation={navigation}
                                                    setModalVisible={
                                                        setModalVisible
                                                    }
                                                    getPlayerStats={
                                                        getPlayerStats
                                                    }
                                                    setHistoryPlayerNameChosen={
                                                        setHistoryPlayerNameChosen
                                                    }
                                                ></GenericPlayerHistoryButton>
                                            );
                                        }
                                    )}
                                </ScrollView>
                            </View>
                        ) : (
                            <Text
                                style={{
                                    fontSize: 20,
                                    textAlign: 'center'
                                }}
                            >
                                {'History is empty.'}
                            </Text>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    centeredView: {
        marginTop: height * 0.254491017,
        flex: 0.4
    },
    modalView: {
        borderRadius: 40,
        backgroundColor: '#ffffff',
        marginTop: height * 0.024844,
        flex: 1
    },
    xText: {
        color: '#000000',
        fontSize: height * 0.0332919,
        marginHorizontal: width * 0.1,
        marginTop: height * 0.0419254
    },
    instructionsText: {
        textAlign: 'center'
    }
});
