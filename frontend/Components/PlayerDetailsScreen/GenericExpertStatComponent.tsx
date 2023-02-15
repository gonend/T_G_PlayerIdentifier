import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GenericStatComponent(props: any) {
    const { statObjectKey, statObjectValue } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.statKeyStyle}>{statObjectKey}</Text>
            <Text style={styles.statValueStyle}>{statObjectValue}</Text>
            {/* <Text>{statObject.value}</Text> */}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        // flex: 0.3
        // flexWrap: 'wrap',
        // flexDirection: 'row'
        // paddingRight: 5
        borderColor: 'white',
        borderWidth: 1
        // padding: 5
        // marginHorizontal: 1
    },
    statKeyStyle: { backgroundColor: 'gray', color: 'white', padding: 2 },
    statValueStyle: { backgroundColor: 'black', color: 'white', padding: 2 }
});
