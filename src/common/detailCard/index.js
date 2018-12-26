import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class DetailCard extends Component {
  render() {
    const {
      walletType,
      account,
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
        <View style={detailCardTopViewStyle}>
          <Text style={detailCardTopTitleStyle}>{description}</Text>
          <Text style={detailCardSubTitleTextStyle}>{number}</Text>
        </View>
        <View style={detailCardBottomViewStyle}>
          <Text style={detailCardBottomTitleTextStyle}>
            {walletType} {balance}
          </Text>
          <Text style={detailCardBottomSubTitleTextStyle}>{bottomSubTitleText}</Text>
        </View>
      </View>
    );
  }
}

DetailCard.defaultProps = {
  walletType: '-',
};

/*eslint-disable */
DetailCard.propTypes = {
  walletType: PropTypes.string,
  account: PropTypes.object,
  detailCardSubTitleTextStyle: PropTypes.object,
  detailCardTopTitleStyle: PropTypes.object,
  detailCardMainViewStyle: PropTypes.object,
  detailCardTopViewStyle: PropTypes.object,
  bottomSubTitleText: PropTypes.string,
  detailCardBottomViewStyle: PropTypes.object,
  detailCardBottomTitleTextStyle: PropTypes.object,
  detailCardBottomSubTitleTextStyle: PropTypes.object,
};
