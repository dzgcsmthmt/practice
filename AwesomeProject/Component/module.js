import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import util from '../util/util';

export default class MyModule extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>I'm the MyComponent component</Text>
                <Text>{JSON.stringify(util.getUrlParam('name','https://www.163.com/layout.html?name=zs&age=28#content'))}</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
