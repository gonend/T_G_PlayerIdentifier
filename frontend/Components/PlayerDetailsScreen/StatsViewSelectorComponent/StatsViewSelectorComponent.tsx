import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function StatsViewSelectorComponent(props: any) {
    //This components is part of the PlayerDetails screen.
    //This components lets the user choose wether to vire player stats with simplified or expert view.
    const { setSimpleStatsView, simpleStatsView } = props;
    //gets the useState from PlayerDetailsScreen so that pressing on the stats view selector make a diffrence in there

    const [simpleViewButtonStyle, setSimpleViewButtonStyle] = useState<object>(
        styles.enabledButton
    );
    const [expertViewButtonStyle, setExpertViewButtonStyle] = useState<object>(
        styles.disabledButton
    );

    //monitors the simpleStatsView useState and changes the style acordingly
    useEffect(() => {
        if (simpleStatsView === true) {
            setSimpleViewButtonStyle(styles.enabledButton);
            setExpertViewButtonStyle(styles.disabledButton);
        } else {
            setExpertViewButtonStyle(styles.enabledButton);
            setSimpleViewButtonStyle(styles.disabledButton);
        }
        // setMyMissionsIsFocused(!myMissionsIsFocused);
    }, [simpleStatsView]);

    return (
        <View style={styles.statsSelectorContainer}>
            <View style={simpleViewButtonStyle}>
                <Text
                    onPress={() => {
                        console.log('pressed on Simple View');
                        setSimpleStatsView(true);
                        // setMyMissionsIsFocused(false);
                    }}
                    style={styles.StatsSelectorText}
                >
                    {'Simple'}
                </Text>
            </View>
            <View style={expertViewButtonStyle}>
                <Text
                    onPress={() => {
                        console.log('pressed on Expert View');
                        setSimpleStatsView(false);
                        // setMyMissionsIsFocused(true);
                    }}
                    style={styles.StatsSelectorText}
                >
                    {'Expert'}
                </Text>
            </View>
        </View>
    );
}
const { height, width } = Dimensions.get('window');

var styles = StyleSheet.create({
    statsSelectorContainer: {
        flexDirection: 'row-reverse',
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: height * 0.014970059,
        marginHorizontal: width * 0.05111111
    },
    StatsSelectorText: {
        textAlign: 'center',
        fontFamily: 'OpenSans-Bold',
        color: '#FFFFFF',
        fontSize: height * 0.04499472
    },

    enabledButton: {
        flex: 0.4,
        backgroundColor: 'green',
        borderRadius: width * 0.138888888
        // alignContent: 'center',
        // alignItems: 'center',}
    },
    disabledButton: {
        flex: 0.4,
        opacity: 0.3,
        backgroundColor: '#c7c7c7',
        borderRadius: width * 0.138888888
    }
});
