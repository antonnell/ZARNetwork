import React, { Component } from 'react';
import { View, Text } from 'react-native';

// eslint-disable-next-line react/prefer-stateless-function
export default class DetailCard extends Component {
  render() {
    const {
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
        <View style={detailCardTopViewStyle}>
          <Text style={detailCardTopTitleStyle}>{topTitleText}</Text>
          <Text style={detailCardSubTitleTextStyle}>{topSubTitleText}</Text>
        </View>
        <View style={detailCardBottomViewStyle}>
          <Text style={detailCardBottomTitleTextStyle}>{bottomTitleText}</Text>
          <Text style={detailCardBottomSubTitleTextStyle}>{bottomSubTitleText}</Text>
        </View>
      </View>
    );
  }
}
