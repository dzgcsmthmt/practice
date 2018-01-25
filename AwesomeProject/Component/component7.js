import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

export default class Component7 extends Component {
  render() {
    return (
      <View style={styles.container}>
          <FlatList
              data={[
                 {key: 'Devin',age: 28},
                 {key: 'Jackson',age: 32},
                 {key: 'James',age: 24},
                 {key: 'Joel',age: 26},
                 {key: 'John',age: 27},
                 {key: 'Jillian',age: 40},
                 {key: 'Jimmy',age: 34},
                 {key: 'Julie',age: 38},
             ]}
             renderItem={({item}) => <Text style={styles.item}>{item.key}@{item.age}</Text>}
         />
         <Text>{this.props.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: 'yellow'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: '#000'
    }
});
