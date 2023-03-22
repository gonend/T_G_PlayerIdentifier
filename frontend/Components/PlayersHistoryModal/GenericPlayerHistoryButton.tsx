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
import ScreenDimensionsContext from '../../DimentionsUtils/ScreenDimensionsContext';

export default function GenericPlayerHistoryButton(props: any) {
    //This component is part of the PlayersHistoryModal(Popup).
    //There is a mapping thats happening in the parent component for each player name.
    //the mapping creates pressable buttons for each player the user have identified in the past.
    const { playerName, setModalVisible, setHistoryPlayerNameChosen } = props;
    // const [freshStart, setFreshStart] = useState(false);

    ////////////////////////////dimention context test/////////////////////////////

    const { screenDimensions } = React.useContext(ScreenDimensionsContext);

    const { screenWidth, screenHeight } = screenDimensions ?? {
        screenWidth: 360,
        screenHeight: 688
    };

    /////////////////////////////end of dmimention test////////

    const styles = StyleSheet.create({
        containerView: {
            marginRight: screenWidth * 0.013888888,
            marginLeft: screenWidth * 0.013888888
        },
        playerNameText: {
            fontSize: screenHeight * 0.02245508,
            fontFamily: 'OpenSans-Regular'
        },
        getPlayerDataButton: {
            marginTop: screenHeight * 0.01497005,
            backgroundColor: '#89acbd',
            borderRadius: screenWidth * 0.311111111,
            borderWidth: screenWidth * 0.002777777,
            paddingHorizontal: screenWidth * 0.0944444444,
            paddingVertical: screenHeight * 0.023952095,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonIcon: {
            height: screenHeight * 0.03592814,
            width: screenWidth * 0.066666666,
            resizeMode: 'contain',
            marginRight: screenWidth * 0.013888888,
            marginTop: screenHeight * 0.014970059
        }
    });

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

// const { height, width } = Dimensions.get('window');
