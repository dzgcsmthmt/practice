import React, {Component} from 'react';
import {View, Text, StyleSheet,Alert,TouchableHighlight,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var alertMessage = 'Credibly reintermediate next-generation potentialities after goal-oriented ' +
                   'catalysts for change. Dynamically revolutionize.';

export default class MyAlert extends Component {
    state = {date: new Date().toLocaleTimeString()}

    componentDidMount(){
        console.log('didMount');
        this.timerID = setInterval(() => this.tick,200);
    }

    compoentWillUnmount(){
        console.log('unMount');
        clearInterval(this.timerID);
    }

    tick(){
        this.setState({date: new Date().toLocaleTimeString()});
    }

    loginWithFacebook(){
        this.setState({date: new Date().toLocaleTimeString()});
    }

    render() {
        console.log('render');
        return (
            <View>
                <TouchableHighlight
                  onPress={() => Alert.alert(
                    'title',
                    alertMessage,
                    [
                       {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                       {text: 'OK', onPress: () => console.log('OK Pressed')},
                     ],
                     { cancelable: false }
                  )}>
                  <View>
                    <Text>Alert with message and default button</Text>
                    <Text>{this.state.date}</Text>
                  </View>
                </TouchableHighlight>
                <Icon name="folder-open" size={16} color="#eaeaea" />
                <Icon name="arrow-up" size={16} color="#eaeaea" />
                <Icon name="arrow-down" size={16} color="#eaeaea" />
                <Icon name="arrow-right" size={16} color="#eaeaea" />
                <Icon name="arrow-up" size={16} color="#eaeaea" />
                <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook.bind(this)}>
                    Login with Facebook
                </Icon.Button>
                <Text>Lorem <Icon name="circle-thin" color="#4F8EF7" /> Ipsum</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
