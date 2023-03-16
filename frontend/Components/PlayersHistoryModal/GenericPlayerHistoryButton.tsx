import axios from 'axios';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function GenericPlayerHistoryButton(props: any) {
    //This component is part of the PlayersHistoryModal(Popup).
    //There is a mapping thats happening in the parent component for each player name.
    //the mapping creates pressable buttons for each player the user have identified in the past.
    const { playerName, setModalVisible, setHistoryPlayerNameChosen } = props;
    // const [freshStart, setFreshStart] = useState(false);

    return (
        <View style={styles.containerView}>
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(false);
                    setHistoryPlayerNameChosen(playerName);
                }}
                style={styles.getPlayerDataButton}
            >
                <Image
                    style={styles.buttonIcon}
                    source={{
                        uri: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/clock_history.png'
                    }}
                />
                <Text style={styles.playerNameText}>{playerName}</Text>
            </TouchableOpacity>
        </View>
    );
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    containerView: {
        marginRight: width * 0.013888888,
        marginLeft: width * 0.013888888
    },
    playerNameText: { fontSize: height * 0.02245508 },
    getPlayerDataButton: {
        marginTop: height * 0.01497005,
        backgroundColor: 'white',
        borderRadius: width * 0.011111111,
        borderWidth: width * 0.002777777,
        paddingHorizontal: width * 0.0944444444,
        paddingVertical: height * 0.023952095,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonIcon: {
        height: height * 0.03592814,
        width: width * 0.066666666,
        marginRight: width * 0.013888888,
        marginTop: height * 0.014970059
    }
});
