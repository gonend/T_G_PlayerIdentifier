import {
    NavigationContainerRef,
    NavigationContainerRefWithCurrent,
    NavigationProp,
    ParamListBase
} from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function PlayerInfoScreen(props: {
    navigation: NavigationProp<ParamListBase>;
}) {
    const { navigation } = props;
    useEffect(() => {
        // console.log('check type for navigation');
        // navigation.navigate('Home');
    }, []);
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#28449C', '#0064C3']}
            style={styles.linearGradient}
        ></LinearGradient>
    );
}
const styles = StyleSheet.create({
    linearGradient: { flex: 1 }
});
