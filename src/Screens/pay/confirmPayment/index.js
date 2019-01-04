import React, { Component } from 'react';
import { View, StatusBar, Dimensions, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles';
import DetailCard from '../../../common/detailCard';
import AccountType from '../../../images/AccountType.png';
import ProfileInfo from '../../../common/profileInfo';
import DesignButton from '../../../common/Button';
import TitleHeader from '../../../common/TitleHeader';
import Card from './card';
import { getFirstCharOfString } from '../../../utility';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class ConfirmPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // eslint-disable-next-line class-methods-use-this
  onPayBtnPress() {
    // console.log('Pay onPayBtnPress');
    Alert.alert('test');
    // this.props.navigation.navigate('')
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigation, userDetail } = this.props;
    const isIcon = true;
    const isSubTitle = true;

    let referenceVal = '';

    let selectedWalletVal = '';
    if (navigation && navigation.state && navigation.state.params) {
      if (
        navigation.state.params.reference &&
        navigation.state.params.reference !== '' &&
        navigation.state.params.reference !== undefined &&
        navigation.state.params.reference !== null
      ) {
        referenceVal = navigation.state.params.reference;
      }
      if (
        navigation.state.params.selectedWallet &&
        navigation.state.params.selectedWallet !== '' &&
        navigation.state.params.selectedWallet !== undefined &&
        navigation.state.params.selectedWallet !== null
      ) {
        selectedWalletVal = navigation.state.params.selectedWallet;
      }
    }

    let userIcon = '--';
    let subtitleText = '';
    if (
      userDetail.email &&
      userDetail.email !== '' &&
      userDetail.email !== null &&
      userDetail.email !== undefined
    ) {
      userIcon = getFirstCharOfString(userDetail.email);
      subtitleText = userDetail.email;
    }
    if (
      userDetail.mobile_number &&
      userDetail.mobile_number !== '' &&
      userDetail.mobile_number !== null &&
      userDetail.mobile_number !== undefined
    ) {
      if (subtitleText !== '') {
        subtitleText = `${subtitleText} | ${userDetail.mobile_number}`;
      } else {
        subtitleText = userDetail.mobile_number;
      }
    }
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        {/* header */}
        <TitleHeader
          iconName="keyboard-arrow-left"
          title="CONFIRM PAYMENT"
          isBackArrow
          onBtnPress={() => navigation.goBack()}
        />

        <ScrollView
          style={{
            height: deviceHeight,
            width: deviceWidth,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <ProfileInfo
            circularAvatarTextStyle={styles.circularAvatarTextStyle}
            profileInfoMainViewStyle={styles.profileInfoMainViewStyle}
            profileInfoTitleStyle={styles.profileInfoTitleStyle}
            profileInfoSubTitleStyle={styles.profileInfoSubTitleStyle}
            subTitleText={subtitleText}
            titleText="Jane Smith"
            circularAvatarText={userIcon}
          />
          <DetailCard
            // account={userWalletDetail[index]} walletType={walletType}
            topTitleText="Amount"
            bottomTitleText="ETH 1.0897"
            topSubTitleText=""
            bottomSubTitleText=""
            isIcon={isIcon}
            icon={AccountType}
            isSubTitle={isSubTitle}
            imageStyle={styles.imageStyle}
            detailCardMainViewStyle={styles.detailCardMainViewStyle}
            detailCardTopViewStyle={styles.detailCardTopViewStyle}
            detailCardTopTitleStyle={styles.detailCardTopTitleStyle}
            detailCardBottomViewStyle={styles.detailCardBottomViewStyle}
            detailCardBottomSubTitleTextStyle={styles.detailCardBottomSubTitleTextStyle}
            detailCardBottomTitleTextStyle={styles.detailCardBottomTitleTextStyle}
            detailCardSubTitleTextStyle={styles.detailCardSubTitleTextStyle}
            amtBalance={navigation.state.params.amount}
            walletType={navigation.state.params.walletType}
          />
          <View style={styles.cardStyle}>
            <Card navigation={navigation} title="Account" subtitle={selectedWalletVal} />
            <View style={styles.seperaterStyle} />
            <Card navigation={navigation} title="Reference" subtitle={referenceVal} />
            <View style={styles.seperaterStyle} />
            <Card navigation={navigation} title="Notification Type" subtitle="None" />
          </View>
          <View style={{ marginTop: deviceHeight * 0.05 }}>
            <DesignButton name="PAY" isClickable callMethod={() => this.onPayBtnPress()} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

ConfirmPayment.defaultProps = {
  userDetail: {},
};

ConfirmPayment.propTypes = {
  userDetail: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(ConfirmPayment);
