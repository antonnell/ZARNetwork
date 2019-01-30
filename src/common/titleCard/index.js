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
      type,
      childViewStyle,
    } = this.props;
    let ParentView = View;
    let ChildView = TouchableOpacity;
    let parentViewOnPress = () => {};
    let childViewOnPress = onPress;
    if (type === 'tab') {
      ParentView = TouchableOpacity;
      ChildView = View;
      parentViewOnPress = onPress;
      childViewOnPress = () => {};
    }

    return (
      <ParentView style={titleCardMainViewStyle} onPress={parentViewOnPress}>
        <Image source={icon} style={titleCardImageStyle} resizeMode="contain" />

        <Text style={titleCardTextStyle}>{text}</Text>
        <ChildView style={childViewStyle} onPress={childViewOnPress}>
          <MaterialIcons
            color="#fff"
            size={24}
            style={titleMaterialIconStyle}
            name="keyboard-arrow-right"
          />
        </ChildView>
      </ParentView>
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
  type: 'list',
  childViewStyle: {
    width: 40,
    alignItems: 'center',
  },
};

TitleCard.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
  titleCardMainViewStyle: PropTypes.objectOf(PropTypes.any),
  titleCardImageStyle: PropTypes.objectOf(PropTypes.any),
  titleCardTextStyle: PropTypes.objectOf(PropTypes.any),
  titleMaterialIconStyle: PropTypes.objectOf(PropTypes.any),
  onPress: PropTypes.func,
  type: PropTypes.string,
  childViewStyle: PropTypes.objectOf(PropTypes.any),
};
