import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

import { deviceHeight, deviceWidth } from '../../common/constants';

// eslint-disable-next-line react/prefer-stateless-function
export default class Card extends Component {
  render() {
    const { text, icon, onPress } = this.props;
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: deviceWidth * 0.9,
          paddingTop: deviceHeight * 0.05,
          paddingBottom: deviceHeight * 0.05,
        }}
        onPress={onPress}
      >
        <View style={{ flex: 1 }}>{icon}</View>

        <View style={{ flex: 8 }}>
          <Text style={styles.cardTextStyle}>{text}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <MaterialCommunityIcons color="#000000" size={24} name="chevron-right" />
        </View>
      </TouchableOpacity>
    );
  }
}
/*eslint-disable*/
Card.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.object,
  onPress: PropTypes.func,
};
