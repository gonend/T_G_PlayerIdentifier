import {
    NavigationContainerRef,
    NavigationContainerRefWithCurrent,
    NavigationProp,
    ParamListBase
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { filterConfig } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import LinearGradient from 'react-native-linear-gradient';
import CategoryPickerModal from '../CategoryPickerModal/CategoryPickerModal';

export default function PlayerInfoScreen(props: {
    navigation: NavigationProp<ParamListBase>;
    route: any;
}) {
    const { navigation } = props;
    const { playerData } = props.route.params;

    const [statsModalVisible, setStatsModalVisible] = useState(false);

    // useEffect(() => {
    //     console.log('get ');
    //     let shownStats = { ...stats };
    //     // navigation.navigate('Home');
    // }, [stats]);

    // setCheckBox = (()=)

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
            <Pressable
                onPress={() => {
                    setStatsModalVisible(!statsModalVisible);
                }}
            ></Pressable>

            <CategoryPickerModal
                statsModalVisible={statsModalVisible}
                setStatsModalVisible={setStatsModalVisible}
            />
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    linearGradient: { flex: 1 }
});
