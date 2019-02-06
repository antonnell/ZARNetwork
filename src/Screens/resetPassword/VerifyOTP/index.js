/*eslint-disable */
import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import TimerCountdown from 'react-native-timer-countdown';
import styles from './styles';
import CustomisedButton from '../../../common/Button';
import { deviceHeight } from '../../../common/constants';
import TitleHeader from '../../../common/TitleHeader';

export default class VerifyOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  handleGoBack() {
    const { handleGoBack } = this.props;
    if (handleGoBack) {
      handleGoBack();
    }
  }

  render() {
    const { updateForm, confirmCode, isResendDisable, resendOTP } = this.props;
    let resendOTPTextColor = {
      ...styles.resenOtpTextStyle,
    };
    if (!isResendDisable) {
      resendOTPTextColor = {
        ...styles.resenOtpTextStyle,
        color: 'rgba(0, 0, 0, 1)',
      };
    }
    return (
      <View style={styles.Container}>
        <TitleHeader
          title="ONE TIME PIN"
          isBackArrow
          iconName="keyboard-arrow-left"
          onBtnPress={this.handleGoBack}
        />

        <Text style={styles.descriptionText}>
          Enter the 6 digit code that was sent to you via SMS
        </Text>
        <View style={styles.optFieldViewStyle}>
          <OtpInputs
            handleChange={code => updateForm(code, 'codeInput')}
            numberOfInputs={6}
            keyboardType="numeric"
            inputContainerStyles={styles.otpInputsViewStyle}
            inputStyles={styles.otpInputsStyle}
            focusedBorderColor="rgb(0,177,251)"
            unFocusedBorderColor="rgb(0,177,251)"
          />
        </View>
        <View style={styles.resendViewStyle}>
          <CustomisedButton name="Next" callMethod={confirmCode} isClickable />
          <TouchableOpacity
            style={styles.resendBtnMainView}
            disabled={isResendDisable}
            onPress={resendOTP}
          >
            <Text style={resendOTPTextColor}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
        {isResendDisable && (
          <View style={styles.resendTimerViewStyle}>
            <Text style={styles.resendTimerTextStyle}>You can resend otp in next </Text>
            <TimerCountdown
              initialSecondsRemaining={1000 * 30}
              onTick={secondsRemaining => console.log('tick', secondsRemaining)}
              onTimeElapsed={() => console.log('complete')}
              allowFontScaling
              style={styles.timerCountdownStyle}
            />
          </View>
        )}
      </View>
    );
  }
}
