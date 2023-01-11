import React from 'react';
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
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId:
        '507893860913-7f7jo2tc701380p6ocg8v8o05i179tsp.apps.googleusercontent.com',
    offlineAccess: true
});

async function signinWithGoogle() {
    try {
        //get the users id Token
        const { idToken } = await GoogleSignin.signIn();
        //create a oogle credentials with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        //sign in the user with the credentials
        // console.log(`token is: ${idToken}`);
        // console.log(`google credentials is:`);
        // console.log(googleCredential);
        let credentials = auth().signInWithCredential(googleCredential);
        console.log('====================================');
        console.log((await credentials).user);
        console.log('====================================');
        // console.log(credentials);

        return credentials;
    } catch (error) {
        console.log('====================================');
        console.log('Error in login is: ' + error);
        console.log('====================================');
    }
}
const Login = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.topContent}>
                    <Text style={styles.mainText}>Social Auth</Text>
                </View>
                <View style={styles.bottomContent}>
                    <TouchableOpacity
                        onPress={signinWithGoogle}
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
