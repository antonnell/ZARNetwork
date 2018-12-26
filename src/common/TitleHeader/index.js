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

  render() {
    const { title, iconName, onBtnPress, titleStyle } = this.props;

    let titleStyling = styles.titleText;
    if (titleStyle) {
      titleStyling = {
        ...styles.titleText,
        titleStyle,
      };
    }

    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={onBtnPress}>
          <MaterialIcons
            // name="keyboard-arrow-left"
            name={iconName}
            size={28}
            style={{ fontWeight: 'bold', marginLeft: 10 }}
          />
        </TouchableOpacity>
        <Text style={titleStyling}>{title}</Text>
      </View>
    );
  }
}
TitleHeader.defaultProps = {
  title: 'Pay',
  iconName: 'person-outline',
  titleStyle: {},
};
/*eslint-disable*/
TitleHeader.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBtnPress: PropTypes.func,
  titleStyle: PropTypes.object,
};
