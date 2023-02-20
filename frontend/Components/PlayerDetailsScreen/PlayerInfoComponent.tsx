import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';

export default function PlayerInfoComponent(props: any) {
    const { playerInfo } = props;
    return (
        <View style={styles.container}>
            <View style={styles.positionView}>
                <Text style={styles.textKey}>{'Position:'}</Text>
                <Text style={styles.textValue}>{playerInfo.position}</Text>
            </View>
            <View style={styles.heightView}>
                <Text style={styles.textKey}>{'Height:'}</Text>
                <Text style={styles.textValue}>
                    {playerInfo.height_feet + `\'` + playerInfo.height_inches}
                </Text>
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
