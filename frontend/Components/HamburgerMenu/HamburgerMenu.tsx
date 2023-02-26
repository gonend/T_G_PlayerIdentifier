import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { UserContext } from '../../App';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function HamburgerMenu(props: any) {
    const navigation = props.navigation;
    let userContext = React.useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);

    function clickedOnX() {
        navigation.pop();
    }

    function clickedOnHomePage() {
        navigation.navigate('Home', {});
    }

    function clickedOnProfile() {
        navigation.navigate('UserProfileComponent', {});
    }

    function clickedOnLogout() {
        try {
            auth().signOut();
            GoogleSignin.signOut();
            AsyncStorage.removeItem('accessToken');
            userContext.setIsUserAuthorized(false);
            navigation.navigate('Login', {});
        } catch (error) {
            console.log('error in hamburgerMenu. Error details:');
            console.log(error);
        }
    }

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#28449C', '#0064C3']}
            style={styles.linearGradient}
        >
            <View>
                <Text onPress={clickedOnX} style={styles.xText}>
                    {'X'}
                </Text>
                {userContext.isUserAuthorized ? (
                    <Text
                        style={styles.userNameText}
                    >{`Hello ${userContext.userObject?.displayName} :)`}</Text>
                ) : (
                    <></>
                )}
            </View>

            <View style={styles.allOptionsView}>
                <View>
                    <Text style={styles.optionText} onPress={clickedOnHomePage}>
                        {'Home'}
                    </Text>
                    <View style={styles.horizontalRulerView}></View>
                    <Text style={styles.optionText} onPress={clickedOnProfile}>
                        {'Change Favorite teams'}
                    </Text>
                    <View style={styles.horizontalRulerView}></View>

                    <Text style={styles.optionText} onPress={clickedOnLogout}>
                        {'Logout'}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
}

const { height, width } = Dimensions.get('window');

var styles = StyleSheet.create({
    linearGradient: {
        flex: 1
    },
    xText: {
        color: '#ffffff',
        fontFamily: 'OpenSans-Regular',
        fontSize: height * 0.0310559,
        marginHorizontal: width * 0.05333333,
        marginTop: height * 0.0232919
    },
    userNameText: {
        color: '#ffffff',
        fontSize: height * 0.0310559,
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
        marginTop: height * 0.0279503
    },
    allOptionsView: {
        backgroundColor: '#ffffff',
        flex: 1,
        marginTop: height * 0.03726708,
        alignItems: 'center'
    },
    optionText: {
        marginTop: height * 0.024068,
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
        color: '#000000',
        fontSize: height * 0.0217391304347826
    },
    horizontalRulerView: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#1850AB',
        backgroundColor: '#1850AB',
        borderWidth: 0.6,
        width: width * 0.8,
        marginTop: height * 0.024068
    }
});
