import {
    NavigationContainerRef,
    NavigationContainerRefWithCurrent,
    NavigationProp,
    ParamListBase
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { filterConfig } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import LinearGradient from 'react-native-linear-gradient';

export default function PlayerInfoScreen(props: {
    navigation: NavigationProp<ParamListBase>;
    route: any;
}) {
    const { navigation } = props;
    const { playerData } = props.route.params;

    const [stats, setStats] = useState({
        ast: true,
        blk: true,
        dreb: true,
        fg3_pct: true,
        fg3a: true,
        fg3m: true,
        fg_pct: true,
        fga: true,
        fgm: true,
        ft_pct: true,
        fta: true,
        ftm: true,
        games_played: true,
        min: true,
        oreb: true
    });

    useEffect(() => {
        /// map to true list
    }, [stats]);

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
        >
            <Text>{JSON.stringify(playerData)}</Text>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    linearGradient: { flex: 1 }
});
