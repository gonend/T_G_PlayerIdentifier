import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window');

export default class Splash extends Component<{}, { isVisible: boolean }> {
    //this is a class that control the visability of the splash component
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
                    source={require('../../assets/img/nba_logo.png')}
                    style={styles.nbaLogo}
                />
                <Image
                    source={require('../../assets/img/playerIdentifierText3.png')}
                    style={styles.playerIdentifierSymbol}
                />

                <Animatable.View>
                    <Animatable.Image
                        style={styles.boucingBall}
                        animation="bounce"
                        iterationCount={'infinite'}
                        direction="normal"
                        source={require('../../assets/img/basketball.png')}
                    ></Animatable.Image>
                </Animatable.View>
            </View>
        );

        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/img/splash_background.png')}
                    style={styles.backgroundImage}
                >
                    <View>
                        {this.state.isVisible === true ? Splash_Screen : null}
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },

    nbaLogo: {
        alignSelf: 'center',
        marginTop: height * 0.053335,
        height: height * 0.299401197,
        width: width * 0.55555555,
        resizeMode: 'contain'
    }, //the calculation is: marginFromTop/windowHeight
    playerIdentifierSymbol: {
        alignSelf: 'center',
        // marginTop: height * 0.0207783,
        height: height * 0.43604651,
        width: width * 0.55555555,
        resizeMode: 'contain'
    },
    boucingBall: {
        alignSelf: 'center',
        // marginTop: height * 0.0302138,
        height: height * 0.20348837,
        width: width * 0.388888888,
        resizeMode: 'contain'
    }
});
