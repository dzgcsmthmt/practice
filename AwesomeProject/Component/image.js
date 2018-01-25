import React, {Component} from 'react';
import {View, Text, StyleSheet,Image,Dimensions} from 'react-native';

var win = Dimensions.get('window');
var ratio = 750 / win.width;

export default class renderImages extends Component {
    handler(evt){
        console.log(evt.nativeEvent.layout);
    }
    render() {
        return (
            <View>
                <Image
                    style={styles.icon}
                    source={require('../img/QQ.png')}
                    onLayout={this.handler}
                />
                <Image
                    style={styles.logo}
                    source={{uri: 'https://www.okayzhihui.com/themes/okayofficeweb/Public/assets/img/yun.png'}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    icon: {
        width: '100%',
        height: win.width
    },
    logo: {
        width: 60 / ratio,
        height: 60 / ratio,
    }
});
