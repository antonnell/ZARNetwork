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

  renderIcon() {
    const { iconName, onBtnPress } = this.props;

    if (iconName !== '') {
      return (
        <TouchableOpacity onPress={onBtnPress}>
          <MaterialIcons name={iconName} size={28} style={{ fontWeight: 'bold', marginLeft: 10 }} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    const { title, titleStyle, iconName } = this.props;
    let titleStyling = styles.titleText;
    if (iconName === '' && titleStyle && titleStyle.length > 0) {
      titleStyling = {
        ...styles.titleText,
        titleStyle,
        ...styles.noIconContainer,
      };
    }
    if (iconName === '' && titleStyle && !titleStyle.length > 0) {
      titleStyling = {
        ...styles.titleText,
        ...styles.noIconContainer,
      };
    } else if (titleStyle && titleStyle.length > 0) {
      titleStyling = {
        ...styles.titleText,
        titleStyle,
      };
    }
    return (
      <View style={styles.mainContainer}>
        {this.renderIcon()}
        <Text style={titleStyling}>{title}</Text>
      </View>
    );
  }
}
TitleHeader.defaultProps = {
  title: 'Pay',
  iconName: '',
  titleStyle: {},
};
/*eslint-disable*/
TitleHeader.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBtnPress: PropTypes.func,
  titleStyle: PropTypes.object,
};
