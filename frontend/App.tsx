/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    LogBox,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
// import { I_userProfileObject } from './Interfaces/I_userProfileObject';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@react-native-google-signin/google-signin';
import SplashComponent from './Components/Splash/SplashComponent';
import HamburgerMenu from './Components/HamburgerMenu/HamburgerMenu';
import Navbar from './Components/Navbar/Navbar';
import NewPlayerScan from './Components/NewPlayerScan/NewPlayerScan';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
]);

const Stack = createStackNavigator();

export const UserContext = React.createContext<{
    userObject: User;
    setUserObject: Function;
    isUserAuthorized: boolean;
    setIsUserAuthorized: Function;
}>({
    userObject: {
        user: {
            id: '-1',
            name: null,
            email: 'empty@empty.com',
            photo: null,
            familyName: null,
            givenName: null
        },
        idToken: '-1',
        serverAuthCode: '-1'
    },
    setUserObject: () => {},
    isUserAuthorized: false,
    setIsUserAuthorized: () => {}
});

const App = (props: { children: any }) => {
    // const value = React.useContext(UserContext);
    const [userTemp, setUserTemp] = useState<User>({
        user: {
            id: '-1',
            name: null,
            email: 'empty@empty.com',
            photo: null,
            familyName: null,
            givenName: null
        },
        idToken: '-1',
        serverAuthCode: '-1'
    });

    const [isUserAutorized, setIsUserAuthorized] = useState(false);

    // useEffect(() => {
    //     AsyncStorage.clear();
    // }, []);

    return (
        <UserContext.Provider
            value={{
                userObject: userTemp,
                setUserObject: setUserTemp,
                isUserAuthorized: isUserAutorized,
                setIsUserAuthorized: setIsUserAuthorized
            }}
        >
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="Home"
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Splash" component={SplashComponent} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen
                        name="HamburgerMenu"
                        component={HamburgerMenu}
                    />
                    <Stack.Screen
                        name="NewPlayerScan"
                        component={NewPlayerScan}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    );
};

export default App;
