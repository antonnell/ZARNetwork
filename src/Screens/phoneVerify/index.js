/* eslint-disable */
import React, { Component } from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import OtpVerification from './otpVerification';
import GenerateOTP from './generateOTP';

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
export default class PhoneAuthTest extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      codeInput: '',
      phoneNumber: '+91',
      verificationId: '',
    };
    AsyncStorage.getItem('verificationId').then(value => {
      console.log('verifyId', value);
      if (value === null) {
        this.setState({
          verificationId: '',
        })
      } else {
        this.setState({
          verificationId: value,
        })
      }
     
    })
    this.updateForm = this.updateForm.bind(this);
  }

  confirmCode = () => {
    const { codeInput, verificationId } = this.state;
    if (verificationId && codeInput.length) {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeInput);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          //Alert.alert('OTP verify Successfully');
          this.props.navigation.navigate('CreatePin');
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
  clearAsyncStorage = () => {
    AsyncStorage.setItem('verificationId', '');
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
              AsyncStorage.setItem('verificationId', phoneAuthSnapshot.verificationId);
              setTimeout(() => {
                this.clearAsyncStorage();
              }, 1000);
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

  updateForm(value, type) {
    this.setState({ [type]: value });
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
    return (
      <OtpVerification
        updateForm={this.updateForm}
        navigation={navigation}
        confirmCode={() => this.confirmCode()}
      />
    );
  }
  

  render() {
    const { verificationId } = this.state;    
    return (
      <View style={{ flex: 1 }}>
        {verificationId == ''  && this.renderPhoneNumberInput()}
        {verificationId != ''  && this.renderVerificationCodeInput()}
      </View>
    );
  }
}
