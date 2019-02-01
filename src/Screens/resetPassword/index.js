import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import DesignButton from '../../common/Button';
import TitleHeader from '../../common/TitleHeader';
import FantomPayLogo from '../../images/FantomPay.png';
import Loader from '../../common/Loader';
import { isEmailValid } from '../../utility/index';
import { invalid, valid, invalidEmail } from '../../common/constants';

import PhoneVerify from '../phoneVerify';
import VerifyOTP from './VerifyOTP';

import { sendOtpApi, validateOtpApi } from '../../controllers/api/otp';
import StatusBar from '../../common/StatusBar';
// const i = 0;
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isLoading: false,
      otpSent: false,
      isResendDisable: true,
      // clickable: false,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleGoBackFromVerifyOTP = this.handleGoBackFromVerifyOTP.bind(this);
  }

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  /**
   * ******************************************************************************
   * @method handleResetPassword : To perform action for phone number verification.
   * ******************************************************************************
   */
  handleResetPassword(number, validNumber) {
    this.phoneNumber = number;
    this.validPhone = validNumber;
  }

  sendVerificationOTP() {
    const { phoneNumber } = this;
    this.setState({
      isResendDisable: true,
    });
    if (this.validPhone) {
      setTimeout(() => {
        this.setState({
          isResendDisable: false,
        });
      }, 30000);

      const payload = {
        mobile_number: phoneNumber,
      };
      this.setState({
        isLoading: true,
      });

      if (phoneNumber) {
        sendOtpApi(payload)
          .then(res => {
            this.setState({
              isLoading: false,
            });
            if (res && res.payload && res.payload.status === 200) {
              this.setState({
                otpSent: true,
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
    } else {
      Alert.alert('Invalid mobile number', 'Please enter a valid number');
    }
  }

  handleGoBack() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.goBack();
    }
  }

  /**
   * @method validateFields : To validate email.
   */
  validateFields(type) {
    const { email } = this.state;
    if (type === 'email') {
      if (email !== '' && email !== undefined) {
        if (isEmailValid(email) === false) {
          Alert.alert('Invalid Email', invalidEmail);
          this.setState({
            email: '',
          });
          return invalid;
        }
      }
    }
    return valid;
  }

  /**
   * @method renderLoader : To display loader indicator.
   */

  confirmCode() {
    const { navigation } = this.props;
    const { codeInput } = this.state;

    const payload = {
      mobile_number: this.phoneNumber,
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
          navigation.navigate('UpdatePassword', {
            phoneNumber: this.phoneNumber,
            uuid: res.payload.data.result.uuid,
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

  handleGoBackFromVerifyOTP() {
    this.setState({
      otpSent: false,
    });
  }

  renderLoader() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader isLoading={isLoading} loaderStyle={0.25} />;
    }
    return null;
  }

  render() {
    const { otpSent, isResendDisable } = this.state;
    const { navigation } = this.props;

    if (otpSent) {
      return (
        <View style={styles.verfiyOTPContainerStyle}>
          <VerifyOTP
            phoneNumber={this.phoneNumber}
            // resendOTP={this.phoneNumber}
            updateForm={this.updateForm}
            navigation={navigation}
            isResendDisable={isResendDisable}
            confirmCode={() => this.confirmCode()}
            resendOTP={() => this.sendVerificationOTP()}
            handleGoBack={this.handleGoBackFromVerifyOTP}
          />
        </View>
      );
    }
    return (
      <View style={styles.Container}>
        <StatusBar />
        <TitleHeader
          // title="RESET PASSWORD"
          isBackArrow
          iconName="keyboard-arrow-left"
          onBtnPress={this.handleGoBack}
        />
        <KeyboardAwareScrollView
          style={styles.verfiyOTPContainerStyle}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View style={styles.fantomPayLogoContainer}>
            <Image
              source={FantomPayLogo}
              style={styles.fantomPayLogoImageStyle}
              resizeMode="contain"
            />
          </View>
          <View style={styles.mainTextViewStyle}>
            <Text style={styles.mainTextStyle}>Forgot your password?</Text>
            <View style={styles.subTextViewStyle}>
              <Text style={styles.subTextStyle}>
                Enter your mobile number below to receive an OTP for reseting password.
              </Text>
            </View>
          </View>

          <View style={styles.emailTextFieldStyle}>
            <PhoneVerify
              ref={ref => {
                this.phone = ref;
              }}
              ResetPassword={(phoneNumber, validNumber) =>
                this.handleResetPassword(phoneNumber, validNumber)
              }
              navigation={navigation}
              navigationFrom="forgotScreen"
            />
          </View>

          <View style={styles.resetButtonViewStyle}>
            <DesignButton
              name="RESET PASSWORD"
              callMethod={() => this.sendVerificationOTP()}
              isClickable
            />
          </View>
        </KeyboardAwareScrollView>
        {this.renderLoader()}
      </View>
    );
  }
}
ResetPassword.defaultProps = {
  navigation: null,
};

ResetPassword.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

export default ResetPassword;
