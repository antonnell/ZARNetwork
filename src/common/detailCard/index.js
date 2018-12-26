/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

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
