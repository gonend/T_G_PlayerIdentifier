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
// import { User } from '@react-native-google-signin/google-signin';
import SplashComponent from './Components/Splash/SplashComponent';
import HamburgerMenu from './Components/HamburgerMenu/HamburgerMenu';
import Navbar from './Components/Navbar/Navbar';
import NewPlayerScan from './Components/NewPlayerScan/NewPlayerScan';
import PlayerInfoScreen from './Components/PlayerDetailsScreen/PlayerDetailsScreen';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
]);

const Stack = createStackNavigator();

export const UserContext = React.createContext<{
    userObject: FirebaseAuthTypes.User | null;
    setUserObject: Function;
    isUserAuthorized: boolean;
    setIsUserAuthorized: Function;
    idToken: string;
    setIdToken: Function;
}>({
    userObject: null,
    setUserObject: () => {},
    isUserAuthorized: false,
    setIsUserAuthorized: () => {},
    idToken: '',
    setIdToken: () => {}
});

// const [refreshToken, setRefreshToken] = useState(null);

const App = (props: { children: any }) => {
    // const value = React.useContext(UserContext);
    const [userTemp, setUserTemp] = useState<FirebaseAuthTypes.User | null>(
        null
    );

    const [isUserAutorized, setIsUserAuthorized] = useState(false);
    const [idToken, setIdToken] = useState('');

    const getCurrentTokenForUser = async (user: FirebaseAuthTypes.User) => {
        try {
            let token = await user.getIdToken(true);

            // console.log('token generated in app component is:');
            // console.log(token);
            setIdToken(token);
            setIsUserAuthorized(true); //this will make the splash screen navigate us to home screen directly.
            console.log('token was refreshed successfully');

            console.log('token for this user is:');
            console.log('//////////////Start of token//////////////');
            console.log(token);
            console.log('//////////////End of token//////////////');
        } catch (error) {
            console.log(
                'App_component error-error getting current token for user. error details:'
            );
            console.log(error);
        }
    };

    //useEffect to handle authrization status while lunching the app.
    //if a user already authorized before==> it will refresh his token and send him to home screen
    //else==> navigate to login screen
    useEffect(() => {
        try {
            const unsubscribe = auth().onAuthStateChanged(
                (user: FirebaseAuthTypes.User | null) => {
                    if (user) {
                        // console.log(user);
                        setUserTemp(user);
                        getCurrentTokenForUser(user);
                    } else {
                        setIsUserAuthorized(false);
                        //when splash screen have the isUserAuthorized=false it will navigate to login screen.
                    }
                }
            );

            // Unsubscribe from the listener when the component is unmounted.
            return unsubscribe;
        } catch (error) {
            console.log('Error in App_Component- useEffect. Error details:');
            console.log(error);
        }
    }, []);

    //use effect to handle the automitcal proccess of refreshing token after each hour have passed.
    useEffect(() => {
        try {
            const user = auth().currentUser;
            let tokenRefreshTimer: NodeJS.Timeout | null = null;

            if (user) {
                const refreshToken = async () => {
                    console.log('automatically refreshing idToken');
                    setUserTemp(user);
                    getCurrentTokenForUser(user);
                };

                // Refresh the token every hour (3,600,000 milliseconds).
                tokenRefreshTimer = setInterval(refreshToken, 3600000);
            }

            return () => {
                if (tokenRefreshTimer) {
                    clearInterval(tokenRefreshTimer);
                }
            };
        } catch (error) {
            console.log('error while refreshing the token. Error details:');
            console.log(error);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                userObject: userTemp,
                setUserObject: setUserTemp,
                isUserAuthorized: isUserAutorized,
                setIsUserAuthorized: setIsUserAuthorized,
                idToken: idToken,
                setIdToken: setIdToken
            }}
        >
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="Splash"
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
                    <Stack.Screen
                        name="PlayerInfoScreen"
                        component={PlayerInfoScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    );
};

export default App;
