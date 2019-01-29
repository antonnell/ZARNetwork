// Library
import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
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
import {
  getWalletType,
  getAccountIcon,
  getFullName,
  formatDate,
  formatTime,
} from '../../../utility';
import DateTimePickerField from '../../../common/DateTimePickerField';
import StatusBar from '../../../common/StatusBar';
// constants
import {
  WALLET_LIST,
  deviceWidth,
  deviceHeight,
  invalid,
  valid,
  invalidAmount,
  insufficientBalance,
} from '../../../common/constants';

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
      normalPaymentToggle: true,
      futurePaymentToggle: false,
      isBackArrowPresent,
      openWalletList: false,
      selectedWallet,
      accId,
      walletType,
      balance,
      isTimePickerVisible: false,
      isDatePickerVisible: false,
      date: 'Select date',
      time: 'Select time',
      beneficiaryNotification: {
        email: false,
        none: true,
        sms: false,
      },
      myNotification: {
        email: false,
        none: true,
        sms: false,
      },
    };
    this.updateForm = this.updateForm.bind(this);
    this.handlePayNotification = this.handlePayNotification.bind(this);
    this.handleWalletList = this.handleWalletList.bind(this);
    this.toggleWalletList = this.toggleWalletList.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.handleDatePicked = this.handleDatePicked.bind(this);
    this.hideDatePicker = this.hideDatePicker.bind(this);
    this.showTimePicker = this.showTimePicker.bind(this);
    this.handleTimePicked = this.handleTimePicked.bind(this);
    this.hideTimePicker = this.hideTimePicker.bind(this);
    this.updateNotification = this.updateNotification.bind(this);
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

  showDatePicker = () => {
    const { futurePaymentToggle } = this.state;
    if (futurePaymentToggle) {
      this.setState({ isDatePickerVisible: true });
    }
  };

  hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  handleDatePicked = date => {
    this.setState({
      date: formatDate(date),
    });
    this.hideDatePicker();
  };

  showTimePicker = () => {
    const { futurePaymentToggle } = this.state;
    if (futurePaymentToggle) {
      this.setState({ isTimePickerVisible: true });
    }
  };

  hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  handleTimePicked = time => {
    this.setState({
      time: formatTime(time),
    });

    this.hideTimePicker();
  };

  /**
   * @method handleCloseDropdown : To close wallet list dropdown on clicking outside dropdown.
   */
  handleCloseDropdown() {
    const { openWalletList } = this.state;
    if (openWalletList) {
      this.setState({ openWalletList: false });
    }
  }

  toggleWalletList() {
    const { openWalletList } = this.state;
    this.setState({
      openWalletList: !openWalletList,
    });
  }

  validateFields(type) {
    const { number, balance } = this.state;
    if (type === 'number') {
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(number)) {
        Alert.alert('Invalid Amount', invalidAmount);
        this.setState({
          number: '',
        });
        return invalid;
      }
      if (number > balance) {
        Alert.alert('Insufficient Balance', insufficientBalance);
        this.setState({
          number: '',
        });
        return invalid;
      }
    }
    return valid;
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

  handlePayNotification() {
    const isBackArrow = true;
    const { beneficiaryNotification, myNotification } = this.state;
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('PaymentNotification', {
        isBackArrow,
        updateNotification: this.updateNotification,
        beneficiaryNotification,
        myNotification,
      });
    }
  }

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  updateToggleValue() {
    const { normalPaymentToggle, futurePaymentToggle } = this.state;
    this.setState({
      normalPaymentToggle: !normalPaymentToggle,
      futurePaymentToggle: !futurePaymentToggle,
    });
  }

  /**
   * @method updateNotification : To update state of notifications
   */
  updateNotification(myNotification, beneficiaryNotification) {
    this.setState({
      myNotification,
      beneficiaryNotification,
    });
  }

  renderDateTimeView() {
    const { futurePaymentToggle, date, time } = this.state;
    if (futurePaymentToggle) {
      return (
        <View style={styles.dateTimeviewStyle}>
          <DateTimePickerField callMethod={this.showDatePicker} text={date} eventType="date" />
          <DateTimePickerField callMethod={this.showTimePicker} text={time} eventType="time" />
        </View>
      );
    }
    return null;
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
      isDatePickerVisible,
      isTimePickerVisible,
    } = this.state;
    let isClickable = false;
    if (accId !== '' && number !== '' && reference !== '') {
      isClickable = true;
    }
    let ParentView = View;
    if (openWalletList) {
      ParentView = TouchableOpacity;
    }
    return (
      <ParentView
        style={styles.Container}
        onPress={() => this.handleCloseDropdown()}
        activeOpacity={1}
      >
        <StatusBar />
        <TitleHeader
          iconName="keyboard-arrow-left"
          title="PAY BENEFICIARY"
          isBackArrow={isBackArrowPresent}
          onBtnPress={() => navigation.goBack()}
        />
        <KeyboardAwareScrollView
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
              validateFields={this.validateFields}
            />
            <View>
              <Text
                style={{
                  color: 'rgb(0, 177, 251)',
                  textAlign: 'right',
                  fontFamily: 'Roboto-Regular',
                }}
              >
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
              validate={this.validate}
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

          <View style={styles.toggleContainerStyle}>
            <ToggleCard
              textVal="Normal Payment"
              textStyle={styles.toggleTextStyle}
              toggleState={normalPaymentToggle}
              updateToggleClick={() => {
                this.updateToggleValue();
              }}
            />
            <View style={styles.separatorStyle} />
            <ToggleCard
              textVal="Future Payment"
              textStyle={styles.toggleTextStyle}
              toggleState={futurePaymentToggle}
              updateToggleClick={() => {
                this.updateToggleValue();
              }}
            />
            {this.renderDateTimeView()}
            <DateTimePicker
              isVisible={isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              mode="date"
              titleIOS="Select date"
              onCancel={this.hideDatePicker}
            />
            <DateTimePicker
              isVisible={isTimePickerVisible}
              onConfirm={this.handleTimePicked}
              mode="time"
              titleIOS="Select time"
              onCancel={this.hideTimePicker}
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
        </KeyboardAwareScrollView>
      </ParentView>
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
