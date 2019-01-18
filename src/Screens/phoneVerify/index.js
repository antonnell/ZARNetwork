/* eslint-disable */
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import OtpVerification from './otpVerification';
import GenerateOTP from './generateOTP';

const config = {
  appId: '1:231567589892:ios:a1266d9f7b2ea10e',
  clientId: '231567589892-kgkk4kemko7v6bv06f3kfo544li6j44l.apps.googleusercontent.com',
  apiKey: 'AIzaSyDpsNHpnVL9j9SF2TDR4LBWnjH6qFhgbRY', // "<API_KEY>",
  authDomain: 'fantompay-ed985.firebaseapp.com', // "<PROJECT_ID>.firebaseapp.com",
  databaseURL: 'https://fantompay-ed985.firebaseio.com', // "https://<DATABASE_NAME>.firebaseio.com",
  projectId: 'fantompay-ed985', // "<PROJECT_ID>",
  storageBucket: 'fantompay-ed985.appspot.com', // "<BUCKET>.appspot.com",
  messagingSenderId: '231567589892', // "<SENDER_ID>",
};
export default class PhoneAuthTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeInput: '',
      phoneNumber: '',
      verificationId: '',
      isResendDisable: true,
      resendOTP: '',
    };
    this.updateForm = this.updateForm.bind(this);
  }

  confirmCode = () => {
    const { navigation } = this.props;
    const { phoneNumber } = this.state;
    console.log('Navigation EMail', navigation.state.params.emailId);
    const userEmailId = navigation.state.params.emailId;
    const userPasssword = navigation.state.params.password;
    const { codeInput, verificationId } = this.state;
    if (verificationId && codeInput.length) {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeInput);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          navigation.navigate('CreatePin', {
            emailId: userEmailId,
            password: userPasssword,
            phoneNumber,
          });
        })
        .catch(() => {
          Alert.alert('OTP verify Failed');
        });
    }
  };

  signIn() {
    const { phoneNumber } = this.state;
    if (phoneNumber.length > 3) {
      setTimeout(() => {
        this.sendVerificationCode();
      }, 1000);
    } else {
      Alert.alert('Please Enter the phone number.');
    }
  }
  sendVerificationCode() {
    const { phoneNumber } = this.state;
    firebase.initializeApp(config);
    firebase
      .auth()
      .verifyPhoneNumber(phoneNumber)
      .on(
        'state_changed',
        phoneAuthSnapshot => {
          console.log('phone number is ', phoneAuthSnapshot);
          switch (phoneAuthSnapshot.state) {
            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
              console.log('code sent');
              this.setState({
                verificationId: phoneAuthSnapshot.verificationId,
              });
              this.timeout = setTimeout(() => {
                const { isResendDisable } = this.state;
                this.setState({
                  isResendDisable: !isResendDisable,
                });
              }, 30000);
              break;
            case firebase.auth.PhoneAuthState.ERROR: // or 'error'
              console.log('verification error');
              console.log(phoneAuthSnapshot.error);
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
              console.log('auto verify on android timed out');
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
              console.log('auto verified on android');
              console.log(phoneAuthSnapshot);
              break;
            default:
              console.log('Default case');
              break;
          }
        },
        error => {
          console.log(error);
          console.log(error.verificationId);
        },
        phoneAuthSnapshot => {
          console.log(phoneAuthSnapshot);
        }
      );
  }
  resendOTP = () => {
    const { resendOTP } = this.state;
    firebase.initializeApp(config);
    firebase
      .auth()
      .verifyPhoneNumber(resendOTP)
      .on(
        'state_changed',
        phoneAuthSnapshot => {
          console.log('phone number is ', phoneAuthSnapshot);
          switch (phoneAuthSnapshot.state) {
            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
              console.log('code sent');
              this.setState({
                verificationId: phoneAuthSnapshot.verificationId,
              });
              this.interval = setTimeout(() => {
                const { isResendDisable } = this.state;
                this.setState({
                  isResendDisable: !isResendDisable,
                });
              }, 30000);
              break;
            case firebase.auth.PhoneAuthState.ERROR: // or 'error'
              console.log('verification error');
              console.log(phoneAuthSnapshot.error);
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
              console.log('auto verify on android timed out');
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
              console.log('auto verified on android');
              console.log(phoneAuthSnapshot);
              break;
            default:
              console.log('Default case');
              break;
          }
        },
        error => {
          console.log(error);
          console.log(error.verificationId);
        },
        phoneAuthSnapshot => {
          console.log(phoneAuthSnapshot);
        }
      );
  };

  updateForm(value, type) {
    this.setState({ [type]: value, resendOTP: value });
  }

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;
    const { navigation } = this.props;
    return (
      <GenerateOTP
        phoneNumber={phoneNumber}
        updateForm={this.updateForm}
        signIn={() => this.signIn()}
        navigation={navigation}
      />
    );
  }

  renderVerificationCodeInput() {
    const { navigation } = this.props;
    const { phoneNumber, resendOTP } = this.state;
    return (
      <OtpVerification
        phoneNumber={phoneNumber}
        resendOTP={resendOTP}
        updateForm={this.updateForm}
        navigation={navigation}
        isResendDisable={this.state.isResendDisable}
        confirmCode={() => this.confirmCode()}
        resendOTP={() => this.resendOTP()}
      />
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearTimeout(this.interval);
  }

  render() {
    const { navigation } = this.props;
    console.log('Navigation EMail', navigation.state.params.emailId);
    const { verificationId } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {verificationId == '' && this.renderPhoneNumberInput()}
        {verificationId != '' && this.renderVerificationCodeInput()}
      </View>
    );
  }
}
