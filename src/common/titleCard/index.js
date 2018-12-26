import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// eslint-disable-next-line react/prefer-stateless-function
export default class TitleCard extends Component {
  render() {
    const {
      icon,
      text,
      titleCardMainViewStyle,
      titleCardImageStyle,
      titleCardTextStyle,
      titleMaterialIconStyle,
    } = this.props;
    return (
      <View style={titleCardMainViewStyle}>
        <Image source={icon} style={titleCardImageStyle} />
        <Text style={titleCardTextStyle}>{text}</Text>
        <TouchableOpacity>
          <MaterialIcons
            color="#fff"
            size={24}
            style={titleMaterialIconStyle}
            name="keyboard-arrow-right"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
TitleCard.defaultProps = {
  icon: 'person-outline',
  text: 'ETH Wallet',
  titleCardMainViewStyle: {},
  titleCardImageStyle: {},
  titleCardTextStyle: {},
  titleMaterialIconStyle: {},
};
/*eslint-disable*/
TitleCard.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
  titleCardMainViewStyle: PropTypes.object,
  titleCardImageStyle: PropTypes.object,
  titleCardTextStyle: PropTypes.object,
  titleMaterialIconStyle: PropTypes.object,
};
