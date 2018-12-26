import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

export default class TitleText extends React.PureComponent {
  render() {
    const { titleText, mainStyle, textStyle } = this.props;

    return (
      <View style={[mainStyle]}>
        <Text style={[textStyle]}>{titleText}</Text>
      </View>
    );
  }
}
