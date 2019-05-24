/*eslint-disable */
import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import TimerCountdown from 'react-native-timer-countdown';
import styles from './styles';
import CustomisedButton from '../../../common/Button';
import { deviceHeight } from '../../../common/constants';
import TitleHeader from '../../../common/TitleHeader';
import StartScreenIcon from '../../../images/ZARNetwork_Logo.png';
import DesignButton from '../../../common/Button';

const deviceWidth = Dimensions.get('window').width;

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
    return (
      <View style={styles.Container}>
        <TitleHeader
          title="ONE TIME PIN"
          isBackArrow
          iconName="keyboard-arrow-left"
          onBtnPress={this.handleGoBack}
        />
        <Image source={StartScreenIcon} style={styles.imageStyle} resizeMode="contain" />
        <Text style={{
            textAlign: 'center',
            width: deviceWidth * 0.7,
            fontSize: 16,
            fontFamily: 'Montserrat-Regular'
          }}>
          <Text>Enter the</Text>
          <Text style={{fontFamily: "Montserrat-Bold"}}> 6 digit code</Text>
          <Text> that was sent to you via </Text>
          <Text style={{fontFamily: "Montserrat-Bold"}}> SMS</Text>
        </Text>
        <View style={styles.optFieldViewStyle}>
          <OtpInputs
            handleChange={code => updateForm(code, 'codeInput')}
            numberOfInputs={6}
            keyboardType="numeric"
            inputContainerStyles={styles.otpInputsViewStyle}
            inputStyles={styles.otpInputsStyle}
            focusedBorderColor="#212c41"
            unFocusedBorderColor="#212c41"
          />
        </View>
        <View style={styles.resendViewStyle}>
          <CustomisedButton name="Next" callMethod={confirmCode} isClickable />
        </View>
        <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          }}
        />
        {isResendDisable && (
          <View style={styles.resendTimerViewStyle}>
            <Text style={{
                textAlign: 'center',
                width: deviceWidth * 0.8,
                fontSize: 18,
                fontWeight: '400'
              }}
            >
              <Text>Did't receive an</Text>
              <Text style={{fontWeight: "600"}}> OTP</Text>
              <Text>? You can request a new</Text>
              <Text style={{fontWeight: "600"}}> OTP</Text>
              <Text> in </Text>
              <TimerCountdown
                initialSecondsRemaining={1000 * 30}
                onTick={secondsRemaining => console.log('tick', secondsRemaining)}
                allowFontScaling
                style={styles.timerCountdownStyle}
              />
            </Text>
          </View>
        )}
        {!isResendDisable && <View style={{ width: deviceWidth * 0.7 }}>
          <DesignButton
            btnTextColor={styles.btnTextColor}
            name="RESEND OTP"
            isClickable={!isResendDisable}
            callMethod={resendOTP}
            btnMainStyle={styles.btnStyle}
          />
        </View>
        }
      </View>
    );
  }
}
