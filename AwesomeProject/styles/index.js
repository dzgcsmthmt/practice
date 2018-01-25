import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    body: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    welcome: {
        position: 'relative',
    },
    h1:{
        marginVertical: 20,
        marginHorizontal : 15,
        fontSize: 12,
        color: '#fff',
        borderWidth: 2,
        borderColor: '#87d9ff',
        borderRadius: 4,
        height: 30,
        paddingLeft: 8,
        paddingTop: 7,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    yun: {
        position: 'absolute',
        width: 45,
        height: 45,
        right: 18,
        top: 14,
    },
    course: {
        flex: 1,
    },
    connected: {
        flex: 1,
        marginVertical: 15,
        marginHorizontal: 15,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 4,
    },
    connectedText:{
        fontSize: 12,
        color: '#fff',
        paddingLeft: 5,
        lineHeight: 28,
    },
    connectedTip: {
        flex: 1,
        alignItems: 'center',
        justifyContent : 'center'
    },
    tip: {
        fontSize: 10,
        color: '#fff',
        paddingLeft: 20,
    },
    qr: {
        flex: 1,
        alignItems: 'center',
        justifyContent : 'center'
    },
    button: {
        width: 60,
        height: 60,
    }

});
