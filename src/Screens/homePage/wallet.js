import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

// eslint-disable-next-line react/prefer-stateless-function
export default class Wallet extends Component {
  render() {
    const { text } = this.props;
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            backgroundColor: 'rgb(0, 169, 252)',
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            //  marginTop: deviceHeight * 0.05,
          }}
        >
          <Text style={{ color: 'white' }}>JS</Text>
        </View>
        <Text style={{ fontSize: 12, marginTop: deviceHeight * 0.01 }}>{text}</Text>
      </View>
    );
  }
}
