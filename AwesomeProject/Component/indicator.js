/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet,Button,ToastAndroid} from 'react-native';

export default class Indicator extends Component {
    onPressLearnMore(){
        ToastAndroid.showWithGravity('This is a toast with long duration', ToastAndroid.LONG,ToastAndroid.CENTER);
    }
    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => this.onPressLearnMore()}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
