import {
    NavigationContainerRef,
    NavigationContainerRefWithCurrent,
    NavigationProp,
    ParamListBase
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { filterConfig } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import LinearGradient from 'react-native-linear-gradient';
import Navbar from '../Navbar/Navbar';
import GenericStatComponent from './GenericStatComponent';
import PlayerInfoComponent from './PlayerInfoComponent';

export default function PlayerInfoScreen(props: {
    navigation: NavigationProp<ParamListBase>;
    route: any;
}) {
    const { navigation } = props;
    const { playerData, setFreshStart } = props.route.params;

    const playerInfo = playerData.playerObject.playerInfo;

    function identifyAgain() {
        setFreshStart(true);
        navigation.navigate('NewPlayerScan');
    }

    const [playerStats, setPlayerStats] = useState(
        playerData.playerObject.playerStats
    );

    const playerName =
        playerData.playerObject.playerInfo.first_name +
        ' ' +
        playerData.playerObject.playerInfo.last_name;

    const { ast, blk, dreb } = playerStats;

    const [showPlayerStats, setShowPlayerStats] = useState(false);

    let key = 1;

    const [statsBoolean, setStatsBoolean] = useState({
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
        console.log('sharmutaaa');
        if (playerStats) {
            console.log(playerStats);

            setShowPlayerStats(true);
        }
    }, [playerStats]);

    useEffect(() => {
        // console.log('check type for navigation');
        // navigation.navigate('Home');
        // setPlayerStats({ dreb, blk, ast });
    }, []);
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#28449C', '#0064C3']}
            style={styles.linearGradient}
        >
            {/* <Text>{JSON.stringify(playerData)}</Text> */}
            <Navbar navigation={navigation} />
            <Text style={styles.playerNameText}>{playerName}</Text>

            <ScrollView>
                <View style={styles.playerInfoView}>
                    <Image
                        style={styles.playerPicture}
                        source={{
                            uri: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png'
                        }}
                    />
                    <PlayerInfoComponent playerInfo={playerInfo} />
                </View>

                {showPlayerStats === true ? (
                    <View style={styles.playerStatsScrollView}>
                        {Object.keys(playerStats).map((statObjectKey: any) => {
                            return (
                                <GenericStatComponent
                                    key={key++}
                                    statObjectKey={statObjectKey}
                                    statObjectValue={playerStats[statObjectKey]}
                                />
                            );
                        })}
                    </View>
                ) : (
                    <></>
                )}

                {/* {playerData.playerObject.playerStats.map((statObject: any) => {
                <GenericStatComponent key={key} statObject={statObject} />;
            })} */}
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        onPress={identifyAgain}
                        style={styles.identifyAgainButton}
                    >
                        <Image
                            style={styles.identifyAgainButtonIcon}
                            source={{
                                uri: 'https://st.depositphotos.com/1139310/4042/v/600/depositphotos_40420877-stock-illustration-3d-vector-icon-of-reload.jpg'
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    linearGradient: { flex: 1 },

    playerNameText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 30,
        marginTop: 10
    },
    playerInfoView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    playerPicture: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginTop: 10,
        marginRight: 20
    },
    playerStatsScrollView: {
        flex: 0.5,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        // borderColor: 'white',
        // borderWidth: 2,
        marginTop: 10,
        paddingTop: 20,
        marginHorizontal: 10
    },
    buttonView: {
        // flex: 1,
        // backgroundColor: 'red',
        flexDirection: 'row',
        // flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 50
    },
    identifyAgainButton: {
        // flex: 0.5,
        // backgroundColor: 'red'
        // flexDirection: 'row',
        // flexWrap: 'wrap'
    },
    identifyAgainButtonIcon: {
        // flex: 0.8,
        // resizeMode: 'contain',
        height: 130,
        width: 130
        // flexWrap: 'wrap'
    }
});
