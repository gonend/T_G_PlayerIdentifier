import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';
import GenericSimpleStatComponent from './GenericSimpleStatComponent';

export default function PlayerSimpleStatsComponent(props: any) {
    //This component is part of the PlayerDetailsScreen simple stats view.
    const { playerStats } = props;
    const [leftSimpleStats, setLeftSimpleStats] = useState(playerStats);
    const [rightSimpleStats, setRightSimpleStats] = useState(playerStats);

    useEffect(() => {
        if (playerStats) {
            const { gmp, pts, min, reb, ast, stl, blk, TO } = playerStats;
            setLeftSimpleStats({ gmp, pts, min, reb });
            setRightSimpleStats({ ast, stl, blk, TO });
        }
    }, [playerStats]);
    let key = 1;

    return (
        <View style={styles.container}>
            {playerStats !== undefined ? (
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={styles.leftStatsView}>
                        {Object.keys(leftSimpleStats).map((simpleStatKey) => {
                            return (
                                <GenericSimpleStatComponent
                                    key={key++}
                                    statObjectKey={simpleStatKey}
                                    statObjectValue={
                                        leftSimpleStats[simpleStatKey]
                                    }
                                />
                            );
                        })}
                    </View>
                    <View style={styles.rightStatsView}>
                        {Object.keys(rightSimpleStats).map((simpleStatKey) => {
                            return (
                                <GenericSimpleStatComponent
                                    key={key++}
                                    statObjectKey={simpleStatKey}
                                    statObjectValue={
                                        rightSimpleStats[simpleStatKey]
                                    }
                                />
                            );
                        })}
                    </View>
                </View>
            ) : (
                <></>
            )}
        </View>
    );
}
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {},
    leftStatsView: {
        marginRight: height * 0.01417441
    },
    rightStatsView: {
        // marginLeft: height * 0.02017441
    }
});
