import React, { Component } from "react";
import { Alert, View, Text, TouchableHighlight } from "react-native";
import styles from "./styles";
//var TouchID = require("react-native-touch-id");
import TouchID from "react-native-touch-id";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  _pressHandler() {
    const optionalConfigObject = {
      title: "Authentication Required", // Android
      imageColor: "#e00606", // Android
      imageErrorColor: "#ff0000", // Android
      sensorDescription: "Touch sensor", // Android
      sensorErrorDescription: "Failed", // Android
      cancelText: "Cancel", // Android
      fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // iOS
    };
    TouchID.authenticate(
      "to demo this react-native component",
      optionalConfigObject
    )
      .then(success => {
        Alert.alert("Authenticated Successfully");
      })
      .catch(error => {
        Alert.alert("Authentication Failed");
      });
  }
  render() {
    return (
      // <View style={styles.Container}>
      //   <Text>Fantom-Pay</Text>
      // </View>

      <View style={styles.Container}>
        {/* ... */}
        <TouchableHighlight onPress={this._pressHandler}>
          <Text>Authenticate with Touch ID</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default HomeScreen;
