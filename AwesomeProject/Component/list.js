import React, {Component} from 'react';
import {View, Text, StyleSheet,ActivityIndicator,FlatList, TouchableOpacity,ToastAndroid} from 'react-native';

export default class ListScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            data: []
        }
    }

    componentDidMount(){
        fetch('http://hotfix.pay.xk12.cn/index.php?m=OkayMall&c=mobileGoods&a=getGoods&mall_token=&c2Id=339',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.data.root);
            this.setState({loaded: true,data: responseJson.data.root});
        }).catch((error) => {
            console.error(error);
        });
    }

    onPress(item){
        ToastAndroid.showWithGravity(item.goodsName, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

    render() {
        return (
            this.state.loaded ?
            <View style={styles.container}>
                <FlatList
                  data={this.state.data}
                  renderItem={({item}) =>
                      <TouchableOpacity onPress={() => this.onPress(item)} >
                          <Text style={{textAlign: 'center',height:30}}>{item.goodsName}</Text>
                      </TouchableOpacity>
                  }
                  keyExtractor={(item, index) => item.goodId}
                />
            </View>
            : <ActivityIndicator
                style={styles.container}
                size="large"
                color='lightblue'
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
