import React from 'react';
import { useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Splash from './Splash';

const SplashComponent = (props: any) => {
    //This component wraps the Splash class and navigates to the proper screen (login or home) based on he user credentials.
    let userContext = React.useContext(UserContext);

    const [splashIsVisible, setSplashIsVisible] = useState(true);

    const tempSplash = new Splash({});

    const navigation = props.navigation;

    useEffect(() => {
        setTimeout(function () {
            setSplashIsVisible(false);
        }, 5000);
    }, []);

    useEffect(() => {
        console.log(userContext.isUserAuthorized);
        // userContext.setIsUserAuthorized(true);
        console.log(userContext.userObject);
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

    return tempSplash.render();
};
export default SplashComponent;
