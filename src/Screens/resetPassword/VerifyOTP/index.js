/* eslint-disable */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, TouchableOpacity } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import CustomisedButton from '../../../common/Button';
import { deviceWidth, deviceHeight } from '../../../common/constants';
import TimerCountdown from 'react-native-timer-countdown';

export default class VerifyOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation, updateForm, confirmCode, isResendDisable, resendOTP } = this.props;
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
        <View
          style={{
            width: deviceWidth,
            alignItems: 'center',
            marginTop: deviceHeight * 0.1,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              color="#000"
              size={24}
              style={{ marginLeft: 10 }}
              name="keyboard-arrow-left"
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>ONE TIME PIN</Text>
        </View>
        <Text style={styles.descriptionText}>
          Enter the 6 digit code that was sent to you via SMS
        </Text>
        <View
          style={{
            height: deviceHeight * 0.13,
          }}
        >
          <OtpInputs
            handleChange={code => updateForm(code, 'codeInput')}
            numberOfInputs={6}
            keyboardType="numeric"
            inputContainerStyles={{
              backgroundColor: '#fff',
              margin: 7,
              height: 40,
            }}
            inputStyles={{ color: '#000', width: 30, fontSize: 14 }}
            focusedBorderColor="rgb(0,177,251)"
            unFocusedBorderColor="rgb(0,177,251)"
          />
        </View>
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <CustomisedButton name="Next" callMethod={confirmCode} isClickable />
          <TouchableOpacity
            style={styles.resendBtnMainView}
            disabled={isResendDisable}
            onPress={resendOTP}
          >
            <Text style={resendOTPTextColor}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
        {this.props.isResendDisable && (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <Text>You can resend otp in next </Text>
            <TimerCountdown
              initialSecondsRemaining={1000 * 30}
              onTick={secondsRemaining => console.log('tick', secondsRemaining)}
              onTimeElapsed={() => console.log('complete')}
              allowFontScaling
              style={{ fontSize: 14 }}
            />
          </View>
        )}
      </View>
    );
  }
}
