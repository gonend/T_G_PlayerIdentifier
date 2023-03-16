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
import LinearGradient from 'react-native-linear-gradient';
import Navbar from '../Navbar/Navbar';
import GenericStatComponent from './GenericExpertStatComponent';
import PlayerInfoComponent from './PlayerInfoComponent';
import PlayerSimpleStatsComponent from './PlayerSimpleStatsComponent';
import { UserContext } from '../../App';
import StatsViewSelectorComponent from './StatsViewSelectorComponent/StatsViewSelectorComponent';

export default function PlayerDetailscreen(props: {
    navigation: NavigationProp<ParamListBase>;
    route: any;
}) {
    //This compoenent shows the player data for a player that was succesfully identified by the backend.
    //A user will get to this screen from newPlayerScan (or from home via search history)

    //This component includes the folowing:
    //1: a selector component that lets the user decide whether to show the data in a simple or expert view.
    //2: player info component with player general info.
    //3: based on the user choice in the selector (section 1) the layout will change respetively.
    //4: An identifyAgain button that will take the user back to newPlayerScan after resetting all values from previous scan.
    const { navigation } = props;
    const { playerData } = props.route.params;

    const playerInfo = playerData?.playerObject.playerInfo;

    const [playerStats, setPlayerStats] = useState(
        playerData?.playerObject.playerStats
    );
    const [simpleStatsView, setSimpleStatsView] = useState(true);
    let userContext = React.useContext(UserContext);

    async function identifyAgain() {
        await userContext.setFreshStart(true);

        navigation.navigate('NewPlayerScan', {});
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
                <StatsViewSelectorComponent
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
        fontSize: height * 0.044910179,
        marginTop: height * 0.014970059
    },
    playerInfoView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    playerPicture: {
        height: height * 0.2245508982035928,
        width: width * 0.416666666,
        alignSelf: 'center',
        marginTop: height * 0.014970059,
        marginRight: width * 0.055555555
    },
    playerSimpleStatsView: { alignItems: 'center' },
    playerExpertStatsScrollView: {
        flex: 0.5,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',

        marginTop: height * 0.014970059,
        paddingTop: height * 0.02994011,
        marginHorizontal: width * 0.027777777
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height * 0.02994011
    },
    identifyAgainButton: {},
    identifyAgainButtonIcon: {
        height: height * 0.1563354,
        width: width * 0.33333333
    }
});
