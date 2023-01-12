import React from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../../App';
import Navbar from '../Navbar/Navbar';

function Home(props: any) {
    let userContext = React.useContext(UserContext);
    const navigation = props.navigation;

    return (
        <View>
            <Navbar navigation={navigation} />
            <Text>Home screen!</Text>
        </View>
    );
}
export default Home;
