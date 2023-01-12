import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

const Navbar = (props: any) => {
    const titleNames = props.titleName;
    const leftImgSourceString = props.leftImgSourceString;
    const leftImageRole = props.leftImageRole;
    const navigation = props.navigation;

    // function leftImgOnPressFunction() {
    //     if (leftImageRole === 'goBack') {
    //         navigation.navigate('Home', {});
    //     } else if (leftImageRole === 'alerts') {
    //         console.log('show alerts');
    //     }
    // }

    return (
        <View style={styles.homeNavbarView}>
            <Pressable
                onPress={() => {
                    navigation.navigate('HamburgerMenu');
                }}
            >
                <Image
                    style={styles.hamburgerMenu}
                    source={require('../../assets/img/hamburgerMenu.png')}
                />
            </Pressable>

            <Text style={styles.navbarTitle}>{titleNames}</Text>
            {/* <Pressable onPress={leftImgOnPressFunction}>
                <Image
                    style={styles.alertIcon}
                    source={props.leftImgSourceString}
                />
            </Pressable> */}
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
    hamburgerMenu: { marginHorizontal: width * 0.0533333333 },
    alertIcon: { marginHorizontal: width * 0.0533333333 },
    navbarTitle: {
        color: '#FFFFFF',
        fontSize: height * 0.02484472,
        letterSpacing: 0,
        lineHeight: height * 0.03416149,
        fontFamily: 'OpenSans-Regular'
    }
});

export default Navbar;
