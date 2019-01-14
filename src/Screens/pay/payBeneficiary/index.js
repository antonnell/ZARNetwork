// Library
import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import styles from './styles';
// components
import ToggleCard from '../../../common/ToggleCard';
import Button from '../../../common/Button';
import FloatLabelTextField from '../../../common/updatedFloatLabel';

import TitleHeader from '../../../common/TitleHeader';
import TitleCard from '../../../common/titleCard';
import ProfileInfo from '../../../common/profileInfo';
import ListCard from '../../../common/ListCard';
import AccountType from '../../../images/AccountType.png';
import { getWalletType, getAccountIcon, getFullName } from '../../../utility';

// constants
import { WALLET_LIST, deviceWidth, deviceHeight } from '../../../common/constants';

class PayBeneficiary extends Component {
  constructor(props) {
    super(props);
    const { navigation, accountTypeList } = this.props;
    let isBackArrowPresent = false;
    let reference = '';
    let selectedWallet = '';
    let accId = '';
    let walletType = '';
    let balance = '';

    if (navigation && navigation.state && navigation.state.params) {
      const navigationState = navigation.state.params;
      isBackArrowPresent = navigationState.isBackArrow;
      if (navigationState.beneficiaryReference) {
        reference = navigationState.beneficiaryReference;
      }
      if (navigationState.selectedAccount) {
        selectedWallet = navigationState.selectedAccount.description;
        accId = navigationState.selectedAccount.uuid;
        walletType = getWalletType(accountTypeList, navigationState.selectedAccount);
        // eslint-disable-next-line prefer-destructuring
        balance = navigationState.selectedAccount.balance;
      }
      if (navigationState.selectedBeneficiary) {
        reference = navigationState.selectedBeneficiary.their_reference;
      }
    }
    const { userWalletDetail } = this.props;
    if (selectedWallet === '' && accId === '' && userWalletDetail && userWalletDetail.length > 0) {
      selectedWallet = userWalletDetail[0].description;
      accId = userWalletDetail[0].uuid;
      walletType = getWalletType(accountTypeList, userWalletDetail[0]);
      // eslint-disable-next-line prefer-destructuring
      balance = userWalletDetail[0].balance;
    }

    this.state = {
      number: '',
      reference,
      normalPaymentToggle: false,
      futurePaymentToggle: false,
      isBackArrowPresent,
      openWalletList: false,
      selectedWallet,
      accId,
      walletType,
      balance,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handlePayNotification = this.handlePayNotification.bind(this);
    this.handleWalletList = this.handleWalletList.bind(this);
    this.toggleWalletList = this.toggleWalletList.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  onPayBtnClick() {
    const { accId, number, reference, walletType, selectedWallet } = this.state;
    const { navigation } = this.props;

    navigation.navigate('ConfirmPayment', {
      accountId: accId,
      amount: number,
      reference,
      walletType,
      selectedWallet,
      beneficiary_uuid: navigation.state.params.selectedBeneficiary.uuid,
    });
  }

  // validate(type) {
  //   if (type === 'number') {
  //     // this.setState({
  //     //   number: '',
  //     // });
  //   }
  //   if (type === 'reference') {
  //     this.setState({
  //       reference: '',
  //     });
  //   }
  // }

  updateToggleValue(type) {
    const { normalPaymentToggle, futurePaymentToggle } = this.state;
    if (type === 'normalPayment') {
      this.setState({ normalPaymentToggle: !normalPaymentToggle });
    } else if (type === 'futurePayment') {
      this.setState({ futurePaymentToggle: !futurePaymentToggle });
    }
  }

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  handlePayNotification() {
    const isBackArrow = true;
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('PaymentNotification', { isBackArrow });
    }
  }

  handleWalletList(item) {
    let walletType = '';
    const { openWalletList } = this.state;
    const { accountTypeList } = this.props;
    this.setState({
      openWalletList: !openWalletList,
    });

    walletType = getWalletType(accountTypeList, item);

    if (item && item.description) {
      this.setState({
        selectedWallet: item.description,
        accId: item.uuid,
        balance: item.balance,
        walletType,
      });
    }
  }

  checkEmptyFields(type) {
    const { number } = this.state;
    if (type === 'number') {
      Alert.alert('Error', 'Enter amount!');
    } else if (type === 'reference') {
      if (number !== '') {
        Alert.alert('Error', 'Enter reference!');
      }
    }
  }

  toggleWalletList() {
    const { openWalletList } = this.state;
    this.setState({
      openWalletList: !openWalletList,
    });
  }

  render() {
    const { navigation, userWalletDetail, userDetail } = this.props;

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

    const {
      number,
      reference,
      normalPaymentToggle,
      futurePaymentToggle,
      isBackArrowPresent,
      openWalletList,
      accId,
      selectedWallet,
      balance,
      walletType,
    } = this.state;

    let isClickable = false;
    if (accId !== '' && number !== '' && reference !== '') {
      isClickable = true;
    }

    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader
          iconName="keyboard-arrow-left"
          title="PAY BENEFICIARY"
          isBackArrow={isBackArrowPresent}
          onBtnPress={() => navigation.goBack()}
        />
        {/* header */}
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
          <View style={{ zIndex: openWalletList ? 99 : 0 }}>
            <TitleCard
              icon={AccountType}
              titleCardMainViewStyle={styles.titleCardMainViewStyle}
              titleCardImageStyle={styles.titleCardImageStyle}
              titleCardTextStyle={styles.titleCardTextStyle}
              titleMaterialIconStyle={styles.titleMaterialIconStyle}
              // text="ETH Wallet"
              text={selectedWallet}
              onPress={this.toggleWalletList}
            />
            {openWalletList && (
              <ListCard
                selectedType={accId}
                data={userWalletDetail}
                handleList={item => this.handleWalletList(item)}
                type={WALLET_LIST}
                listStyle={styles.listStyling}
              />
            )}
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: deviceWidth * 0.8,
            }}
          >
            <FloatLabelTextField
              type="number"
              inputType="number"
              valueType="number"
              placeholder="Amount"
              autoCorrect={false}
              value={number}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              imageType="amount"
              // validateFields={type=>this.validateFields(type)}
              checkEmptyFields={type => this.checkEmptyFields(type)}
            />
            <View>
              <Text style={{ color: 'rgb(0, 177, 251)', textAlign: 'right' }}>
                {walletType} {balance} available
              </Text>
            </View>
            <FloatLabelTextField
              type="reference"
              inputType="text"
              valueType="text"
              placeholder="Reference"
              autoCorrect={false}
              value={reference}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validate={type => this.validate(type)}
              checkEmptyFields={type => this.checkEmptyFields(type)}
            />
          </View>
          <TitleCard
            icon={AccountType}
            titleCardMainViewStyle={styles.titleCardMainViewStyle}
            titleCardImageStyle={styles.notificationImageStyle}
            titleCardTextStyle={styles.notificationTextStyle}
            titleMaterialIconStyle={styles.notificationMaterialIconStyle}
            text="Payment Notification: none"
            onPress={this.handlePayNotification}
          />
          {/* Toggle container */}
          <View style={styles.toggleContainerStyle}>
            <ToggleCard
              textVal="Normal Payment"
              textStyle={styles.toggleTextStyle}
              toggleState={normalPaymentToggle}
              updateToggleClick={() => {
                this.updateToggleValue('normalPayment');
              }}
            />
            <View style={styles.separatorStyle} />
            <ToggleCard
              textVal="Future Payment"
              textStyle={styles.toggleTextStyle}
              toggleState={futurePaymentToggle}
              updateToggleClick={() => {
                this.updateToggleValue('futurePayment');
              }}
            />
          </View>
          <View style={{ marginTop: deviceHeight * 0.075 }}>
            <Button
              name="Pay"
              isClickable={isClickable}
              callMethod={() => {
                this.onPayBtnClick();
              }}
            />
          </View>

          <View style={{ height: deviceHeight * 0.1 }} />
        </ScrollView>
      </View>
    );
  }
}
PayBeneficiary.defaultProps = {
  userDetail: null,
  navigation: null,
  userWalletDetail: [],
  accountTypeList: [],
};

PayBeneficiary.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  userWalletDetail: PropTypes.arrayOf(PropTypes.any),
  accountTypeList: PropTypes.arrayOf(PropTypes.any),
  userDetail: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userWalletDetail: state.userWalletReducer.wallets,
  accountTypeList: state.supportedAccTypeReducer.types,
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(PayBeneficiary);
