import React,{ Component } from 'react';
import {View,Text,Image,ScrollView} from 'react-native';

export default class Component6 extends Component{
    render(){
        return (
            <ScrollView horizontal>
                <Text style={{fontSize: 40}}>scroll me plz</Text>
                <Image source={require('../img/QQ.png')} />
                <Image source={require('../img/qq01.png')} />
                <Image source={require('../img/qq2.png')} />
                <Text style={{fontSize: 40}}>go on</Text>
                <Image source={require('../img/safari.png')} />
                <Image source={require('../img/safari01.png')} />
                <Image source={require('../img/UC.png')} />
                <Text style={{fontSize: 40}}>almost there</Text>
                <Image source={require('../img/pyq.png')} />
                <Image source={require('../img/top.png')} />
                <Text style={{fontSize: 40}}>the end</Text>
            </ScrollView>
        )
    }
}
