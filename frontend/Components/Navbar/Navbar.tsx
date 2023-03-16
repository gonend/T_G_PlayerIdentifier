import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

const Navbar = (props: any) => {
    //This compoenent is the navbar thats on top of the screen through most of the app screens.
    //The burger button that open the menu will always be on the right.
    //the left image (fow now its only goBack) will apear only in part of the screens. (not all screens should allow going back).

    const titleName = props.titleName;
    // const leftImgSourceString = props.leftImgSourceString;
    const leftImageRole = props.leftImageRole;
    const navigation = props.navigation;

    function leftImgOnPressFunction() {
        if (leftImageRole === 'goBack') {
            navigation.pop();
        }
    }

    return (
        <View style={styles.homeNavbarView}>
            <Pressable
                onPress={() => {
                    navigation.navigate('HamburgerMenu');
                }}
            >
                <Image
                    style={styles.hamburgerMenuIcon}
                    source={require('../../assets/img/hamburgerMenu.png')}
                />
            </Pressable>

            <Text style={styles.navbarTitle}>{titleName}</Text>
            {leftImageRole === 'goBack' ? (
                <Pressable onPress={leftImgOnPressFunction}>
                    <Image
                        style={styles.leftIcon}
                        source={require('../../assets/img/previous.png')}
                    />
                </Pressable>
            ) : (
                <></>
            )}
        </View>
    );
};

const { height, width } = Dimensions.get('window');

var styles = StyleSheet.create({
    homeNavbarView: {
        flexDirection: 'row-reverse',
        backgroundColor: '#0064C3',
        justifyContent: 'space-between',
        height: height * 0.0714285,
        alignItems: 'center'
    },
    hamburgerMenuIcon: {
        marginHorizontal: width * 0.0533333333,
        height: 25,
        width: 25
    },
    leftIcon: {
        marginHorizontal: width * 0.0533333333,
        height: 40,
        width: 40
    },
    navbarTitle: {
        color: '#FFFFFF',
        fontSize: height * 0.02484472,
        letterSpacing: 0,
        lineHeight: height * 0.03416149,
        fontFamily: 'OpenSans-Regular'
    }
});

export default Navbar;
