import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

// eslint-disable-next-line react/prefer-stateless-function
export default class Card extends Component {
  render() {
    const { walletType, account } = this.props;
    const { balance, description, number } = account;
    return (
      <View
        style={{
          backgroundColor: 'rgb(0,177,251)',
          height: deviceHeight * 0.3,
          width: deviceWidth * 0.7,
          borderRadius: 5,
          marginLeft: 20,
        }}
      >
        <View
          style={{ backgroundColor: 'rgb(40,190,253)', height: deviceHeight * 0.1, padding: 20 }}
        >
          <Text style={{ color: 'white', fontSize: 15 }}>{description}</Text>
          <Text style={{ color: 'white' }}>{number}</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            right: 10,
            bottom: 30,
          }}
        >
          <Text style={{ color: 'white', fontSize: 28 }}>
            {walletType} {balance}
          </Text>
          <Text style={{ color: 'white', textAlign: 'right' }}>Current Balance</Text>
        </View>
      </View>
    );
  }
}

Card.defaultProps = {
  walletType: '-',
  account: {},
};

Card.propTypes = {
  walletType: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  account: PropTypes.object,
};
