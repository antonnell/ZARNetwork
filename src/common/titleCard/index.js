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
      onPress,
    } = this.props;
    return (
      <View style={titleCardMainViewStyle}>
        <Image source={icon} style={titleCardImageStyle} resizeMode="contain" />
        <Text style={titleCardTextStyle}>{text}</Text>
        <TouchableOpacity onPress={onPress}>
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
  titleCardMainViewStyle: null,
  titleCardImageStyle: null,
  titleCardTextStyle: null,
  titleMaterialIconStyle: null,
  onPress: () => {},
};

TitleCard.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
  titleCardMainViewStyle: PropTypes.objectOf(PropTypes.any),
  titleCardImageStyle: PropTypes.objectOf(PropTypes.any),
  titleCardTextStyle: PropTypes.objectOf(PropTypes.any),
  titleMaterialIconStyle: PropTypes.objectOf(PropTypes.any),
  onPress: PropTypes.func,
};
