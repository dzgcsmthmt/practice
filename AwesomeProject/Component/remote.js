import React, { Component } from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Animated,LayoutAnimation,Easing,ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RemoteScreen extends Component{
    constructor(props){
        super(props);
        this.expanded = true;
        this.state = {
            url: this.props.navigation.state.params.url,
            w: 200,
            opacityAnmValue: new Animated.Value(0)
        }
    }

    toggleAni(){
        debugger;
        if(this.expanded){
            this.setState({w: 50});
        }else{
            this.setState({w: 200});
        }
        LayoutAnimation.configureNext({
            duration: 1000,   //持续时间
            update: {
                type: 'spring',
                springDamping: 0.8
            }
        });
        this.expanded = !this.expanded;
    }

    fadeIn(){
        Animated.timing(this.state.opacityAnmValue, {
            toValue: 1,  //透明度动画最终值
            duration: 2000,   //动画时长3000毫秒
            easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)  //缓动函数
        }).start(function(object){
            ToastAndroid.show(object.finished.toString(), ToastAndroid.SHORT);
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={[styles.anim,{width: this.state.w}]}>
                    <View style={styles.btns}>
                        <TouchableOpacity onPress={this.toggleAni.bind(this)} style={styles.btn}>
                            <Icon name="share-square" size={12} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,{left:50}]}>
                            <Icon name="glass" size={12} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,{left:100}]}>
                            <Icon name="envelope" size={12} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,{left:150}]}>
                            <Icon name="address-book" size={12} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Animated.View ref="view" style={{backgroundColor: 'lightgreen',width: '100%', height: 20, opacity: this.state.opacityAnmValue}}>
                    <Text style={[{textAlign: 'center'}]}>Hi, here is VaJoy</Text>
                </Animated.View>
                <TouchableOpacity onPress={this.fadeIn.bind(this)}>
                    <Text style={[{textAlign: 'center'}]}>Press me!</Text>
                </TouchableOpacity>
                <Text style={[{textAlign: 'center'}]}>{this.state.url}</Text>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    anim:{
        marginHorizontal:20,
        marginVertical:30,
        borderWidth: 1,
        borderColor: '#87d9ff',
        borderRadius: 5,
        height: 30,
        backgroundColor: 'rgba(0,0,0,0.3)',
        overflow: 'hidden'
    },
    btns:{
        position: 'relative'
    },
    btn: {
        position: 'absolute',
        width: 50,
        height: 30,
        // textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
