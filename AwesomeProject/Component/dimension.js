import React, { Component } from 'react';
import {StyleSheet,View,Text,Dimensions} from 'react-native';

let winSize = Dimensions.get('window');
var ratio = 750 / winSize.width;
console.log(winSize);

export default class Dimension extends Component{
    handleTextLayout(evt){
        console.log(evt);
        console.log(evt.nativeEvent.layout);
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.block}/>
                <Text style={styles.text}
                    onLayout={this.handleTextLayout}>some text</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    block: {
        width: '100%',
        height: 100,
        backgroundColor: 'red'
    },
    text: {
        color: '#ffffff',
        fontSize: 40/ratio,
        backgroundColor: 'blue',
    }
});
