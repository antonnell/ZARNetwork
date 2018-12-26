import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
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
    if (isIcon) {
      return (
        <View style={detailCardTopViewStyle}>
          <Image source={icon} style={imageStyle} />
          <Text style={detailCardTopTitleStyle}>{description}</Text>
        </View>
      );
    }
    return (
      <View style={detailCardTopViewStyle}>
        <Text style={detailCardTopTitleStyle}>{description}</Text>
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
    walletType
  ) => {
    if (isSubTitle) {
      return (
        <View style={detailCardBottomViewStyle}>
          <Text style={detailCardBottomTitleTextStyle}>
            {walletType} {balance}
          </Text>
        </View>
      );
    }
    return (
      <View style={detailCardBottomViewStyle}>
        <Text style={detailCardBottomTitleTextStyle}>
          {walletType} {balance}
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
    } = this.props;

    const { balance, description, number } = account;
    return (
      <View style={detailCardMainViewStyle}>
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
          walletType
        )}
      </View>
    );
  }
}
DetailCard.defaultProps = {
  isSubTitle: false,
  isIcon: false,
  icon: 'person-outline',
  topTitleText: 'User Name',
  topSubTitleText: 'amount',
  imageStyle: {},
  detailCardSubTitleTextStyle: {},
  detailCardTopTitleStyle: {},
  bottomTitleText: 'ETH value',
  detailCardMainViewStyle: {},
  detailCardTopViewStyle: {},
  bottomSubTitleText: 'Current Balance',
  detailCardBottomViewStyle: {},
  detailCardBottomTitleTextStyle: {},
  detailCardBottomSubTitleTextStyle: {},
};
/*eslint-disable*/
DetailCard.propTypes = {
  walletType: PropTypes.string,
  account: PropTypes.object,
  isSubTitle: PropTypes.bool,
  isIcon: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  callMethod: PropTypes.func,
  topTitleText: PropTypes.string,
  imageStyle: PropTypes.object,
  topSubTitleText: PropTypes.string,
  detailCardSubTitleTextStyle: PropTypes.object,
  detailCardTopTitleStyle: PropTypes.object,
  bottomTitleText: PropTypes.string,
  detailCardMainViewStyle: PropTypes.object,
  detailCardTopViewStyle: PropTypes.object,
  bottomSubTitleText: PropTypes.string,
  detailCardBottomViewStyle: PropTypes.object,
  detailCardBottomTitleTextStyle: PropTypes.object,
  detailCardBottomSubTitleTextStyle: PropTypes.object,
};
