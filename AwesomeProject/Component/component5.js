import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

export default class Component5 extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="type here to translate"
                    onChangeText={(text) => this.setState({text})}
                    onSubmitEditing={() => console.log(this.state.text)}
                />
                <Text style={styles.text}>{this.state.text.split(" ").map((word) => word && '🍕').join('')}</Text>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        padding: 5
    },
    input: {
        height: 40
    },
    text: {
        padding: 10,
        fontSize: 24
    }
});
