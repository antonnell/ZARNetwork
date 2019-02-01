/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import StartScreenIcon from '../../images/startScreenIcon.png';
import { deviceWidth, deviceHeight } from '../../common/constants';
import StatusBar from '../../common/StatusBar';

export default class FirstScreen extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <StatusBar />
        <Image source={StartScreenIcon} style={styles.imageStyle} resizeMode="contain" />
        <View style={{ marginTop: deviceHeight * 0.04 }}>
          <Text
            style={{
              textAlign: 'center',
              width: deviceWidth * 0.68,
              fontSize: 16,
            }}
          >
            Real-time transactions with near zero transaction costs
          </Text>
        </View>
      </View>
    );
  }
}
