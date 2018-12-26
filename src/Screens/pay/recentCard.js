import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
// eslint-disable-next-line react/prefer-stateless-function
export default class RecentCard extends Component {
  render() {
    const { header, title, subtitle } = this.props;
    return (
      <View
        style={{
          width: deviceWidth * 0.9,
          // alignItems: 'center',
          backgroundColor: '#f4f4f4',
          alignSelf: 'center',
          height: deviceHeight * 0.1,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <View
          style={{
            backgroundColor: '#00b1fb',
            width: deviceWidth * 0.2,
            height: deviceHeight * 0.1,
            borderBottomLeftRadius: 5,
            borderTopLeftRadius: 5,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>{header}</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            // right: 10,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: deviceWidth * 0.25,
          }}
        >
          <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
            {title}
          </Text>
          <Text style={{ color: 'black', textAlign: 'center', fontSize: 14 }}>{subtitle}</Text>
        </View>
      </View>
    );
  }
}
