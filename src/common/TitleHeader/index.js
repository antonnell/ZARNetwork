import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

export default class TitleHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLeftIcon() {
    const { iconName, onBtnPress, isBackArrow } = this.props;

    if (iconName !== '' && isBackArrow) {
      return (
        <TouchableOpacity onPress={onBtnPress}>
          <MaterialIcons name={iconName} size={24} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderRightIcon() {
    const { rightIconName, onRightBtnPress } = this.props;

    if (rightIconName !== '') {
      return (
        <TouchableOpacity onPress={onRightBtnPress} style={{ alignItems: 'flex-end' }}>
          <MaterialIcons
            name={rightIconName}
            size={22}
            style={{ fontWeight: 'bold', marginRight: 5 }}
          />
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    const { title, titleStyle } = this.props;
    let titleStyling = styles.titleText;

    if (titleStyle && titleStyle.length > 0) {
      titleStyling = {
        ...styles.titleText,
        ...titleStyle,
      };
    }

    return (
      <View style={styles.mainContainer}>
        <View style={{ flex: 1 }}>{this.renderLeftIcon()}</View>
        <View style={{ flex: 6 }}>
          <Text style={titleStyling}>{title}</Text>
        </View>
        <View style={{ flex: 1 }}>{this.renderRightIcon()}</View>
      </View>
    );
  }
}
TitleHeader.defaultProps = {
  title: '',
  iconName: '',
  rightIconName: '',
  titleStyle: {},
  isBackArrow: false,
  onBtnPress: () => {},
  onRightBtnPress: () => {},
};
TitleHeader.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rightIconName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBtnPress: PropTypes.func,
  onRightBtnPress: PropTypes.func,
  titleStyle: PropTypes.objectOf(PropTypes.any),
  isBackArrow: PropTypes.bool,
};
