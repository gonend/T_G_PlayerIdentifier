import { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
export function SearchBar(props: {
    allNamesArray: any[];
    setAllNamesArray: Function;
    filteredPlayerNames: any[];
    setFilteredPlayerNames: Function;
    playerNameSearchValue: string;
    setPlayerNameSearchValue: Function;
}) {
    const {
        allNamesArray,
        filteredPlayerNames,
        setFilteredPlayerNames,
        playerNameSearchValue,
        setPlayerNameSearchValue
    } = props;
    let namesArrayByFilter: any[] = [];

    let filterFunction = () => {
        //use the data recieved earlier and filter it by the name

        namesArrayByFilter = [];

        allNamesArray.map((currName: string) => {
            if (
                currName
                    .toLowerCase()
                    .includes(playerNameSearchValue.toLowerCase())
            ) {
                if (!namesArrayByFilter.includes(currName)) {
                    namesArrayByFilter.push(currName);
                }
            }
        });
        console.log(namesArrayByFilter);
        setFilteredPlayerNames(namesArrayByFilter);
    };

    return (
        <View>
            <View style={styles.searchDiv}>
                <TextInput
                    style={styles.textInput}
                    placeholder="NBA player name"
                    onChangeText={(newText) => {
                        setPlayerNameSearchValue(newText);
                        filterFunction();
                    }}
                    defaultValue={playerNameSearchValue}
                    placeholderTextColor={'#132D42'}
                />
            </View>
        </View>
    );
}
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    searchDiv: {
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        backgroundColor: 'white',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        fontFamily: 'OpenSans-Regular',
        color: '#132D42',
        borderRadius: 10,
        marginHorizontal: width * 0.0533333333,
        fontSize: height * 0.02484472,
        textAlign: 'center',
        marginTop: 20
    }
});
