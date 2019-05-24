/* eslint-disable */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import CustomisedButton from '../../../common/Button';
import TitleHeader from '../../../common/TitleHeader';
import StatusBar from '../../../common/StatusBar';
import StartScreenIcon from '../../../images/ZARNetwork_Logo.png';
import DesignButton from '../../../common/Button';

import { deviceWidth, deviceHeight } from '../../../common/constants';
import TimerCountdown from 'react-native-timer-countdown';

export default class OtpVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation, updateForm, confirmCode, isResendDisable, resendOTP, goBack } = this.props;
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
        <StatusBar />
        <TitleHeader
          iconName="keyboard-arrow-left"
          title="ONE TIME PIN"
          isBackArrow
          onBtnPress={goBack}
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
              fontFamily: 'Montserrat-Regular',
              backgroundColor: '#fff',
              margin: 4,
              height: 40,
              borderRadius: 0
            }}
            inputStyles={{ color: '#000', width: 40, fontSize: 14, borderRadius: 0 }}
            focusedBorderColor="#212c41"
            unFocusedBorderColor="#212c41"
          />
        </View>
        <View style={{ marginTop: 20, alignItems: 'center', width: deviceWidth * 0.7 }}>
          <CustomisedButton name="Next" callMethod={confirmCode} isClickable />
          <View
            style={{
              borderBottomColor: 'lightgray',
              borderBottomWidth: 1,
              marginTop: deviceHeight * 0.02
            }}
          />
          {!this.props.isResendDisable && <View>
            <DesignButton
              btnTextColor={resendOTPTextColor}
              name="RESEND OTP"
              isClickable
              callMethod={resendOTP}
              btnMainStyle={styles.resendBtnMainView}
            />
          </View>}
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
            <Text style={{
                textAlign: 'center',
                width: deviceWidth * 0.7,
                fontSize: 16,
                fontFamily: 'Montserrat-Regular'
              }}
            >
              <Text>Did't receive an</Text>
              <Text style={{fontFamily: "Montserrat-Bold"}}> OTP</Text>
              <Text>? You can request a new</Text>
              <Text style={{fontFamily: "Montserrat-Bold"}}> OTP</Text>
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
      </View>
    );
  }
}
