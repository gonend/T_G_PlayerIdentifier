import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
export function SearchBar(props: {
    allNamesArray: any[];
    setAllNamesArray: Function;
    filteredPlayerNames: any[];
    setFilteredPlayerNames: Function;
    playerNameSearchValue: string;
    setPlayerNameSearchValue: Function;
}) {
    //This component is part of the newPlayerScan screen (when a user wants to identify a player by player name)
    //it gets an array of playerNames from props and filter that array by the user input.
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
        borderBottomWidth: width * 0.00277777777,
        fontFamily: 'OpenSans-Regular',
        color: '#132D42',
        borderRadius: width * 0.02777777777,
        marginHorizontal: width * 0.0533333333,
        fontSize: height * 0.02484472,
        textAlign: 'center',
        marginTop: height * 0.02994011
    }
});
