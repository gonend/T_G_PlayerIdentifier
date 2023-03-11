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
import { PORT, SERVER_IP_ADDRESS } from '@env';
import { UserContext } from '../../App';
import { Timeout } from '../NewPlayerScan/NewPlayerScan';

export default function GenericPlayerHistoryButton(props: any) {
    const {
        getPlayerStats,
        playerName,
        setModalVisible,
        setHistoryPlayerNameChosen
    } = props;
    // const [freshStart, setFreshStart] = useState(false);

    let userContext = React.useContext(UserContext);

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
    containerView: { marginRight: 5, marginLeft: 5 },
    playerNameText: { fontSize: 15 },
    getPlayerDataButton: {
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
    buttonIcon: {
        height: 24,
        width: 24,
        marginRight: 5,
        marginTop: 10
    }
});
