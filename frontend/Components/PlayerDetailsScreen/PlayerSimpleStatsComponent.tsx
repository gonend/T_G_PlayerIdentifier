import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';

export default function PlayerSimpleStatsComponent(props: any) {
    //This component is part of the PlayerDetailsScreen simple stats view.
    const { playerStats } = props;

    return (
        <View style={styles.container}>
            <View style={styles.leftStatsView}>
                <View style={styles.singleStatView}>
                    <Text style={styles.textKey}>{'Games:'}</Text>
                    <Text style={styles.textValue}>{playerStats.gmp}</Text>
                </View>
                <View style={styles.singleStatView}>
                    <Text style={styles.textKey}>{'Points:'}</Text>
                    <Text style={styles.textValue}>{playerStats.pts}</Text>
                </View>
                <View style={styles.singleStatView}>
                    <Text style={styles.textKey}>{'Minutes:'}</Text>
                    <Text style={styles.textValue}>{playerStats.min}</Text>
                </View>
                <View style={styles.singleStatView}>
                    <Text style={styles.textKey}>{'Rebounds:'}</Text>
                    <Text style={styles.textValue}>{playerStats.reb}</Text>
                </View>
            </View>
            <View style={styles.rightStatsView}>
                <View style={styles.singleStatView}>
                    <Text style={styles.textKey}>{'Asists:'}</Text>
                    <Text style={styles.textValue}>{playerStats.ast}</Text>
                </View>
                <View style={styles.singleStatView}>
                    <Text style={styles.textKey}>{'Steals:'}</Text>
                    <Text style={styles.textValue}>{playerStats.stl}</Text>
                </View>
                <View style={styles.singleStatView}>
                    <Text style={styles.textKey}>{'Blocks:'}</Text>
                    <Text style={styles.textValue}>{playerStats.blk}</Text>
                </View>
                <View style={styles.singleStatView}>
                    <Text style={styles.textKey}>{'Turnovers:'}</Text>
                    <Text style={styles.textValue}>{playerStats.TO}</Text>
                </View>
            </View>
        </View>
    );
}
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flexDirection: 'row' },
    leftStatsView: {
        marginTop: 10,
        marginRight: 5,
        minWidth: 180,
        // borderWidth: 1,
        alignItems: 'center'
    },
    rightStatsView: {
        marginTop: 10,
        marginLeft: 5,
        minWidth: 180,
        // borderWidth: 1,
        alignItems: 'center'
    },
    singleStatView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    textKey: {
        color: 'white',
        fontSize: height * 0.02616279,
        marginRight: width * 0.013888888,
        fontFamily: 'OpenSans-Bold'
    },
    textValue: {
        color: 'white',
        fontSize: height * 0.037425149,
        fontFamily: 'OpenSans-Regular',
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 3,
        minWidth: 70,
        textAlign: 'center'
    }
});
