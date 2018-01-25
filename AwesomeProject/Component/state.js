import React, {Component} from 'react';
import {View, Text, StyleSheet, AppState,Button,NetInfo} from 'react-native';
import Sound from 'react-native-sound';

export default class StateScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentAppState: AppState.currentState,
            playState: 'pause',
            count: 0,
            type: ''
        }
        Sound.setCategory('Playback');
        this.whoosh = new Sound('one_sweet_day.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + this.whoosh.getDuration());
            console.log('volume: ' + this.whoosh.getVolume());
            console.log('isLoaded: ' + this.whoosh.isLoaded());
        });
    }

    componentDidMount(){
        AppState.addEventListener('change', this._handleAppStateChange);
        NetInfo.addEventListener('connectionChange',this.handleFirstConnectivityChange);
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            this.setState({type: connectionInfo.type});
        });
    }

    componentWillUnmount(){
        AppState.removeEventListener('change', this._handleAppStateChange);
        NetInfo.removeEventListener('connectionChange',this.handleFirstConnectivityChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.currentAppState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
        }
        this.setState((prevState) => {
            return {currentAppState: nextAppState,count: ++prevState.count}
        });
    }

    handleFirstConnectivityChange(connectionInfo) {
        console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
        this.setState({type: connectionInfo.type});
    }

    togglePlay(){
        console.log('getCurrentTime : ' + this.whoosh.getCurrentTime((seconds,isPlaying) => {
            console.log(seconds,isPlaying);
            return seconds;
        }));
        this.setState((prevState) => {
            if(prevState.playState == 'pause'){
                this.whoosh.play();
                return {playState: 'play'};
            }else{
                this.whoosh.pause();
                return {playState: 'pause'};
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.currentAppState}</Text>
                <Text>{this.state.count}</Text>
                <Text>网络:{this.state.type}</Text>
                <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                    <Button onPress={this.togglePlay.bind(this)} title={this.state.playState == 'pause' ? 'Play' : 'Pause'} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
