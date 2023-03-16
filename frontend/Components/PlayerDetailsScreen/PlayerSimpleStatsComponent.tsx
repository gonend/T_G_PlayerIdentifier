import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';

export default function PlayerSimpleStatsComponent(props: any) {
    //This component is part of the PlayerDetailsScreen simple stats view.
    const { playerStats } = props;

    return (
        <View style={styles.container}>
            <View style={styles.positionView}>
                <Text style={styles.textKey}>{'Games Played:'}</Text>
                <Text style={styles.textValue}>{playerStats.gmp}</Text>
            </View>
            <View style={styles.heightView}>
                <Text style={styles.textKey}>{'Points:'}</Text>
                <Text style={styles.textValue}>{playerStats.pts}</Text>
            </View>
            <View style={styles.heightView}>
                <Text style={styles.textKey}>{'Mintes:'}</Text>
                <Text style={styles.textValue}>{playerStats.min}</Text>
            </View>
            <View style={styles.heightView}>
                <Text style={styles.textKey}>{'Rebounds:'}</Text>
                <Text style={styles.textValue}>{playerStats.reb}</Text>
            </View>
            <View style={styles.heightView}>
                <Text style={styles.textKey}>{'Asists:'}</Text>
                <Text style={styles.textValue}>{playerStats.ast}</Text>
            </View>
            <View style={styles.heightView}>
                <Text style={styles.textKey}>{'Steals:'}</Text>
                <Text style={styles.textValue}>{playerStats.stl}</Text>
            </View>
            <View style={styles.heightView}>
                <Text style={styles.textKey}>{'Blocks:'}</Text>
                <Text style={styles.textValue}>{playerStats.blk}</Text>
            </View>
            <View style={styles.heightView}>
                <Text style={styles.textKey}>{'Turnovers:'}</Text>
                <Text style={styles.textValue}>{playerStats.TO}</Text>
            </View>
        </View>
    );
}
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {},
    positionView: { flexDirection: 'row', alignItems: 'center' },
    textKey: {
        color: 'white',
        fontSize: height * 0.02994011,
        marginRight: width * 0.013888888
    },
    textValue: { color: 'red', fontSize: height * 0.037425149 },
    heightView: { flexDirection: 'row', alignItems: 'center' }
});
