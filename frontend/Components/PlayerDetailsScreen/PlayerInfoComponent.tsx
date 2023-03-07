import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';

export default function PlayerInfoComponent(props: any) {
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

const styles = StyleSheet.create({
    container: {},
    positionView: { flexDirection: 'row', alignItems: 'center' },
    textKey: { color: 'white', fontSize: 20, marginRight: 5 },
    textValue: { color: 'red', fontSize: 25 },
    heightView: { flexDirection: 'row', alignItems: 'center' }
});
