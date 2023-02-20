import React, { useEffect, useState } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    Touchable
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function CategoryPickerModal(props: any) {
    const { statsModalVisible, setStatsModalVisible } = props;

    const [stats, setStats] = useState([]);
    const options = ['ast', 'blk', 'stl'];

    function pickStat(selectedStat: any) {
        if (options.includes(selectedStat)) {
            setStats(stats.filter((stat) => stat !== selectedStat));
            return;
        }
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={statsModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setStatsModalVisible(!statsModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalHeader}>Hello World!</Text>
                        <View>
                            {options.map((option) => (
                                <View key={option}>
                                    <TouchableOpacity
                                        style={styles.checkBox}
                                        onPress={() => pickStat(option)}
                                    >
                                        {options.includes(option) && (
                                            <Text style={styles.check}>✔️</Text>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.StatName}>
                                        {option}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() =>
                                setStatsModalVisible(!statsModalVisible)
                            }
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setStatsModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: '#F194FF'
    },
    buttonClose: {
        backgroundColor: '#2196F3'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        alignSelf: 'flex-start',
        marginBottom: 7,
        textAlign: 'center'
    },
    StatName: {
        textTransform: 'capitalize',
        fontSize: 16
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: '600'
    },
    checkBox: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: 'green',
        marginRight: 10,
        alignSelf: 'center'
    },
    check: {
        alignSelf: 'center'
    }
});

// const [stats, setStats] = useState({
//     ast: true,
//     blk: true,
//     dreb: true,
//     fg3_pct: true,
//     fg3a: true,
//     fg3m: true,
//     fg_pct: true,
//     fga: true,
//     fgm: true,
//     ft_pct: true,
//     fta: true,
//     ftm: true,
//     games_played: true,
//     min: true,
//     oreb: true
// });
