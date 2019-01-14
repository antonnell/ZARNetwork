/* eslint-disable no-console */
import React, { Component } from 'react';
import { View, StatusBar, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles';
import DetailCard from '../../../common/detailCard';
import AccountType from '../../../images/AccountType.png';
import ProfileInfo from '../../../common/profileInfo';
import DesignButton from '../../../common/Button';
import TitleHeader from '../../../common/TitleHeader';
import Card from './card';
import { setNewRequest } from '../../../controllers/api/paymentRequest';
import { getAccountIcon, getFullName } from '../../../utility';
import Loader from '../../../common/Loader';
import { deviceHeight, deviceWidth } from '../../../common/constants';

class ConfirmPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  onPayBtnPress() {
    Alert.alert(
      'Payment Confirmation!',
      'Are you sure  you want to pay?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK',
          onPress: () => this.onClickConfiramtion(),
        },
      ],
      { cancelable: false }
    );
  }

  onClickConfiramtion = () => {
    /*eslint-disable*/
    const { navigation } = this.props;
    const account_uuid = navigation.state.params.accountId;
    const value = parseInt(navigation.state.params.amount);
    const beneficiary_uuid = navigation.state.params.beneficiary_uuid;
    const reference = navigation.state.params.reference;
    if (
      (account_uuid &&
        account_uuid !== '' &&
        value &&
        value !== null &&
        beneficiary_uuid &&
        beneficiary_uuid !== '',
      reference && reference !== '')
    ) {
      const payload = {
        account_uuid,
        value,
        beneficiary_uuid,
        my_reference: reference,
      };
      this.setState({
        isLoading: true,
      });
      if (setNewRequest) {
        setNewRequest(payload)
          .then(result => {
            this.setState({
              isLoading: false,
            });
            if (result.payload && result.payload.data && result.payload.data.status === 200) {
              navigation.navigate('PaymentSuccess', { params: navigation.state.params });
            } else if (
              result &&
              result.error &&
              result.error.response &&
              result.error.response.data &&
              result.error.response.data.message
            ) {
              const { message } = result.error.response.data;
              Alert.alert('Error', message);
            }
          })
          .catch(error => {
            this.setState({
              isLoading: false,
            });
            Alert.alert('Error', error);
          });
      }
    }
    // navigation.navigate('PaymentSuccess', { params: navigation.state.params});
  };
  renderLoader() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader isLoading={isLoading} loaderStyle={0.25} />;
    }
    return null;
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

    const userIcon = getAccountIcon(userDetail);
    const fullName = getFullName(userDetail);
    let subtitleText = '';
    if (
      userDetail.email &&
      userDetail.email !== '' &&
      userDetail.email !== null &&
      userDetail.email !== undefined
    ) {
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
            titleText={fullName}
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
            {/* <View style={styles.seperaterStyle} />
            <Card navigation={navigation} title="Notification Type" subtitle="None" /> */}
          </View>
          <View style={{ marginTop: deviceHeight * 0.05 }}>
            <DesignButton name="PAY" isClickable callMethod={() => this.onPayBtnPress()} />
          </View>
        </ScrollView>
        {this.renderLoader()}
      </View>
    );
  }
}

ConfirmPayment.defaultProps = {
  userDetail: null,
};

ConfirmPayment.propTypes = {
  userDetail: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(ConfirmPayment);
