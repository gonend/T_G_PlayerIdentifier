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
import { UserContext } from '../../App';
import LinearGradient from 'react-native-linear-gradient';

GoogleSignin.configure({
    webClientId:
        '507893860913-7f7jo2tc701380p6ocg8v8o05i179tsp.apps.googleusercontent.com',
    offlineAccess: true
});

const Login = (props: any) => {
    // const [user, setUser] = useState<User | null>();
    let userContext = React.useContext(UserContext);
    const navigation = props.navigation;

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
            console.log('error authenticationg ur token');
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
                    userContext.setUserObject(tempUser);

                    // set access token in AsyncStorage storage
                    AsyncStorage.setItem(
                        'accessToken',
                        tempUser?.idToken as string
                    );
                    userContext.setIsUserAuthorized(true);
                    navigation.navigate('Home', {});
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
        // console.log('before:');

        // console.log(await AsyncStorage.getItem('accessToken'));
        AsyncStorage.clear();
        // console.log('after:');
        // console.log(await AsyncStorage.getItem('accessToken'));
        userContext.setUserObject(null);

        // console.log('logged out');
        userContext.setIsUserAuthorized(false);
    }

    useEffect(() => {
        (async () => {
            if (userContext.userObject.idToken !== '-1') {
                userContext.setIsUserAuthorized(true);
            }
        })();
    }, []);

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#28449C', '#0064C3']}
            style={styles.linearGradient}
        >
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.topContent}>
                    <View style={styles.imgView}>
                        <Image
                            style={styles.kobePic}
                            source={require('../../assets/img/login_kobe_logo.png')}
                        />
                    </View>
                    <Text style={styles.mainText}>Welcome!</Text>
                    {userContext.isUserAuthorized === true ? (
                        <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
                            {userContext.userObject?.user.name}
                        </Text>
                    ) : (
                        <></>
                    )}
                </View>
                <View style={styles.bottomContent}>
                    {userContext.isUserAuthorized ? (
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
        </LinearGradient>
    );
};
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1
    },
    container: {
        height: height,
        flex: 1
    },
    topContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgView: {
        flex: 1,
        marginTop: height * 0.0427795,
        maxHeight: height * 0.210559
    },
    kobePic: {
        flex: 1,
        Width: null,
        Height: null,
        resizeMode: 'contain'
        // alignSelf: 'center',
    }, //the calculation is: marginFromTop/appHeight based on zigit (644)
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
