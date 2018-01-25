import React, {Component} from 'react';
import {View, Text, StyleSheet,Image,ImageBackground} from 'react-native';

class Bg extends Component{
    render(){
        return (
            <Image source={require('../img/bg.png')}
                style={styles.bgImage}>
            </Image>
        )
    }
}

export default class BgImage extends Component {
    render() {
        return (
            <ImageBackground source={require('../img/bg.png')} style={styles.container} >
                <Text>Inside</Text>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    }
});
