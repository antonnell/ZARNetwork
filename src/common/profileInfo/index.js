/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;

// eslint-disable-next-line react/prefer-stateless-function
export default class ProfileInfo extends Component {
  render() {
    const {
      profileInfoMainViewStyle,
      circularAvatarTextStyle,
      profileInfoSubTitleStyle,
      // profileInfoTitleStyle,
      // titleText,
      subTitleText,
      circularAvatarText,
    } = this.props;
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={profileInfoMainViewStyle}>
          <Text style={circularAvatarTextStyle}>{circularAvatarText}</Text>
        </View>
        <View style={{ marginTop: deviceHeight * 0.015 }}>
          {/* <Text style={profileInfoTitleStyle}>{titleText}</Text> */}
          <Text style={profileInfoSubTitleStyle}>{subTitleText}</Text>
        </View>
      </View>
    );
  }
}
ProfileInfo.defaultProps = {
  profileInfoMainViewStyle: {},
  circularAvatarTextStyle: {},
  profileInfoSubTitleStyle: {},
  profileInfoTitleStyle: {},
  titleText: 'Jane Smith',
  subTitleText: 'jane@gmail.com',
  circularAvatarText: 'JS',
};
/*eslint-disable*/
ProfileInfo.propTypes = {
  profileInfoMainViewStyle: PropTypes.object,
  circularAvatarTextStyle: PropTypes.object,
  profileInfoSubTitleStyle: PropTypes.object,
  profileInfoTitleStyle: PropTypes.object,
  titleText: PropTypes.string,
  subTitleText: PropTypes.string,
  circularAvatarText: PropTypes.string,
};
