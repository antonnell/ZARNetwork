import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
export default class RecentCard extends Component {
  render() {
    const { header, title, subtitle, onPress, beneficiary } = this.props;
    return (
      <TouchableOpacity
        style={styles.recentCardContainerstyle}
        onPress={() => onPress(beneficiary)}
      >
        <View style={styles.recentCardHeaderStyle}>
          <Text style={styles.recentCardHeaderTextStyle}>{header}</Text>
        </View>
        <View style={styles.recentCardDetailViewStyle}>
          <Text style={styles.recentCardTextOnestyle}>{title}</Text>
          <Text style={styles.recentCardTextTwoStyle}>{subtitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

RecentCard.defaultProps = {
  header: '--',
  title: '--',
  subtitle: '--',
  onPress: () => {},
  beneficiary: null,
};

RecentCard.propTypes = {
  header: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
  beneficiary: PropTypes.objectOf(PropTypes.any),
};
