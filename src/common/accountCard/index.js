import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const deviceWidth = Dimensions.get('window').width;
// eslint-disable-next-line react/prefer-stateless-function
export default class AccountCard extends Component {
  render() {
    const {
      walletType,
      account,
      topTitleText,
      accountCardSubTitleTextStyle,
      accountCardTopTitleStyle,
      accountCardMainViewStyle,
      accountCardrightBottomTextStyle,
      callMethod,
      activeOpacity,
      amtBalance,
    } = this.props;

    const { balance, description, number } = account;
    let title = topTitleText;
    if (description && description !== '' && description !== null && description !== undefined) {
      title = description;
    }
    let balanceVal = balance;
    if (amtBalance && amtBalance !== '' && amtBalance !== null && amtBalance !== undefined) {
      balanceVal = amtBalance;
    }
    return (
      <TouchableOpacity
        style={accountCardMainViewStyle}
        activeOpacity={activeOpacity}
        onPress={callMethod}
      >
        <Text style={accountCardTopTitleStyle}>{title}</Text>
        <View style={{ width: deviceWidth * 0.6 }}>
          <Text style={accountCardSubTitleTextStyle} numberOfLines={1}>
            {number}
          </Text>
        </View>
        <Text style={accountCardrightBottomTextStyle}>
          {' '}
          {walletType} {balanceVal}
        </Text>
      </TouchableOpacity>
    );
  }
}
AccountCard.defaultProps = {
  topTitleText: 'User Name',
  accountCardSubTitleTextStyle: null,
  accountCardrightBottomTextStyle: null,
  accountCardMainViewStyle: null,
  accountCardTopTitleStyle: null,
  walletType: 'ETH',
  amtBalance: '',
  account: null,
  callMethod: () => {},
  activeOpacity: 1,
};

AccountCard.propTypes = {
  walletType: PropTypes.string,
  account: PropTypes.objectOf(PropTypes.any),
  callMethod: PropTypes.func,
  topTitleText: PropTypes.string,
  accountCardSubTitleTextStyle: PropTypes.objectOf(PropTypes.any),
  accountCardTopTitleStyle: PropTypes.objectOf(PropTypes.any),
  accountCardMainViewStyle: PropTypes.objectOf(PropTypes.any),
  accountCardrightBottomTextStyle: PropTypes.objectOf(PropTypes.any),
  activeOpacity: PropTypes.number,
  amtBalance: PropTypes.string,
};
