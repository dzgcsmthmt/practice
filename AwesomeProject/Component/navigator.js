import React, {Component} from 'react';
import { View, Text, Button,TouchableHighlight } from 'react-native';
import { StackNavigator,Easing,Animated} from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import HomeScreen from './index';
import RemoteScreen from './remote';
import ListScreen from './list';
import StateScreen from './state';
import Icon from 'react-native-vector-icons/FontAwesome';


const RootNavigator = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                headerTitle: 'Okay智慧课堂',
                headerStyle: {backgroundColor: 'rgba(0, 0, 0, 0.8)',height:30},
                headerTitleStyle: {fontSize: 16,color: '#fff',alignSelf:'center'},
                headerLeft: null
            },
        },
        Remote: {
            screen: RemoteScreen,
            navigationOptions: ({navigation}) => ({
                headerTitle: '上课',
                headerStyle: {backgroundColor: 'rgba(0, 0, 0, 0.8)',height:30},
                headerTitleStyle: {fontSize: 16,color: '#fff'},
                // headerLeft: (
        		// 	<TouchableHighlight onPress={() => navigation.goBack()}>
        		// 			<Icon name="arrow-left" size={12} color="#fff" style={{paddingHorizontal: 5}}/>
        		// 	</TouchableHighlight>
        		// )
            })
        },
        List: {
            screen: ListScreen,
            navigationOptions: {
                headerTitle: 'List',
            }
        },
        State: {
            screen: StateScreen,
            navigationOptions: {
                headerTitle: 'State',
            }
        }
    },
    {
       transitionConfig: getSlideFromRightTransition,
       navigationOptions: {
           gesturesEnabled: true,
           gestureDirection: 'inverted',
       }
    }
)

export default RootNavigator;
