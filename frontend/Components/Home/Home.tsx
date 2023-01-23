import React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { UserContext } from '../../App';
import Navbar from '../Navbar/Navbar';

function Home(props: any) {
    let userContext = React.useContext(UserContext);
    const navigation = props.navigation;

    const takePicture = () => {
        navigation.navigate('NewPlayerScan');
    };

    return (
        <View style={styles.container}>
            <Navbar navigation={navigation} />

            <TouchableOpacity
                onPress={takePicture}
                style={styles.takePictureButton}
            >
                <Image
                    style={styles.buttonIcon}
                    source={{
                        uri: 'https://icons.iconarchive.com/icons/hopstarter/button/256/Button-Add-icon.png'
                    }}
                />
                <Text style={styles.takePictureButtonText}>
                    {'Scan new player'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1 },
    takePictureButton: {
        backgroundColor: 'white',
        borderRadius: 4,
        paddingHorizontal: 34,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    takePictureButtonText: {
        color: '#b97272',
        fontSize: 20
    },
    buttonIcon: {
        height: 24,
        width: 24,
        marginRight: 5
    }
});
export default Home;
