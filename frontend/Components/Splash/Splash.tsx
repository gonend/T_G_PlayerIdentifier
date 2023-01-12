import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window');

export default class Splash extends Component<{}, { isVisible: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isVisible: true
        };
    }

    Hide_Splash_Screen = () => {
        this.setState({
            isVisible: false
        });
    };

    componentDidMount() {
        var that = this;
        setTimeout(function () {
            that.Hide_Splash_Screen();
        }, 5000);
    }

    render() {
        let Splash_Screen = (
            <View>
                <Image
                    source={require('../../img/login_kobe_logo.png')}
                    style={styles.kobePic}
                />
                <Image
                    source={require('../../img/playerIdentifierText.png')}
                    style={styles.playerIdentifierSymbol}
                />

                <Animatable.View>
                    <Animatable.Image
                        style={styles.loadingBar}
                        animation="rotate"
                        iterationCount={'infinite'}
                        direction="reverse"
                        source={require('../../img/loadingBar.png')}
                    ></Animatable.Image>
                </Animatable.View>
            </View>
        );

        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#28449C', '#0064C3']}
                style={styles.linearGradient}
            >
                <View>
                    {/* {this.state.isVisible === true ? Splash_Screen : null} */}
                    {Splash_Screen}
                </View>
            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1
    },

    kobePic: { alignSelf: 'center', marginTop: height * 0.153335 }, //the calculation is: marginFromTop/windowHeight
    playerIdentifierSymbol: {
        alignSelf: 'center',
        marginTop: height * 0.0207783
    },
    loadingBar: {
        alignSelf: 'center',
        marginTop: height * 0.0302138
    }
});