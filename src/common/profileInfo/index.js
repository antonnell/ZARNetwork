import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

// eslint-disable-next-line react/prefer-stateless-function
export default class ProfileInfo extends Component {
  render() {
    const {
      profileInfoMainViewStyle,
      circularAvatarTextStyle,
      profileInfoSubTitleStyle,
      profileInfoTitleStyle,
      titleText,
      subTitleText,
      circularAvatarText,
    } = this.props;
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={profileInfoMainViewStyle}>
          <Text style={circularAvatarTextStyle}>{circularAvatarText}</Text>
        </View>
        <View style={{ marginTop: deviceHeight * 0.01 }}>
          <Text style={profileInfoTitleStyle}>{titleText}</Text>
          <Text style={profileInfoSubTitleStyle}>{subTitleText}</Text>
        </View>
      </View>
    );
  }
}
