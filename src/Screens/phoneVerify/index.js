/* eslint-disable */
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import OtpVerification from './otpVerification';
import GenerateOTP from './generateOTP';

import { sendOtpApi, validateOtpApi } from '../../controllers/api/otp';

// const config = {
//   appId: '1:231567589892:ios:a1266d9f7b2ea10e',
//   clientId: '231567589892-kgkk4kemko7v6bv06f3kfo544li6j44l.apps.googleusercontent.com',
//   apiKey: 'AIzaSyDpsNHpnVL9j9SF2TDR4LBWnjH6qFhgbRY', // "<API_KEY>",
//   authDomain: 'fantompay-ed985.firebaseapp.com', // "<PROJECT_ID>.firebaseapp.com",
//   databaseURL: 'https://fantompay-ed985.firebaseio.com', // "https://<DATABASE_NAME>.firebaseio.com",
//   projectId: 'fantompay-ed985', // "<PROJECT_ID>",
//   storageBucket: 'fantompay-ed985.appspot.com', // "<BUCKET>.appspot.com",
//   messagingSenderId: '231567589892', // "<SENDER_ID>",
// };
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
    // const { navigation } = this.props;
    // const { phoneNumber } = this.state;
    // console.log('Navigation EMail', 'navigation.state.params.emailId');
    // const userEmailId = 'navigation.state.params.emailId';
    // const userPasssword = 'navigation.state.params.password';
    // const userFirstName = 'navigation.state.params.firstName';
    // const userLastName = 'navigation.state.params.lastName';
    // const { codeInput, verificationId } = this.state;
    // if (verificationId && codeInput.length) {
    //   const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeInput);
    //   firebase
    //     .auth()
    //     .signInWithCredential(credential)
    //     .then(() => {
    //       navigation.navigate('CreatePin', {
    //         firstName: userFirstName,
    //         lastName: userLastName,
    //         emailId: userEmailId,
    //         password: userPasssword,
    //         phoneNumber,
    //       });
    //     })
    //     .catch(() => {
    //       Alert.alert('OTP verify Failed');
    //     });
    // }
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

    // if (phoneNumber.length > 3) {
    //   setTimeout(() => {
    //     this.sendVerificationCode();
    //   }, 1000);
    // } else {
    //   Alert.alert('Please Enter the phone number.');
    // }
  }
  // sendVerificationCode() {
  //   const { phoneNumber } = this.state;
  //   firebase.initializeApp(config);
  //   firebase
  //     .auth()
  //     .verifyPhoneNumber(phoneNumber)
  //     .on(
  //       'state_changed',
  //       phoneAuthSnapshot => {
  //         console.log('phone number is ', phoneAuthSnapshot);
  //         switch (phoneAuthSnapshot.state) {
  //           case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
  //             console.log('code sent');
  //             this.setState({
  //               verificationId: phoneAuthSnapshot.verificationId,
  //             });
  //             this.timeout = setTimeout(() => {
  //               const { isResendDisable } = this.state;
  //               this.setState({
  //                 isResendDisable: !isResendDisable,
  //               });
  //             }, 30000);
  //             break;
  //           case firebase.auth.PhoneAuthState.ERROR: // or 'error'
  //             console.log('verification error');
  //             console.log(phoneAuthSnapshot.error);
  //             break;
  //           case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
  //             console.log('auto verify on android timed out');
  //             break;
  //           case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
  //             console.log('auto verified on android');
  //             console.log(phoneAuthSnapshot);
  //             break;
  //           default:
  //             console.log('Default case');
  //             break;
  //         }
  //       },
  //       error => {
  //         console.log(error);
  //         console.log(error.verificationId);
  //       },
  //       phoneAuthSnapshot => {
  //         console.log(phoneAuthSnapshot);
  //       }
  //     );
  // }
  // resendOTP = () => {
  // const { resendOTP } = this.state;
  // firebase.initializeApp(config);
  // firebase
  //   .auth()
  //   .verifyPhoneNumber(resendOTP)
  //   .on(
  //     'state_changed',
  //     phoneAuthSnapshot => {
  //       console.log('phone number is ', phoneAuthSnapshot);
  //       switch (phoneAuthSnapshot.state) {
  //         case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
  //           console.log('code sent');
  //           this.setState({
  //             verificationId: phoneAuthSnapshot.verificationId,
  //           });
  //           this.interval = setTimeout(() => {
  //             const { isResendDisable } = this.state;
  //             this.setState({
  //               isResendDisable: !isResendDisable,
  //             });
  //           }, 30000);
  //           break;
  //         case firebase.auth.PhoneAuthState.ERROR: // or 'error'
  //           console.log('verification error');
  //           console.log(phoneAuthSnapshot.error);
  //           break;
  //         case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
  //           console.log('auto verify on android timed out');
  //           break;
  //         case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
  //           console.log('auto verified on android');
  //           console.log(phoneAuthSnapshot);
  //           break;
  //         default:
  //           console.log('Default case');
  //           break;
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //       console.log(error.verificationId);
  //     },
  //     phoneAuthSnapshot => {
  //       console.log(phoneAuthSnapshot);
  //     }
  //   );
  // };

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
