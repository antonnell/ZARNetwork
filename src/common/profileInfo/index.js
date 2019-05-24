/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;

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
      <View style={{ alignItems: 'center', marginTop: deviceHeight * 0.025 }}>
        <View style={profileInfoMainViewStyle}>
          <Text style={circularAvatarTextStyle}>{circularAvatarText}</Text>
        </View>
        <View style={{ marginTop: deviceHeight * 0.015 }}>
          <Text style={profileInfoTitleStyle}>{titleText}</Text>
          <Text style={profileInfoSubTitleStyle}>{subTitleText}</Text>
        </View>
      </View>
    );
  }
}
ProfileInfo.defaultProps = {
  profileInfoMainViewStyle: null,
  circularAvatarTextStyle: null,
  profileInfoSubTitleStyle: null,
  profileInfoTitleStyle: null,
  titleText: 'Jane Smith',
  subTitleText: 'jane@gmail.com',
  circularAvatarText: 'JS',
};

ProfileInfo.propTypes = {
  profileInfoMainViewStyle: PropTypes.objectOf(PropTypes.any),
  circularAvatarTextStyle: PropTypes.objectOf(PropTypes.any),
  profileInfoSubTitleStyle: PropTypes.objectOf(PropTypes.any),
  profileInfoTitleStyle: PropTypes.objectOf(PropTypes.any),
  titleText: PropTypes.string,
  subTitleText: PropTypes.string,
  circularAvatarText: PropTypes.string,
};
