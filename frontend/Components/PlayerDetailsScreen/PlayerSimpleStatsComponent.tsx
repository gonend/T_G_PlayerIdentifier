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
        marginTop: height * 0.01453488,
        marginRight: height * 0.00726744,
        minWidth: width * 0.5,
        // borderWidth: 1,
        alignItems: 'center'
    },
    rightStatsView: {
        marginTop: height * 0.01453488,
        marginLeft: height * 0.00726744,
        minWidth: width * 0.5,
        // borderWidth: 1,
        alignItems: 'center'
    },
    singleStatView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.00726744
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
        borderRadius: height * 0.01453488,
        padding: height * 0.00436046,
        minWidth: width * 0.1944444444,
        textAlign: 'center'
    }
});
