import React from 'react';
import { useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Splash from './Splash';

const SplashComponent = (props: any) => {
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
