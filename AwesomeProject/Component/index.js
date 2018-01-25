import React, { Component } from 'react';
import { View,Text,TouchableOpacity,Image,StyleSheet,ImageBackground,AsyncStorage,Button} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from '../styles/index';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            qrActive: false,
            courseTokes: [],
        }
    }

    componentDidMount(){
        this.getData();
    }

    async getData(){
        try {
            var value = await AsyncStorage.getItem('courseTokes');
            if(value){
                this.setState({courseTokes: JSON.parse(value)});
            }
        } catch (e) {
            console.log(e);
        }
    }

    setData(){
        let arr = this.state.courseTokes;
        let len = arr.length;
        if(len > 2){
            arr = arr.slice(len-2,len);
        }
        arr.push(Math.random());
        this.setState({courseTokes: arr});
        AsyncStorage.setItem('courseTokes',JSON.stringify(arr));
    }

    onSuccess(e) {
        this.setData();
        this.setState({qrActive: false});
        this.props.navigation.navigate('Remote',{url: e.data});
    }

    onBack(){
        this.setState({qrActive: false});
    }

    activeQr(){
        // this.props.navigation.navigate('List');
        this.setData();
        this.setState({qrActive: true});
    }

    gotoState(){
        this.props.navigation.navigate('State');
    }

    render(){
        var display = this.state.qrActive ?
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.2)'}}>
                <QRCodeScanner
                    title='Scan Code'
                    onRead={this.onSuccess.bind(this)}
                    reactivate={false}
                    showMarker={true}
                    topContent={(
                        <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.2)',width:'100%',padding:8}}>
                            <TouchableOpacity onPress={this.onBack.bind(this)} >
                                <Icon name="arrow-left" size={12} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        )}
                />
            </View> :
                <View style={styles.container}>
                    <View style={styles.welcome}>
                        <Text style={styles.h1}>Okay智慧课堂欢迎您!</Text>
                        <Image style={styles.yun} source={require('../img/yun.png')}/>
                    </View>
                    <View style={styles.course}>
                        <View style={styles.connected}>
                            <Text style={styles.connectedText}>您当前连接过的课程：</Text>
                            {
                                this.state.courseTokes.length ?
                                this.state.courseTokes.map((token) => {
                                    return <Text key={token} style={{fontSize: 10,color: '#fff',paddingHorizontal:5,paddingVertical:1}}>{token}</Text>
                                }) :
                                <View style={styles.connectedTip}>
                                    <Text style={{fontSize: 10,color: '#fff'}}>您还没有当前上课记录，请点击下面</Text>
                                    <Text style={{fontSize: 10,color: '#fff'}}>扫描课堂二维码进入</Text>
                                </View>
                            }
                        </View>
                        <Text style={styles.tip}>点击上课记录或者扫描课堂二维码进入课堂控制！</Text>
                    </View>
                    <View style={styles.qr}>
                        <TouchableOpacity onPress={this.activeQr.bind(this)}>
                            <Image
                                style={styles.button}
                                source={require('../img/richScan.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.gotoState.bind(this)}>
                            <Text>State</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        return (
            <ImageBackground source={require('../img/page_bg.png')} style={styles.body} >
                {display}
            </ImageBackground>
        );
    }
}
