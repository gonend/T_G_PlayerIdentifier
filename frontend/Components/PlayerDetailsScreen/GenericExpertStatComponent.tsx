import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function GenericStatComponent(props: any) {
    //This component is part of the PlayerDetailsScreen expert stats view.
    //There is a mapping thats happening in the parent component for each stat data.
    //the mapping creates the table of stats for a specific player
    const { statObjectKey, statObjectValue } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.statKeyStyle}>{statObjectKey}</Text>
            <Text style={styles.statValueStyle}>{statObjectValue}</Text>
        </View>
    );
}
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        borderColor: 'white',
        borderWidth: width * 0.002777777,
        width: 0.13888888 * width
    },
    statKeyStyle: {
        backgroundColor: 'gray',
        color: 'white',
        padding: width * 0.005555555
    },
    statValueStyle: {
        backgroundColor: 'black',
        color: 'white',
        padding: width * 0.005555555
    }
});
