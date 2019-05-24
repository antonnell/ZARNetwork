import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { deviceWidth, deviceHeight } from '../../common/constants';

export default class Coin extends Component {
  render() {
    const { coin } = this.props;
    const { uuid, name, symbol } = coin;
    return (
      <View style={{}}>
        <View
          style={{ backgroundColor: 'rgb(40,190,253)', height: deviceHeight * 0.1, padding: 20 }}
        >
          <Text style={{ color: 'white', fontSize: 15 }}>{name}</Text>
        </View>
        <View style={{ position: 'absolute', right: 10, bottom: 30 }}>
          <Text style={{ color: 'white', fontSize: 28 }}>{symbol}</Text>
        </View>
      </View>
    );
  }
}

Coin.defaultProps = {
  walletType: '-',
  account: null,
};

Coin.propTypes = {
  walletType: PropTypes.string,
  account: PropTypes.objectOf(PropTypes.any),
};
