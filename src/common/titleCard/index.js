import React, { Component } from 'react';
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
