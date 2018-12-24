/* eslint-disable */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import CustomisedButton from '../../../common/Button';

const config = {
  appId: '1:888539243135:ios:35169b268735df00',
  clientId: '888539243135-m8ev3lim2ljfhmkgiu637atp6qrdu5c9.apps.googleusercontent.com',
  apiKey: 'AIzaSyD96UPaU0z1WN4ikxLhVfTtTxYT2_DM_6Y', // "<API_KEY>",
  authDomain: 'fantompay-b6de5.firebaseapp.com', // "<PROJECT_ID>.firebaseapp.com",
  databaseURL: 'https://fantompay-b6de5.firebaseio.com', // "https://<DATABASE_NAME>.firebaseio.com",
  projectId: 'fantompay-b6de5', // "<PROJECT_ID>",
  storageBucket: 'fantompay-b6de5.appspot.com', // "<BUCKET>.appspot.com",
  messagingSenderId: '888539243135', // "<SENDER_ID>",
};
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class OtpVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  resendOTP = () => {
    firebase.initializeApp(config);
    console.log('phoneNumberphoneNumber', this.props.phoneNumber);
    console.log('PhoneAuthProvider', firebase.auth.PhoneAuthProvider.getInstance());
    console.log('authauth', PhoneAuthProvider);
    PhoneAuthProvider.getInstance().verifyPhoneNumber(
      this.props.phoneNumber, // Phone number to verify
      60, // Timeout duration
      TimeUnit.SECONDS, // Unit of timeout
      this, // Activity (for callback binding)
      mCallbacks
    ); // OnVerificationStateChangedCallbacks
  };
  render() {
    const { navigation, updateForm, confirmCode, isResendDisable } = this.props;
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
            disabled={this.props.isResendDisable}
            onPress={this.resendOTP}
          >
            <Text style={styles.resenOtpTextStyle}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
