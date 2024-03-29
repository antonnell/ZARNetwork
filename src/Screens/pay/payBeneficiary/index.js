// Library
import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
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
// import ListCard from '../../../common/ListCard';
import AccountType from '../../../images/AccountType.png';
import {
  getWalletType,
  getWalletDetail,
  getAccountIcon,
  getFullName,
  formatDate,
  formatTime,
} from '../../../utility';
import DateTimePickerField from '../../../common/DateTimePickerField';
import StatusBar from '../../../common/StatusBar';
// constants
import {
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
    const { navigation, accountTypeList, userWalletDetail } = this.props;
    let isBackArrowPresent = false;
    let reference = '';
    let selectedWallet = '';
    let accId = '';
    let walletType = '';
    let balance = '';
    let accountId = '';
    let resetState = () => {};

    if (navigation && navigation.state && navigation.state.params) {
      const navigationState = navigation.state.params;
      isBackArrowPresent = navigationState.isBackArrow;
      if (navigationState.resetState) {
        // eslint-disable-next-line prefer-destructuring
        resetState = navigationState.resetState;
      }
      if (navigationState.selectedBeneficiary) {
        const data = navigationState.selectedBeneficiary;
        reference = data.their_reference;
        accountId = data.account_uuid;

        if (userWalletDetail && userWalletDetail.length > 0) {
          const detail = getWalletDetail(userWalletDetail, accountId);
          selectedWallet = detail.name;
          accId = accountId;
          walletType = getWalletType(accountTypeList, detail.type);
          // eslint-disable-next-line prefer-destructuring
          balance = detail.balance;
        }
      }
    }
    const initialState = this.setInitialState();
    this.state = {
      number: initialState.number,
      reference,
      normalPaymentToggle: true,
      futurePaymentToggle: false,
      isBackArrowPresent,
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
      myNotificationText: 'none',
      beneficiaryNotificationText: 'none',
      myNotifyArray: [],
      benefNotifyArray: [],
      resetState,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handlePayNotification = this.handlePayNotification.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.handleDatePicked = this.handleDatePicked.bind(this);
    this.hideDatePicker = this.hideDatePicker.bind(this);
    this.showTimePicker = this.showTimePicker.bind(this);
    this.handleTimePicked = this.handleTimePicked.bind(this);
    this.hideTimePicker = this.hideTimePicker.bind(this);
    this.updateNotification = this.updateNotification.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  onPayBtnClick() {
    const {
      accId,
      number,
      reference,
      walletType,
      selectedWallet,
      myNotifyArray,
      benefNotifyArray,
      beneficiaryNotificationText,
      myNotificationText,
    } = this.state;
    const { navigation } = this.props;

    navigation.navigate('ConfirmPayment', {
      accountId: accId,
      amount: number,
      reference,
      walletType,
      selectedWallet,
      beneficiary_uuid: navigation.state.params.selectedBeneficiary.uuid,
      beneficiaryName: navigation.state.params.selectedBeneficiary.name,
      accountNumber: navigation.state.params.selectedBeneficiary.number,
      own_notifications: myNotifyArray,
      beneficiary_notifications: benefNotifyArray,
      notificationTypeText: `Beneficiary : ${beneficiaryNotificationText} , My :  ${myNotificationText}`,
      resetState: this.resetState,
    });
  }

  /**
   * @method setNotificationText : To set type of notification enabled for particuler category
   * @param {*} notificationCategoryType : Notification category object
   */
  // eslint-disable-next-line class-methods-use-this
  setNotificationText(notificationCategoryType) {
    const { notificationChannelList } = this.props;

    let text = 'none';
    const channelList = [];
    if (notificationCategoryType && notificationCategoryType !== null) {
      const { none, email, sms } = notificationCategoryType;
      if (none === false) {
        if (email === true && sms === true) {
          text = 'all';
          notificationChannelList.map(channel => {
            if (channel.description === 'Email' || channel.description === 'SMS') {
              channelList.push({ notification_channel_uuid: channel.uuid });
            }
            return true;
          });
        } else if (sms === true) {
          text = 'SMS';
          notificationChannelList.map(channel => {
            if (channel.description === 'SMS') {
              channelList.push({ notification_channel_uuid: channel.uuid });
            }
            return true;
          });
        } else if (email === true) {
          text = 'Email';
          notificationChannelList.map(channel => {
            if (channel.description === 'Email') {
              channelList.push({ notification_channel_uuid: channel.uuid });
            }
            return true;
          });
        } else {
          text = 'none';
        }
      }
    }

    const notificationData = {
      text,
      channelList,
    };

    return notificationData;
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

  // eslint-disable-next-line class-methods-use-this
  setInitialState() {
    const number = '';
    return { number };
  }

  resetState() {
    const initialState = this.setInitialState();
    this.setState({
      number: initialState.number,
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
    const myNotifyData = this.setNotificationText(myNotification);
    const myNotificationText = myNotifyData.text;
    const myNotifyArray = myNotifyData.channelList;

    const beneficiaryNotifyData = this.setNotificationText(beneficiaryNotification);
    const beneficiaryNotificationText = beneficiaryNotifyData.text;
    const benefNotifyArray = beneficiaryNotifyData.channelList;

    this.setState({
      myNotification,
      beneficiaryNotification,
      myNotificationText,
      beneficiaryNotificationText,
      myNotifyArray,
      benefNotifyArray,
    });
  }

  handleGoBack() {
    const { resetState } = this.state;
    resetState();
    const { navigation } = this.props;
    if (navigation) {
      navigation.goBack();
    }
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
    const { userDetail } = this.props;
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

      accId,
      selectedWallet,
      balance,
      walletType,
      isDatePickerVisible,
      isTimePickerVisible,
      myNotificationText,
      beneficiaryNotificationText,
    } = this.state;
    let isClickable = false;
    if (accId !== '' && number !== '' && reference !== '') {
      isClickable = true;
    }

    return (
      <View style={styles.Container}>
        <StatusBar />
        <TitleHeader
          iconName="keyboard-arrow-left"
          title="PAY BENEFICIARY"
          isBackArrow={isBackArrowPresent}
          onBtnPress={this.handleGoBack}
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
          <View style={{ zIndex: 0 }}>
            <TitleCard
              icon={AccountType}
              titleCardMainViewStyle={styles.titleCardMainViewStyle}
              titleCardImageStyle={styles.titleCardImageStyle}
              titleCardTextStyle={styles.titleCardTextStyle}
              titleMaterialIconStyle={styles.titleMaterialIconStyle}
              text={selectedWallet}
              disable
            />
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
              editable={false}
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
            text={`Payment Notification: ${beneficiaryNotificationText} , ${myNotificationText}`}
            onPress={this.handlePayNotification}
            type="tab"
            rightIcon="keyboard-arrow-right"
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
      </View>
    );
  }
}
PayBeneficiary.defaultProps = {
  userDetail: null,
  navigation: null,
  userWalletDetail: [],
  notificationChannelList: [],
  accountTypeList: [],
};

PayBeneficiary.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  userWalletDetail: PropTypes.arrayOf(PropTypes.any),
  userDetail: PropTypes.objectOf(PropTypes.any),
  notificationChannelList: PropTypes.arrayOf(PropTypes.any),
  accountTypeList: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userWalletDetail: state.userWalletReducer.wallets,
  accountTypeList: state.supportedAccTypeReducer.types,
  userDetail: state.userAuthReducer.userDetail,
  notificationChannelList: state.notificationChannelReducer.notificationChannelList,
});

export default connect(mapStateToProps)(PayBeneficiary);
