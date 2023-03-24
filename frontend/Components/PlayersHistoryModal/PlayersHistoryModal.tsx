import React, { useEffect } from 'react';
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../../App';
import ScreenDimensionsContext from '../../DimentionsUtils/ScreenDimensionsContext';
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

    ////////////////////////////dimention context test/////////////////////////////

    const { screenDimensions } = React.useContext(ScreenDimensionsContext);

    const { screenWidth, screenHeight } = screenDimensions ?? {
        screenWidth: 360,
        screenHeight: 688
    };

    /////////////////////////////end of dmimention test////////

    const styles = StyleSheet.create({
        centeredView: {
            marginTop: screenHeight * 0.254491017,
            flex: 0.4
        },
        modalView: {
            borderRadius: screenWidth * 0.111111111,
            backgroundColor: '#426e85',
            marginTop: screenHeight * 0.024844,
            flex: 1
        },
        xText: {
            color: '#FFFFFF',
            fontSize: screenHeight * 0.0332919,
            marginHorizontal: screenWidth * 0.1,
            marginTop: screenHeight * 0.0419254,
            fontFamily: 'OpenSans-Bold'
        },
        instructionsText: {
            textAlign: 'center',
            color: '#FFFFFF',
            fontFamily: 'OpenSans-Bold',
            fontSize: screenHeight * 0.029069767,
            marginBottom: screenHeight * 0.0145348837,
            marginTop: screenHeight * 0.007267441
        }
    });

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
                                <ScrollView
                                    horizontal={true}
                                    contentInset={{ right: 20 }}
                                    contentOffset={{ x: -20, y: 0 }}
                                >
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
                                    fontSize: screenHeight * 0.02994011,
                                    textAlign: 'center',
                                    color: 'white'
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
// const { height, width } = Dimensions.get('window');
