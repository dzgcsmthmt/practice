import React,{ Component } from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default class Component3 extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>hello,react native!</Text>
                <Text style={[styles.text,styles.em]}>I am coming</Text>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff0',
    },
    text: {
        fontSize: 20
    },
    em: {
        fontSize: 40,
        fontWeight: 'bold'
    }
});
