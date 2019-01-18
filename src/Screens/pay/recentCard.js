import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// import styles from './styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
// eslint-disable-next-line react/prefer-stateless-function
export default class RecentCard extends Component {
  render() {
    const { header, title, subtitle, onPress, beneficiary } = this.props;
    return (
      <TouchableOpacity
        style={{
          width: deviceWidth * 0.9,
          // alignItems: 'center',
          backgroundColor: '#f4f4f4',
          alignSelf: 'center',
          height: deviceHeight * 0.1,
          borderRadius: 5,
          marginTop: 10,
        }}
        onPress={() => onPress(beneficiary)}
      >
        <View
          style={{
            backgroundColor: '#00b1fb',
            width: deviceWidth * 0.2,
            height: deviceHeight * 0.1,
            borderBottomLeftRadius: 5,
            borderTopLeftRadius: 5,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>{header}</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            // right: 10,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: deviceWidth * 0.25,
          }}
        >
          <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
            {title}
          </Text>
          <Text style={{ color: 'black', textAlign: 'center', fontSize: 14 }}>{subtitle}</Text>
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
