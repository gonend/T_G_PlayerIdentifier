import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../../../App';

export default function PictureOrNameSelector(props: any) {
    //This compoenent is the selector thats on top of the newPlayerScan screen.
    //This selector lets the user decide whether to identify through a player picture || through player name

    const { identifyWithPicture, setIdentifyWithPicture } = props;
    //gets the useState from PlayerDetailsScreen so that pressing on the pictureOrName selector make a diffrence in there

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
                marginTop: height * 0.014970059,
                flexWrap: 'wrap'
            }}
        >
            <View style={styles.selectorContainer}>
                <View style={identifyWithPictureButtonStyle}>
                    <Text
                        onPress={() => {
                            console.log('pressed on pictureView');
                            setIdentifyWithPicture(true);
                        }}
                        style={styles.selectorText}
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
                        style={styles.selectorText}
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
    selectorContainer: {
        flexDirection: 'row-reverse',
        flex: 1,
        alignItems: 'center'
    },
    selectorText: {
        textAlign: 'center',
        fontFamily: 'OpenSans-Bold',
        color: '#FFFFFF',
        fontSize: height * 0.03494472
    },

    enabledButton: {
        flex: 0.5,
        backgroundColor: 'green',
        borderRadius: width * 0.13888888
    },
    disabledButton: { flex: 0.5, opacity: 0.3 }
});
