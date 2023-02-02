import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function PlayerInfoScreen() {
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
    linearGradient: { flex: 1, justifyContent: 'space-between' }
});
