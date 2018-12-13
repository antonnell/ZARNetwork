import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';

import firebase from 'react-native-firebase';

const successImageUri = '';
export default class PhoneAuthTest extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+91',
      confirmResult: null,
    };
  }

  componentDidMount() {
    var config = {
        appId: "1:888539243135:ios:35169b268735df00",
        clientId: "888539243135-m8ev3lim2ljfhmkgiu637atp6qrdu5c9.apps.googleusercontent.com",
        apiKey:  'AIzaSyD96UPaU0z1WN4ikxLhVfTtTxYT2_DM_6Y' ,//"<API_KEY>",
        authDomain:  "fantompay-b6de5.firebaseapp.com",//"<PROJECT_ID>.firebaseapp.com",
        databaseURL: "https://fantompay-b6de5.firebaseio.com",//"https://<DATABASE_NAME>.firebaseio.com",
        projectId: "fantompay-b6de5",//"<PROJECT_ID>",
        storageBucket:   "fantompay-b6de5.appspot.com",//"<BUCKET>.appspot.com",
        messagingSenderId: "888539243135"//"<SENDER_ID>",
      };
      firebase.initializeApp(config);
    console.log(firebase,'124');
    firebase.auth().verifyPhoneNumber('+919915376280').on('state_changed', (phoneAuthSnapshot) => {
        console.log('phone number is ', phoneAuthSnapshot);
        switch (phoneAuthSnapshot.state) {
            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
              console.log('code sent');
              break;
            case firebase.auth.PhoneAuthState.ERROR: // or 'error'
              console.log('verification error');
              console.log(phoneAuthSnapshot.error);
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
              console.log('auto verify on android timed out');
              // proceed with your manual code input flow, same as you would do in
              // CODE_SENT if you were on IOS
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
              console.log('auto verified on android');
              console.log(phoneAuthSnapshot);
              break;
          }
        }, (error) => {
          // optionalErrorCb would be same logic as the ERROR case above,  if you've already handed
          // the ERROR case in the above observer then there's no need to handle it here
          console.log(error);
          // verificationId is attached to error if required
          console.log(error.verificationId);
        }, (phoneAuthSnapshot) => {
          console.log(phoneAuthSnapshot);
        });

    // firebase.auth().onAuthStateChanged((user) => {
    //     console.log('user iss', user);
    //     //  this.setState({
    //     //  loading: false,
    //     //   user,
    //     // });
    //   });
    // firebase.auth().onAuthStateChanged(user => {
    //     this.props.navigation.navigate(user ? 'Main' : 'SignUp')
    //   });
    // console.log(firebase.auth.PhoneAuthProvider((response)=>{
    //     console.log(response,'response')
    // }))
    
    

    // this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({ user: user.toJSON() });
    //   } else {
    //     // User has been signed out, reset the state
    //     this.setState({
    //       user: null,
    //       message: '',
    //       codeInput: '',
    //       phoneNumber: '+91',
    //       confirmResult: null,
    //     });
    //   }
    // });
  }

  componentWillUnmount() {
    //  if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...' });

        (phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  }
  
  renderPhoneNumberInput() {
   const { phoneNumber } = this.state;
      
    return (
      <View style={{ padding: 25 }}>
        <Text>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder={'Phone number ... '}
          value={phoneNumber}
        />
        <Button title="Sign In" color="green" onPress={this.signIn} />
      </View>
    );
  }
  
  renderMessage() {
    const { message } = this.state;
  
    if (!message.length) return null;
  
    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }
  
  renderVerificationCodeInput() {
    const { codeInput } = this.state;
  
    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1 }}>
        
        {!user && !confirmResult && this.renderPhoneNumberInput()}
        
        {this.renderMessage()}
        
        {!user && confirmResult && this.renderVerificationCodeInput()}
        
        {user && (
          <View
            style={{
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#77dd77',
              flex: 1,
            }}
          >
            <Image source={{ uri: successImageUri }} style={{ width: 100, height: 100, marginBottom: 25 }} />
            <Text style={{ fontSize: 25 }}>Signed In!</Text>
            <Text>{JSON.stringify(user)}</Text>
            <Button title="Sign Out" color="red" onPress={this.signOut} />
          </View>
        )}
      </View>
    );
  }
}