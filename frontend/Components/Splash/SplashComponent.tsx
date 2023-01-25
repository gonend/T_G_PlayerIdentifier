import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native-animatable';
import { UserContext } from '../../App';
import Splash from './Splash';

const SplashComponent = (props: any) => {
    let userContext = React.useContext(UserContext);

    const [splashIsVisible, setSplashIsVisible] = useState(true);

    const tempSplash = new Splash({});

    // const navigation = useNavigation();
    const navigation = props.navigation;

    useEffect(() => {
        //check in session storage if userId already exist
        //if exist -switch to home screen and get details of the user there
        //if doesnt exist - switch to login screen and check if user have history of logins
    }, []);

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
