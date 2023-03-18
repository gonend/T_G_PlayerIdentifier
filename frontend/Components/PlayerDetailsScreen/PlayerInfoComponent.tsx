import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';

export default function PlayerInfoComponent(props: any) {
    //This component is part of the PlayerDetailsScreen.
    //It shows the general player info (including picture if present) at the top of PlayerDetailsScreen
    const { playerInfo } = props;
    const [playerHeight, setPlayerHeight] = useState('');

    //this useEffect will check if playerHeight information is avaliable.
    //if playerHeight!==null==> convert height into cm and present to the user
    //else==> present unknown as player height

    useEffect(() => {
        if (
            playerInfo.height_feet !== null &&
            playerInfo.height_inches !== null
        ) {
            let heigtInCm =
                (eval(playerInfo.height_feet) * 12 +
                    eval(playerInfo.height_inches)) *
                2.54;
            heigtInCm = parseInt(String(heigtInCm));
            setPlayerHeight('' + heigtInCm + ' cm');
        }
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.positionView}>
                <Text style={styles.textKey}>{'Position:'}</Text>
                <Text style={styles.textValue}>{playerInfo.position}</Text>
            </View>
            <View style={styles.heightView}>
                <Text style={styles.textKey}>{'Height:'}</Text>

                {playerHeight.length === 0 ? (
                    <Text style={styles.textValue}>{'Unknown'}</Text>
                ) : (
                    <Text style={styles.textValue}>{playerHeight}</Text>
                )}
            </View>
        </View>
    );
}
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 20,
        padding: 10
    },
    positionView: { flexDirection: 'row', alignItems: 'center' },
    textKey: {
        color: 'white',
        fontSize: height * 0.02994011,
        marginRight: width * 0.0138888888,
        fontFamily: 'OpenSans-Bold'
    },
    textValue: {
        color: 'white',
        fontSize: height * 0.037425149,
        // fontFamily: 'OpenSans-Regular'
        fontFamily: 'OpenSans-Regular'
    },
    heightView: { flexDirection: 'row', alignItems: 'center' }
});
