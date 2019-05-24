/* eslint-disable */
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import OtpVerification from './otpVerification';
import GenerateOTP from './generateOTP';

import { sendOtpApi, validateOtpApi } from '../../controllers/api/otp';

export default class PhoneAuthTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeInput: '',
      phoneNumber: '',
      verificationId: false,
      isResendDisable: true,
      resendOTP: '',
      otp: '',
      phoneValid: false,
    };
    this.updateForm = this.updateForm.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  confirmCode = () => {
    const { navigation } = this.props;
    const { phoneNumber, codeInput } = this.state;

    const userEmailId = navigation.state.params.emailId;
    const userPasssword = navigation.state.params.password;
    const userFirstName = navigation.state.params.firstName;
    const userLastName = navigation.state.params.lastName;
    payload = {
      mobile_number: phoneNumber,
      token: codeInput,
    };
    this.setState({
      isLoading: true,
    });

    validateOtpApi(payload)
      .then(res => {
        this.setState({
          isLoading: false,
        });
        if (res && res.payload && res.payload.status === 200) {
          navigation.navigate('CreatePin', {
            firstName: userFirstName,
            lastName: userLastName,
            emailId: userEmailId,
            password: userPasssword,
            phoneNumber: phoneNumber,
          });
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
        Alert.alert('Error', error);
      });
  };

  sendOTP() {
    const { phoneNumber } = this.state;
    //Alert.alert('Please Enter the phone number.');

    const payload = {
      mobile_number: phoneNumber,
    };
    this.setState({
      isLoading: true,
    });
    this.setState({
      isResendDisable: true,
    });

    this.timeout = setTimeout(() => {
      const { isResendDisable } = this.state;
      this.setState({
        isResendDisable: false,
      });
    }, 30000);
    if (phoneNumber) {
      sendOtpApi(payload)
        .then(res => {
          this.setState({
            isLoading: false,
          });
          if (res && res.payload && res.payload.status === 200) {
            this.setState({
              verificationId: true,
            });
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

  updateForm(value, type, phoneValid) {
    this.setState({ [type]: value, resendOTP: value, phoneValid: phoneValid });
  }

  goBack() {
    this.setState({
      verificationId: false,
    });
  }

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;
    const { navigation } = this.props;
    if (this.props.navigationFrom) {
      this.props.ResetPassword(this.state.phoneNumber, this.state.phoneValid);
    }
    return (
      <GenerateOTP
        phoneNumber={phoneNumber}
        updateForm={this.updateForm}
        signIn={() => this.sendOTP()}
        navigation={navigation}
        navigationFrom={this.props.navigationFrom}
      />
    );
  }

  renderVerificationCodeInput() {
    const { navigation } = this.props;
    const { phoneNumber, resendOTP } = this.state;
    return (
      <OtpVerification
        goBack={this.goBack}
        phoneNumber={phoneNumber}
        resendOTP={resendOTP}
        updateForm={this.updateForm}
        navigation={navigation}
        isResendDisable={this.state.isResendDisable}
        confirmCode={() => this.confirmCode()}
        resendOTP={() => this.sendOTP()}
      />
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearTimeout(this.interval);
  }

  render() {
    const { navigation } = this.props;
    // console.log('Navigation EMail', navigation.state.params.emailId);
    const { verificationId } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {!verificationId && this.renderPhoneNumberInput()}
        {verificationId && this.renderVerificationCodeInput()}
      </View>
    );
  }
}
