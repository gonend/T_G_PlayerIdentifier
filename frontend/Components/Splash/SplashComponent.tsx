import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native-animatable';
import { UserContext } from '../../App';
import Splash from './Splash';
import auth from '@react-native-firebase/auth';

const SplashComponent = (props: any) => {
    let userContext = React.useContext(UserContext);

    const [splashIsVisible, setSplashIsVisible] = useState(true);

    const tempSplash = new Splash({});

    // const navigation = useNavigation();
    const navigation = props.navigation;

    async function getUserCredentialsWithToken(idToken: string) {
        try {
            const googleCredential =
                auth.GoogleAuthProvider.credential(idToken);
            let credentials = await auth().signInWithCredential(
                googleCredential
            );
            return credentials;
        } catch (error) {
            console.log('error in splash component:' + error);
            GoogleSignin.signOut();
            // console.log('before:');

            // console.log(await AsyncStorage.getItem('accessToken'));
            AsyncStorage.clear();
            // console.log('after:');
            // console.log(await AsyncStorage.getItem('accessToken'));
            userContext.setUserObject({
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

            // console.log('logged out');
            userContext.setIsUserAuthorized(false);
            // navigation.navigate('Login', {});
        }
    }

    useEffect(() => {
        setTimeout(function () {
            setSplashIsVisible(false);
        }, 5000);
    }, []);

    useEffect(() => {
        if (splashIsVisible === false) {
            if (userContext.isUserAuthorized === false) {
                navigation.navigate('Login', { undefined });
            } else {
                navigation.navigate('Home', { undefined });
            }
        }
    }, [splashIsVisible]);

    useEffect(() => {
        (async () => {
            let storageIdToken = await AsyncStorage.getItem('accessToken');

            if (storageIdToken) {
                getUserCredentialsWithToken(storageIdToken);

                let tempUser = await GoogleSignin.getCurrentUser();
                if (tempUser) {
                    userContext.setUserObject(tempUser);
                    userContext.setIsUserAuthorized(true);
                    // console.log(tempUser);
                }
            }
        })();
    }, []);

    return tempSplash.render();
};
export default SplashComponent;
