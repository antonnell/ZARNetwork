/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text } from 'react-native';
import { deviceWidth, deviceHeight } from '../../common/constants';
import StatusBar from '../../common/StatusBar';

export default class SecondScreen extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <StatusBar />
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
