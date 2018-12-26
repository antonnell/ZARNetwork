import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const deviceWidth = Dimensions.get('window').width;
// eslint-disable-next-line react/prefer-stateless-function
export default class Card extends Component {
  render() {
    const { title, subtitle } = this.props;
    return (
      <View style={{ margin: deviceWidth * 0.05 }}>
        <Text style={styles.cardTitleStyle}>{title}</Text>
        <Text style={styles.cardsubtitleStyle}>{subtitle}</Text>
      </View>
    );
  }
}
Card.defaultProps = {
  title: 'Account',
  subtitle: 'ETH Wallet',
};
/*eslint-disable*/
Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
