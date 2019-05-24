import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TitleHeader from '../../common/TitleHeader';
import StatusBar from '../../common/StatusBar';
import { EvilIconsType, deviceHeight, deviceWidth } from '../../common/constants';
import { getFirstCharOfString } from '../../utility/index';
import Card from './card';

import styles from './styles';
import Coin from './coin';

class Coins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.handleNewCoin = this.handleNewCoin.bind(this);
  }

  componentDidMount() {}

  /**
   * @method handleNewCoin :To render coins.
   */
  handleNewCoin() {
    const isBackArrow = true;
    const { navigation } = this.props;
    if (navigation && navigation.navigate) {
      navigation.navigate('BeneficiaryDetails', { isBackArrow });
    }
  }

  renderCoins() {
    // const { coins } = this.props;
    // if(!coins) {
    //   return null;
    // }

    const coins = [
      { uuid: 'xxxx', name: 'Anton Coin', symbol: 'AC' },
      { uuid: 'xxxx', name: 'Fantom Token', symbol: 'FT' },
    ];

    const coinsList = [];
    const coinsLength = coins.length;
    if (coinsLength > 0) {
      return coins.map(coin => (
        <Coin
          key={coin.uuid}
          header={getFirstCharOfString(coin.name)}
          title={coin.name}
          subtitle={coins.symbol}
          coin={coin}
          onPress={this.handleAccountPay}
        />
      ));
    }

    return null;
  }

  renderLoader() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <Loader
          isLoading={isLoading}
          loaderStyle={0.25}
          containerStyle={{
            height: deviceHeight * 0.3,
            width: deviceWidth - 40,
            marginHorizontal: 20,
          }}
        />
      );
    }
    return null;
  }

  render() {
    const setScrollViewStyle = {
      ...styles.renderCardContainer,
    };
    const { navigation } = this.props;

    return (
      <View style={styles.Container}>
        <StatusBar />
        <TitleHeader
          iconName="keyboard-arrow-left"
          onBtnPress={() => navigation.goBack()}
          title="Coins"
          rightIconName="search"
          isBackArrow
          onRightBtnPress={() => {
            // console.log('search');
          }}
        />

        <ScrollView
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <Card
            navigation={navigation}
            text="Create New Coin"
            icon={<MaterialCommunityIcons name="coin" size={35} style={styles.iconStyle} />}
            onPress={this.handleNewCoin}
          />
          <View style={setScrollViewStyle}>{this.renderCoins()}</View>
        </ScrollView>
      </View>
    );
  }
}
Coins.defaultProps = {
  userDetail: null,
  navigation: null,
};
Coins.propTypes = {
  userDetail: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(Coins);
