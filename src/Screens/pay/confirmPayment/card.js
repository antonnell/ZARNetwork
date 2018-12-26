import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import styles from './styles';

const deviceWidth = Dimensions.get('window').width;
// eslint-disable-next-line react/prefer-stateless-function
export default class Card extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { title, subtitle } = this.props;
    return (
      <View style={{ margin: deviceWidth * 0.05 }}>
        <Text style={styles.cardTitleStyle}>{title}</Text>
        <Text style={styles.cardsubtitleStyle}>{subtitle}</Text>
      </View>
    );
  }
}
