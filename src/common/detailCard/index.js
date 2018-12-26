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
    detailCardTopViewStyle
  ) => {
    if (isIcon) {
      return (
        <View style={detailCardTopViewStyle}>
          <Image source={icon} style={imageStyle} />
          <Text style={detailCardTopTitleStyle}>{topTitleText}</Text>
        </View>
      );
    }
    return (
      <View style={detailCardTopViewStyle}>
        <Text style={detailCardTopTitleStyle}>{topTitleText}</Text>
        <Text style={detailCardSubTitleTextStyle}>{topSubTitleText}</Text>
      </View>
    );
  };

  renderBottomDesign = (
    isSubTitle,
    detailCardBottomSubTitleTextStyle,
    bottomSubTitleText,
    detailCardBottomViewStyle,
    detailCardBottomTitleTextStyle,
    bottomTitleText
  ) => {
    if (isSubTitle) {
      return (
        <View style={detailCardBottomViewStyle}>
          <Text style={detailCardBottomTitleTextStyle}>{bottomTitleText}</Text>
        </View>
      );
    }
    return (
      <View style={detailCardBottomViewStyle}>
        <Text style={detailCardBottomTitleTextStyle}>{bottomTitleText}</Text>
        <Text style={detailCardBottomSubTitleTextStyle}>{bottomSubTitleText}</Text>
      </View>
    );
  };

  render() {
    const {
      isSubTitle,
      isIcon,
      icon,
      imageStyle,
      topTitleText,
      topSubTitleText,
      detailCardSubTitleTextStyle,
      detailCardTopTitleStyle,
      bottomTitleText,
      detailCardMainViewStyle,
      detailCardTopViewStyle,
      bottomSubTitleText,
      detailCardBottomViewStyle,
      detailCardBottomTitleTextStyle,
      detailCardBottomSubTitleTextStyle,
    } = this.props;

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
          detailCardTopViewStyle
        )}

        {this.renderBottomDesign(
          isSubTitle,
          detailCardBottomSubTitleTextStyle,
          bottomSubTitleText,
          detailCardBottomViewStyle,
          detailCardBottomTitleTextStyle,
          bottomTitleText
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
