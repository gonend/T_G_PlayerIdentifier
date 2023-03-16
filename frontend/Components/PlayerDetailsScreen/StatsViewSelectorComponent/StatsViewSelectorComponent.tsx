import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function StatsViewSelectorComponent(props: any) {
    //This components is part of the PlayerDetails screen.
    //This components lets the user choose wether to vire player stats with simplified or profesional view.
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
        <View
            style={{
                // backgroundColor: '#FFFFFF',
                marginHorizontal: width * 0.1,
                marginTop: 10,
                flexWrap: 'wrap'

                // justifyContent: 'center'
            }}
        >
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
                        {'Simple View'}
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
                        {'Expert View'}
                    </Text>
                </View>
            </View>

            {/* <View style={statsNavbarRectangleStyle} /> */}
        </View>
    );
}
const { height, width } = Dimensions.get('window');

var styles = StyleSheet.create({
    statsSelectorContainer: {
        flexDirection: 'row-reverse',
        flex: 1,
        alignItems: 'center'
    },
    StatsSelectorText: {
        textAlign: 'center',
        fontFamily: 'OpenSans-Bold',
        color: '#FFFFFF',
        fontSize: height * 0.03494472
    },

    enabledButton: {
        flex: 0.5,
        backgroundColor: 'green',
        borderRadius: 50
        // alignContent: 'center',
        // alignItems: 'center',}
    },
    disabledButton: { flex: 0.5, opacity: 0.3 }
});
