import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function UserRoleNavbar(props: any) {
    //gets the useState from playerInfoScreen so that pressing on the navbar make a diffrence in there
    const { setSimpleStatsView, simpleStatsView } = props;

    const [simpleViewButtonStyle, setSimpleViewButtonStyle] = useState<object>(
        styles.enabledButton
    );
    const [expertViewButtonStyle, setExpertViewButtonStyle] = useState<object>(
        styles.disabledButton
    );

    //defines if the underline should go under Simple View||Expret View
    // const [statsNavbarRectangleStyle, setStatsNavbarRectangleStyle] =
    //     useState<object>(styles.rectangleRight);

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
            <View style={styles.statsNavbarContainer}>
                <View style={simpleViewButtonStyle}>
                    <Text
                        onPress={() => {
                            console.log('pressed on Simple View');
                            setSimpleStatsView(true);
                            // setMyMissionsIsFocused(false);
                        }}
                        style={styles.StatsNavbarText}
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
                        style={styles.StatsNavbarText}
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
    StatsNavbarText: {
        textAlign: 'center',
        fontFamily: 'OpenSans-Bold',
        color: '#FFFFFF',
        fontSize: height * 0.03494472
    },

    statsNavbarContainer: {
        flexDirection: 'row-reverse',
        flex: 1,
        alignItems: 'center'
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
