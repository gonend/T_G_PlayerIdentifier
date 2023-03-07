import {
    NavigationContainerRef,
    NavigationContainerRefWithCurrent,
    NavigationProp,
    ParamListBase
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { filterConfig } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import LinearGradient from 'react-native-linear-gradient';
import Navbar from '../Navbar/Navbar';
import UserRoleNavbar from './StatsNavbarComponent/StatsNavbarComponent';
import GenericStatComponent from './GenericExpertStatComponent';
import PlayerInfoComponent from './PlayerInfoComponent';
import PlayerSimpleStatsComponent from './PlayerSimpleStatsComponent';

export default function PlayerInfoScreen(props: {
    navigation: NavigationProp<ParamListBase>;
    route: any;
}) {
    const { navigation } = props;
    const { playerData, setFreshStart } = props.route.params;

    const playerInfo = playerData?.playerObject.playerInfo;

    const [playerStats, setPlayerStats] = useState(
        playerData?.playerObject.playerStats
    );
    const [simpleStatsView, setSimpleStatsView] = useState(false);

    function identifyAgain() {
        setFreshStart(true);
        navigation.navigate('NewPlayerScan');
    }

    const playerName =
        playerData.playerObject.playerInfo.first_name +
        ' ' +
        playerData.playerObject.playerInfo.last_name;

    let key = 1;

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#28449C', '#0064C3']}
            style={styles.linearGradient}
        >
            <Navbar navigation={navigation} />

            <Text style={styles.playerNameText}>{playerName}</Text>

            <ScrollView>
                <UserRoleNavbar
                    setSimpleStatsView={setSimpleStatsView}
                    simpleStatsView={simpleStatsView}
                />
                <View style={styles.playerInfoView}>
                    <Image
                        style={styles.playerPicture}
                        source={{
                            uri: playerData.playerObject.playerInfo.img_uri //'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png'
                        }}
                    />
                    <PlayerInfoComponent playerInfo={playerInfo} />
                </View>

                {simpleStatsView === true ? (
                    <View style={styles.playerSimpleStatsView}>
                        <PlayerSimpleStatsComponent playerStats={playerStats} />
                    </View>
                ) : (
                    <View style={styles.playerExpertStatsScrollView}>
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
                )}

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
const { height, width } = Dimensions.get('window');

console.log('height is: ' + height);
console.log('width is: ' + width);

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
    playerSimpleStatsView: { alignItems: 'center' },
    playerExpertStatsScrollView: {
        flex: 0.5,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',

        marginTop: 10,
        paddingTop: 20,
        marginHorizontal: 10
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    identifyAgainButton: {},
    identifyAgainButtonIcon: {
        height: height * 0.1563354,
        width: width * 0.33333333
    }
});
