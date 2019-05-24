import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { deviceWidth, deviceHeight } from '../constants';

// eslint-disable-next-line react/prefer-stateless-function
export default class FlowProgress extends Component {
  render() {
    const { step, steps } = this.props;
    const width = deviceWidth * 0.9;
    return (
      <View
        style={{
          width,
          marginTop: deviceHeight * 0.02,
          borderBottomColor: 'lightgray',
          borderBottomWidth: 2,
          position: 'relative',
        }}
      >
        <View
          style={{
            width: width * (step / steps),
            height: 2,
            backgroundColor: '#212c41',
            position: 'absolute',
          }}
        />
      </View>
    );
  }
}
