/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text } from 'react-native';
import StatusBar from '../../common/StatusBar';
import { deviceHeight, deviceWidth } from '../../common/constants';

export default class ThirdScreen extends React.PureComponent {
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
            Third Screen
          </Text>
        </View>
      </View>
    );
  }
}
