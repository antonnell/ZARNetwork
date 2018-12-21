import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

// eslint-disable-next-line react/prefer-stateless-function
export default class Card extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: 'rgb(0,177,251)',
          height: deviceHeight * 0.3,
          width: deviceWidth * 0.7,
          borderRadius: 5,
          marginLeft: 20,
        }}
      >
        <View
          style={{ backgroundColor: 'rgb(40,190,253)', height: deviceHeight * 0.1, padding: 20 }}
        >
          <Text style={{ color: 'white', fontSize: 15 }}>Micheal Smith</Text>
          <Text style={{ color: 'white' }}>2134 5678 9656 4756</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            right: 10,
            bottom: 30,
          }}
        >
          <Text style={{ color: 'white', fontSize: 28 }}>ETH 12.08082</Text>
          <Text style={{ color: 'white', textAlign: 'right' }}>Current Balance</Text>
        </View>
      </View>
    );
  }
}
