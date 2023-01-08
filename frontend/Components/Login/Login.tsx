import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { IFirstTimeUser } from '../../Interfaces/IFirstTimeUser';
import { UserContext } from '../../App';

const Login = (props: any) => {
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const navigation = props.navigation;
    let value = React.useContext(UserContext);
    const [isUserAlreadyExist, setIsUserAlreadyExist] = useState(false);

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#28449C', '#0064C3']}
            style={styles.linearGradient}
        >
            <View style={styles.imgView}>
                <Image
                    style={styles.monsterPic}
                    source={require('../../img/login_kobe_logo.png')}
                />
            </View>
            <View>
                <Text style={styles.titleText}>Welcome!</Text>
                <Text style={styles.descriptionText}>
                    Please sign in using email & password Or via Google
                </Text>
            </View>

            <View>
                <TextInput
                    style={styles.emailInput}
                    placeholder="Email"
                    onChangeText={(newText) => setEmailText(newText)}
                    defaultValue={emailText}
                    placeholderTextColor={'#132D42'}
                />
            </View>
            <View>
                <TextInput
                    style={styles.phoneInput}
                    placeholder="Password"
                    onChangeText={(newText) => setPasswordText(newText)}
                    defaultValue={passwordText}
                    placeholderTextColor={'#132D42'}
                />
            </View>
            <View style={styles.buttonsView}>
                <Pressable
                    onPress={() => {
                        //checkUserDataBeforeNextPage();
                    }}
                    style={styles.signInbutton}
                >
                    <Text style={styles.signInbuttonText}>Sign in</Text>
                </Pressable>
                <Text style={styles.orText}>OR</Text>
                <Pressable
                    onPress={() => {
                        //checkUserDataBeforeNextPage();
                    }}
                    style={styles.googleSignInbutton}
                >
                    <Text style={styles.googleSignInbuttonText}>
                        google btn
                    </Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
};

const { height, width } = Dimensions.get('window');

var styles = StyleSheet.create({
    linearGradient: {
        flex: 1
    },
    imgView: {
        flex: 1,
        marginTop: height * 0.0427795,
        maxHeight: height * 0.210559
    },
    monsterPic: {
        flex: 1,
        Width: null,
        Height: null,
        resizeMode: 'contain'
        // alignSelf: 'center',
    }, //the calculation is: marginFromTop/appHeight based on zigit (644)
    titleText: {
        color: '#FFFFFF',
        fontFamily: 'OpenSans-Bold',
        alignSelf: 'center',
        marginTop: height * 0.013369565,
        fontSize: height * 0.0496894409937888,
        lineHeight: height * 0.0667701
    },
    descriptionText: {
        color: '#FFFFFF',
        fontFamily: 'OpenSans-Regular',
        alignSelf: 'center',
        marginTop: height * 0.0256521,
        fontSize: height * 0.02484472,
        marginHorizontal: width * 0.0826666,
        textAlign: 'center',
        lineHeight: height * 0.03416149
    },
    emailInput: {
        backgroundColor: 'white',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        fontFamily: 'OpenSans-Regular',
        color: '#132D42',
        borderRadius: 10,
        marginHorizontal: width * 0.0533333333,
        fontSize: height * 0.02484472,
        paddingRight: width * 0.03733333,
        marginTop: height * 0.06
    },

    phoneInput: {
        backgroundColor: 'white',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        fontFamily: 'OpenSans-Regular',
        color: '#132D42',
        borderRadius: 10,
        marginHorizontal: width * 0.0533333333,
        fontSize: height * 0.02484472,
        paddingRight: width * 0.03733333,
        marginTop: height * 0.06832298
    },
    buttonsView: { alignItems: 'center' },
    signInbutton: {
        // alignItems: 'center',
        backgroundColor: '#d9304c',
        borderRadius: height * 0.0388198,
        marginHorizontal: width * 0.0533333333,
        marginTop: height * 0.0335403,
        height: height * 0.06540372,
        width: 100,
        justifyContent: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 2
    },
    signInbuttonText: {
        color: '#FFFFFF',
        fontSize: height * 0.02795031,
        fontFamily: 'OpenSans-Regular',
        letterSpacing: 0,
        lineHeight: height * 0.03726708,
        textAlign: 'center'
    },
    orText: {
        color: '#FFFFFF',
        marginTop: height * 0.015527,
        marginBottom: height * 0.015527,
        fontFamily: 'OpenSans-Bold',
        fontSize: 25
    },
    googleSignInbutton: {
        alignItems: 'center',
        backgroundColor: '#d9304c',
        borderRadius: height * 0.0388198,
        marginHorizontal: width * 0.0533333333,
        // marginTop: height * 0.0335403,
        height: height * 0.06540372,
        width: 150,
        justifyContent: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 2
    },
    googleSignInbuttonText: {
        color: '#FFFFFF',
        fontSize: height * 0.02795031,
        fontFamily: 'OpenSans-Regular',
        letterSpacing: 0,
        lineHeight: height * 0.03726708,
        textAlign: 'center'
    }
});

export default Login;
