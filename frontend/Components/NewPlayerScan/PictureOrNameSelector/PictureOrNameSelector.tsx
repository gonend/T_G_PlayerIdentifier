import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function PictureOrNameSelector(props: any) {
    //gets the useState from playerInfoScreen so that pressing on the navbar make a diffrence in there
    const { identifyWithPicture, setIdentifyWithPicture, setFreshStart } =
        props;

    const [identifyWithPictureButtonStyle, setIdentifyWithPictureButtonStyle] =
        useState<object>(styles.enabledButton);
    const [identifyWithNameButtonStyle, setIdentifyWithNameButtonStyle] =
        useState<object>(styles.disabledButton);

    //defines if the underline should go under Simple View||Expret View
    // const [statsNavbarRectangleStyle, setStatsNavbarRectangleStyle] =
    //     useState<object>(styles.rectangleRight);

    //monitors the simpleStatsView useState and changes the style acordingly
    useEffect(() => {
        if (identifyWithPicture === true) {
            setIdentifyWithPictureButtonStyle(styles.enabledButton);
            setIdentifyWithNameButtonStyle(styles.disabledButton);
        } else {
            setIdentifyWithNameButtonStyle(styles.enabledButton);
            setIdentifyWithPictureButtonStyle(styles.disabledButton);
        }
        setFreshStart(true);
        // setMyMissionsIsFocused(!myMissionsIsFocused);
    }, [identifyWithPicture]);

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
                <View style={identifyWithPictureButtonStyle}>
                    <Text
                        onPress={() => {
                            console.log('pressed on pictureView');
                            setIdentifyWithPicture(true);
                            // setMyMissionsIsFocused(false);
                        }}
                        style={styles.StatsNavbarText}
                    >
                        {'Picture'}
                    </Text>
                </View>
                <View style={identifyWithNameButtonStyle}>
                    <Text
                        onPress={() => {
                            console.log('pressed on nameView');
                            setIdentifyWithPicture(false);
                            // setMyMissionsIsFocused(true);
                        }}
                        style={styles.StatsNavbarText}
                    >
                        {'Name'}
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
