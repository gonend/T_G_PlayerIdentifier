import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../../../App';

export default function PictureOrNameSelector(props: any) {
    //gets the useState from playerInfoScreen so that pressing on the navbar make a diffrence in there
    const { identifyWithPicture, setIdentifyWithPicture } = props;

    let userContext = React.useContext(UserContext);

    const [identifyWithPictureButtonStyle, setIdentifyWithPictureButtonStyle] =
        useState<object>(styles.enabledButton);
    const [identifyWithNameButtonStyle, setIdentifyWithNameButtonStyle] =
        useState<object>(styles.disabledButton);

    useEffect(() => {
        if (identifyWithPicture === true) {
            setIdentifyWithPictureButtonStyle(styles.enabledButton);
            setIdentifyWithNameButtonStyle(styles.disabledButton);
        } else {
            setIdentifyWithNameButtonStyle(styles.enabledButton);
            setIdentifyWithPictureButtonStyle(styles.disabledButton);
        }
        userContext.setFreshStart(true);
    }, [identifyWithPicture]);

    return (
        <View
            style={{
                marginHorizontal: width * 0.1,
                marginTop: 10,
                flexWrap: 'wrap'
            }}
        >
            <View style={styles.statsNavbarContainer}>
                <View style={identifyWithPictureButtonStyle}>
                    <Text
                        onPress={() => {
                            console.log('pressed on pictureView');
                            setIdentifyWithPicture(true);
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
                        }}
                        style={styles.StatsNavbarText}
                    >
                        {'Name'}
                    </Text>
                </View>
            </View>
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
    },
    disabledButton: { flex: 0.5, opacity: 0.3 }
});
