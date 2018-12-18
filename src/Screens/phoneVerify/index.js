import React, { Component } from "react";
import styles from "./styles";
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Button
} from "react-native";
// import { View, Button, Text, TextInput, Image, Alert } from "react-native";
import firebase from "react-native-firebase";
import GenerateOTP from "./generateOTP";

const successImageUri = "";
export default class PhoneAuthTest extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: "",
      codeInput: "",
      phoneNumber: "+91",
      confirmResult: null,
      verificationId: ""
    };
    this.updateForm = this.updateForm.bind(this);
  }
  updateForm(value, type) {
    console.log("updateForm", value, type);
    this.setState({ [type]: value });
  }
  sendVerificationCode() {
    const { phoneNumber } = this.state;
    var config = {
      appId: "1:888539243135:ios:35169b268735df00",
      clientId:
        "888539243135-m8ev3lim2ljfhmkgiu637atp6qrdu5c9.apps.googleusercontent.com",
      apiKey: "AIzaSyD96UPaU0z1WN4ikxLhVfTtTxYT2_DM_6Y", //"<API_KEY>",
      authDomain: "fantompay-b6de5.firebaseapp.com", //"<PROJECT_ID>.firebaseapp.com",
      databaseURL: "https://fantompay-b6de5.firebaseio.com", //"https://<DATABASE_NAME>.firebaseio.com",
      projectId: "fantompay-b6de5", //"<PROJECT_ID>",
      storageBucket: "fantompay-b6de5.appspot.com", //"<BUCKET>.appspot.com",
      messagingSenderId: "888539243135" //"<SENDER_ID>",
    };
    firebase.initializeApp(config);
    console.log(firebase, "124");
    firebase
      .auth()
      .verifyPhoneNumber(phoneNumber)
      .on(
        "state_changed",
        phoneAuthSnapshot => {
          console.log("phone number is ", phoneAuthSnapshot);
          switch (phoneAuthSnapshot.state) {
            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
              console.log("code sent");
              this.setState({
                verificationId: phoneAuthSnapshot.verificationId
              });
              break;
            case firebase.auth.PhoneAuthState.ERROR: // or 'error'
              console.log("verification error");
              console.log(phoneAuthSnapshot.error);
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
              console.log("auto verify on android timed out");
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
              console.log("auto verified on android");
              console.log(phoneAuthSnapshot);
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
  validate(type) {
    if (type === "number") {
      this.setState({
        phoneNumber: "+91"
      });
    }
  }

  signIn() {
    const { phoneNumber } = this.state;
    console.log("phone number is", phoneNumber);
    if (phoneNumber.length > 3) {
      this.setState({ message: "Sending code ...", confirmResult: true });
      this.sendVerificationCode();
    } else {
      Alert.alert("Please Enter the phone number.");
    }
  }

  confirmCode = () => {
    const { codeInput, verificationId } = this.state;
    if (verificationId && codeInput.length) {
      var credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        codeInput
      );
      console.log("credentialcredential", credential);
      console.log(
        "result is",
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(response => {
            console.log(response, "response");
          })
          .catch(error => {
            console.log(error, "error");
          })
      );
      return firebase.auth().signInWithCredential(credential);
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      <GenerateOTP
        phoneNumber={this.state.phoneNumber}
        updateForm={this.updateForm}
        signIn={() => this.signIn()}
        validate={this.validate}
        navigation={this.props.navigation}
      />
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: "#000", color: "#fff" }}>
        {message}
      </Text>
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
          placeholder={"Code ... "}
          value={codeInput}
        />
        <Button
          title="Confirm Code"
          color="#841584"
          onPress={this.confirmCode}
        />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;

    console.log(this.state, "render");
    return (
      <View style={{ flex: 1 }}>
        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}

        {user && (
          <View
            style={{
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#77dd77",
              flex: 1
            }}
          >
            <Image
              source={{ uri: successImageUri }}
              style={{ width: 100, height: 100, marginBottom: 25 }}
            />
            <Text style={{ fontSize: 25 }}>Signed In!</Text>
            <Text>{JSON.stringify(user)}</Text>
            <Button title="Sign Out" color="red" onPress={this.signOut} />
          </View>
        )}
      </View>
    );
  }
}
