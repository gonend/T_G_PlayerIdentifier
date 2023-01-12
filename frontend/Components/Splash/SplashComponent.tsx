import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native-animatable';
import Splash from './Splash';

const SplashComponent = (props: any) => {
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
        }, 3000);
    }, []);

    useEffect(() => {
        if (splashIsVisible === false) {
            // if()
            navigation.navigate('Login', { undefined });
        }
    }, [splashIsVisible]);
    return tempSplash.render();
};
export default SplashComponent;
