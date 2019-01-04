/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text, StatusBar, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class ThirdScreen extends React.PureComponent {
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
            Third Screen
          </Text>
        </View>
      </View>
    );
  }
}
