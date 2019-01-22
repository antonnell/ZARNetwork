/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { deviceWidth, deviceHeight } from '../../common/constants';

export default class SecondScreen extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <StatusBar backgroundColor="black" />
        <View style={{ marginTop: deviceHeight * 0.4 }}>
          <Text
            style={{
              textAlign: 'center',
              width: deviceWidth * 0.68,
              fontSize: 16,
            }}
          >
            Second Screen
          </Text>
        </View>
      </View>
    );
  }
}
