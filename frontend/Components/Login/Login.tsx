import React, { useRef } from 'react';
import {
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

import { UserContext } from '../../App';
import LinearGradient from 'react-native-linear-gradient';

GoogleSignin.configure({
    webClientId:
        '507893860913-7f7jo2tc701380p6ocg8v8o05i179tsp.apps.googleusercontent.com',
    offlineAccess: true
});

const Login = (props: any) => {
    //This compoenent allows a user to sign into this app with proper google account credentials.
    //A user will get to this compoenent if the user is not autorized.
    //After a user was logged in he will skip this screen and go straight to home screen.
    //This component includes the folowing:
    //1: logging a user in with google sign in (powered by firebase) and storing the token (needed to make requests from backend)inside userContext
    let userContext = React.useContext(UserContext);
    const navigation = props.navigation;
    let getHistoryFlagRef = useRef(true); //creating a useRef hook that will determine if home component should fetch user history.

    async function getUserCredentialsWithToken(idToken: string) {
        //function that is being runned by the signInWithGoogle function
        //this function will try to get the credentials for the specific user and return it
        try {
            const googleCredential =
                auth.GoogleAuthProvider.credential(idToken);
            let credentials = await auth().signInWithCredential(
                googleCredential
            );
            console.log(credentials);
            return credentials;
        } catch (error) {
            console.log('error authenticationg ur token');
            console.log(error);
        }
    }

    async function signInWithGoogle() {
        //function that is being runned by pressing the signInWithGoogle button.
        //start the proccess of a google sign in.
        //by the end of this function run the userToken (required for backend requests) will be stored in userContext.
        try {
            //get the users id Token
            const { idToken } = await GoogleSignin.signIn();
            console.log('sharmuta');
            //create a google credentials with the token
            let credentials;
            if (idToken) {
                credentials = await getUserCredentialsWithToken(idToken);
                if (credentials?.user) {
                    userContext.setUserObject(credentials?.user);
                    //updates userContext with a valid token to use while sending requests to the backend.
                    let token = await credentials?.user.getIdToken(true);
                    userContext.setIdToken(token);
                    //a useRef hook that will be passed to home component and determine if home should get history from the backend. (after logout or after a starting new instance of the app)
                    getHistoryFlagRef.current = true;
                    userContext.setIsUserAuthorized(true);

                    navigation.navigate('Home', {
                        getHistoryFlag: getHistoryFlagRef
                    });
                }
            }

            return credentials;
        } catch (error) {
            console.log('====================================');
            console.log('Error in login is: ' + error);
            console.log('====================================');
        }
    }

    // async function logoutUser() {
    //     GoogleSignin.signOut();

    //     userContext.setUserObject(null);

    //     userContext.setIsUserAuthorized(false);
    // }

    return (
        <LinearGradient
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0, y: 1 }}
            colors={['#315466', '#2a6381']}
            style={styles.linearGradient}
        >
            {/* <StatusBar barStyle="light-content" /> */}
            <View style={styles.container}>
                <View style={styles.topContent}>
                    <View style={styles.imgView}>
                        <Image
                            style={styles.nbaLogo}
                            source={require('../../assets/img/nba_logo.png')}
                        />
                    </View>
                    <Text style={styles.mainText}>Welcome!</Text>
                    {userContext.isUserAuthorized === true ? (
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: height * 0.02994011
                            }}
                        >
                            {userContext.userObject?.displayName}
                        </Text>
                    ) : (
                        <></>
                    )}
                </View>
                <View style={styles.bottomContent}>
                    {userContext.isUserAuthorized ? (
                        // <TouchableOpacity
                        //     onPress={logoutUser}
                        //     style={styles.googleButton}
                        // >
                        //     <Image
                        //         style={styles.googleIcon}
                        //         source={{
                        //             uri: 'https://i.ibb.co/j82DCcR/search.png'
                        //         }}
                        //     />
                        //     <Text style={styles.googleButtonText}>Log out</Text>
                        // </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 30,
                                textAlign: 'center',
                                color: 'white'
                            }}
                        >
                            Redirecting to home page...
                        </Text>
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
        maxHeight: height * 0.220559
    },
    nbaLogo: {
        flex: 1,
        resizeMode: 'contain'
    },
    bottomContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainText: {
        fontSize: height * 0.08083832,
        color: 'white',
        fontFamily: 'OpenSans-Bold'
    },
    googleButton: {
        backgroundColor: 'white',
        borderRadius: width * 0.01111111,
        paddingHorizontal: width * 0.094444444,
        paddingVertical: height * 0.02395209,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    googleButtonText: {
        marginLeft: width * 0.04444444,
        fontSize: height * 0.0269461,
        fontWeight: '600',
        fontFamily: 'OpenSans-Bold'
    },
    googleIcon: {
        height: height * 0.035928143,
        width: width * 0.0666666666
    }
});
export default Login;
