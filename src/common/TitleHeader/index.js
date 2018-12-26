import React, { Component } from 'react';
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
