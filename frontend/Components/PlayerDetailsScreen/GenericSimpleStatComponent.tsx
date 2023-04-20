import React from 'react';
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function GenericSimpleStatComponent(props: any) {
    //This component is part of the PlayerDetailsScreen simple stats view.
    //There is a mapping thats happening in the parent component for each stat data.
    //the mapping creates simple stats view on screen for a specific player
    const { statObjectKey, statObjectValue } = props;

    interface dictObject {
        [key: string]: any;
    }

    const dictionary: dictObject = {
        gmp: 'games',
        pts: 'points',
        min: 'minutes',
        reb: 'rebounds',
        ast: 'asists',
        stl: 'steals',
        blk: 'blocks',
        TO: 'Turnovers'
    };
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/img/whiteKeyPiece.png')}
                style={styles.keyImage}
            >
                <Text style={styles.keyText}>
                    {dictionary[statObjectKey] + ':'}
                </Text>
            </ImageBackground>
            <ImageBackground
                source={require('../../assets/img/greenValuePiece.png')}
                style={styles.valueImage}
            >
                <Text style={styles.valueText}>{statObjectValue}</Text>
            </ImageBackground>
            {/* <Text style={styles.statKeyStyle}>{statObjectKey}</Text>
            <Text style={styles.statValueStyle}>{statObjectValue}</Text> */}
        </View>
    );
}
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        overflow: 'hidden'
    },
    keyImage: {
        // resizeMode: 'cover',
        // width: 200,
        // height: 50,
        height: height * 0.034593023,
        resizeMode: 'contain',
        justifyContent: 'center',
        width: width * 0.2977777777
    },
    valueImage: {
        height: height * 0.035447674,
        justifyContent: 'center',
        width: width * 0.1922222222,
        marginLeft: width * -0.055555555
    },
    keyText: {
        color: 'black',
        fontSize: 16,
        // fontWeight: 'bold',
        // textAlign: 'center',
        textShadowColor: 'white',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        fontFamily: 'OpenSans-Bold',
        paddingLeft: height * 0.004360465
    },
    valueText: {
        color: 'white',
        fontSize: 18,
        // fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10
    }
    // statKeyStyle: {
    //     backgroundColor: 'gray',
    //     color: 'white',
    //     padding: width * 0.005555555,
    //     fontFamily: 'OpenSans-Bold'
    // },
    // statValueStyle: {
    //     backgroundColor: 'black',
    //     color: 'white',
    //     padding: width * 0.005555555,
    //     fontFamily: 'OpenSans-Regular'
    // }
});
