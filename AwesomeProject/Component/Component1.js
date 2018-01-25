import React,{ Component } from 'react';
import { View,Text, StyleSheet } from 'react-native';

class User extends Component {
    render() {
        return (
            <Text style={styles.item}>hello,{this.props.name}!</Text>
        )
    }
}

export default class Component1 extends Component{
    render(){
        return (
            <View style={styles.container}>
                <User name='张三' />
                <User name='李四' />
                <User name='王五' />
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    item: {
        color: '#f00'
    }
})
