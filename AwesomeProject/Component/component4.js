import React, { Component } from 'react';
import {View,Text} from 'react-native';


export default class Component4 extends Component{
    render(){
        return (
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={{width:100,height:50,backgroundColor: 'lightblue'}}></View>
                <View style={{width:100,height:30,backgroundColor: 'lightgreen'}}></View>
                <View style={{width:120,backgroundColor: 'lightyellow'}}></View>
            </View>
        )
    }
}
