import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
    webClientId:
        '507893860913-7f7jo2tc701380p6ocg8v8o05i179tsp.apps.googleusercontent.com',
    offlineAccess: true
});

const Login = () => {
    const [authorizedUser, setAuthorizedUser] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>();
    // const [credentials, setCredentials] =
    //     useState<FirebaseAuthTypes.UserCredential>();

    async function getUserCredentialsWithToken(idToken: string) {
        try {
            const googleCredential =
                auth.GoogleAuthProvider.credential(idToken);
            let credentials = await auth().signInWithCredential(
                googleCredential
            );
            return credentials;
        } catch (error) {
            console.log(error);
        }
    }

    async function signInWithGoogle() {
        try {
            //get the users id Token
            const { idToken } = await GoogleSignin.signIn();
            //create a google credentials with the token
            let credentials;
            if (idToken) {
                credentials = await getUserCredentialsWithToken(idToken);
                if (credentials?.user) {
                    let tempUser = await GoogleSignin.getCurrentUser();
                    console.log(tempUser);

                    setUser(tempUser);

                    // set access token in AsyncStorage storage
                    AsyncStorage.setItem(
                        'accessToken',
                        tempUser?.idToken as string
                    );
                    setAuthorizedUser(true);
                }
            }

            return credentials;
        } catch (error) {
            console.log('====================================');
            console.log('Error in login is: ' + error);
            console.log('====================================');
        }
    }

    async function logoutUser() {
        GoogleSignin.signOut();
        console.log('before:');

        console.log(await AsyncStorage.getItem('accessToken'));
        AsyncStorage.clear();
        console.log('after:');
        console.log(await AsyncStorage.getItem('accessToken'));
        setUser(null);

        console.log('logged out');
        setAuthorizedUser(false);
    }

    useEffect(() => {
        (async () => {
            let storageIdToken = await AsyncStorage.getItem('accessToken');

            if (storageIdToken) {
                let tempUser = await GoogleSignin.getCurrentUser();
                console.log('====================================');
                console.log(tempUser);
                if (tempUser) {
                    setAuthorizedUser(true);
                }
                console.log('====================================');
            }
        })();
    }, []);
    useEffect(() => {
        (async () => {
            if (authorizedUser) {
                let myUser = await GoogleSignin.getCurrentUser();
                setUser(myUser);
            }
        })();
    }, [authorizedUser]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.topContent}>
                    <Text style={styles.mainText}>Social Auth</Text>
                    {authorizedUser === true ? (
                        <Text style={{ color: '#FFFFFF' }}>
                            welcome {user?.user.name}
                        </Text>
                    ) : (
                        <></>
                    )}
                </View>
                <View style={styles.bottomContent}>
                    {authorizedUser ? (
                        <TouchableOpacity
                            onPress={logoutUser}
                            style={styles.googleButton}
                        >
                            <Image
                                style={styles.googleIcon}
                                source={{
                                    uri: 'https://i.ibb.co/j82DCcR/search.png'
                                }}
                            />
                            <Text style={styles.googleButtonText}>Log out</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={signInWithGoogle}
                            style={styles.googleButton}
                        >
                            <Image
                                style={styles.googleIcon}
                                source={{
                                    uri: 'https://i.ibb.co/j82DCcR/search.png'
                                }}
                            />
                            <Text style={styles.googleButtonText}>
                                Sign in with Google
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#262b2f'
    },
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: '#262b2f'
    },
    topContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainText: {
        fontSize: 54,
        color: 'white'
    },
    googleButton: {
        backgroundColor: 'white',
        borderRadius: 4,
        paddingHorizontal: 34,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    googleButtonText: {
        marginLeft: 16,
        fontSize: 18,
        fontWeight: '600'
    },
    googleIcon: {
        height: 24,
        width: 24
    }
});
export default Login;
