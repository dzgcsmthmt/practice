import React,{ Component } from 'react';
import { View,Text, StyleSheet } from 'react-native';

class Blink extends Component{
    constructor(props){
        super(props);
        this.state = {showText: true};

        // setInterval(() => {
        //      this.setState(previousState => {
        //        return { showText: !previousState.showText };
        //      });
        //  }, 5000);

    }

    render(){
        var display = this.state.showText ? this.props.text : '';
        return (
            <Text style={{width: 100, height: 100, backgroundColor: 'skyblue'}}>{display}</Text>
        )
    }

}

export default class Component2 extends Component{
    render(){
        return (
            <View>
                <Blink text='I love to blink' />
                <Blink text='Yes blinking is so great' />
                <Blink text='Why did they ever take this out of HTML' />
                <Blink text='Look at me look at me look at me' />
            </View>
        )
    }
}
