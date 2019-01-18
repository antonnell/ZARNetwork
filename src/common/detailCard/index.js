import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class DetailCard extends Component {
  renderTopDesign = (
    isIcon,
    imageStyle,
    detailCardSubTitleTextStyle,
    topSubTitleText,
    icon,
    detailCardTopTitleStyle,
    topTitleText,
    detailCardTopViewStyle,
    description,
    number
  ) => {
    let title = topTitleText;
    if (description && description !== '' && description !== null && description !== undefined) {
      title = description;
    }
    if (isIcon) {
      return (
        <View style={detailCardTopViewStyle}>
          <Image source={icon} style={imageStyle} resizeMode="contain" />
          <Text style={detailCardTopTitleStyle} numberOfLines={1}>
            {title}
          </Text>
        </View>
      );
    }
    return (
      <View style={detailCardTopViewStyle}>
        <Text style={detailCardTopTitleStyle}>{title}</Text>
        <Text style={detailCardSubTitleTextStyle}>{number}</Text>
      </View>
    );
  };

  renderBottomDesign = (
    isSubTitle,
    detailCardBottomSubTitleTextStyle,
    bottomSubTitleText,
    detailCardBottomViewStyle,
    detailCardBottomTitleTextStyle,
    bottomTitleText,
    balance,
    walletType,
    amtBalance
  ) => {
    let balanceVal = balance;
    if (amtBalance && amtBalance !== '' && amtBalance !== null && amtBalance !== undefined) {
      balanceVal = amtBalance;
    }
    if (isSubTitle) {
      return (
        <View style={detailCardBottomViewStyle}>
          <Text style={detailCardBottomTitleTextStyle}>
            {walletType} {balanceVal}
          </Text>
        </View>
      );
    }
    return (
      <View style={detailCardBottomViewStyle}>
        <Text style={detailCardBottomTitleTextStyle}>
          {walletType} {balanceVal}
        </Text>
        <Text style={detailCardBottomSubTitleTextStyle}>{bottomSubTitleText}</Text>
      </View>
    );
  };

  render() {
    const {
      walletType,
      account,
      isSubTitle,
      isIcon,
      icon,
      imageStyle,
      bottomTitleText,
      topTitleText,
      topSubTitleText,
      detailCardSubTitleTextStyle,
      detailCardTopTitleStyle,
      detailCardMainViewStyle,
      detailCardTopViewStyle,
      bottomSubTitleText,
      detailCardBottomViewStyle,
      detailCardBottomTitleTextStyle,
      detailCardBottomSubTitleTextStyle,
      callMethod,
      activeOpacity,
      amtBalance,
    } = this.props;

    const { balance, description, number } = account;
    return (
      <TouchableOpacity
        style={detailCardMainViewStyle}
        activeOpacity={activeOpacity}
        onPress={callMethod}
      >
        {this.renderTopDesign(
          isIcon,
          imageStyle,
          detailCardSubTitleTextStyle,
          topSubTitleText,
          icon,
          detailCardTopTitleStyle,
          topTitleText,
          detailCardTopViewStyle,
          description,
          number
        )}

        {this.renderBottomDesign(
          isSubTitle,
          detailCardBottomSubTitleTextStyle,
          bottomSubTitleText,
          detailCardBottomViewStyle,
          detailCardBottomTitleTextStyle,
          bottomTitleText,
          balance,
          walletType,
          amtBalance
        )}
      </TouchableOpacity>
    );
  }
}
DetailCard.defaultProps = {
  isSubTitle: false,
  isIcon: false,
  icon: 'person-outline',
  topTitleText: 'User Name',
  topSubTitleText: 'amount',
  imageStyle: null,
  detailCardSubTitleTextStyle: null,
  detailCardTopTitleStyle: null,
  bottomTitleText: 'ETH value',
  detailCardMainViewStyle: null,
  detailCardTopViewStyle: null,
  bottomSubTitleText: 'Current Balance',
  detailCardBottomViewStyle: null,
  detailCardBottomTitleTextStyle: null,
  detailCardBottomSubTitleTextStyle: null,
  walletType: 'ETH',
  amtBalance: '',
  account: null,
  callMethod: () => {},
  activeOpacity: 1,
};

DetailCard.propTypes = {
  walletType: PropTypes.string,
  account: PropTypes.objectOf(PropTypes.any),
  isSubTitle: PropTypes.bool,
  isIcon: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  callMethod: PropTypes.func,
  topTitleText: PropTypes.string,
  imageStyle: PropTypes.objectOf(PropTypes.any),
  topSubTitleText: PropTypes.string,
  detailCardSubTitleTextStyle: PropTypes.objectOf(PropTypes.any),
  detailCardTopTitleStyle: PropTypes.objectOf(PropTypes.any),
  bottomTitleText: PropTypes.string,
  detailCardMainViewStyle: PropTypes.objectOf(PropTypes.any),
  detailCardTopViewStyle: PropTypes.objectOf(PropTypes.any),
  bottomSubTitleText: PropTypes.string,
  detailCardBottomViewStyle: PropTypes.objectOf(PropTypes.any),
  detailCardBottomTitleTextStyle: PropTypes.objectOf(PropTypes.any),
  detailCardBottomSubTitleTextStyle: PropTypes.objectOf(PropTypes.any),
  activeOpacity: PropTypes.number,
  amtBalance: PropTypes.string,
};
