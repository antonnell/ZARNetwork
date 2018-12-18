import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableHighlight
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import DesignButton from "../../common/Button";
import styles from "./styles";
import TouchID from "react-native-touch-id";
import GeneratePinCode from "../../common/PinCode";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouchId: false
    };
    TouchID.isSupported()
      .then(res => {
        console.log("res is", res);
        if (res === "TouchID") {
          this.setState({
            isTouchId: true
          });
        }
      })
      .catch(err => {
        console.log("err is", err);
      });
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
    return this.state.isTouchId ? (
      <View style={styles.Container}>
        <TouchableHighlight onPress={this._pressHandler}>
          <Text>Authenticate with Touch ID</Text>
        </TouchableHighlight>
      </View>
    ) : (
      <View style={styles.Container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <View style={{ marginTop: deviceHeight * 0.06 }}>
          <Text style={styles.textStyle}>LOGIN</Text>
        </View>

        <View style={styles.dialerView}>
          <View style={{ marginTop: deviceHeight * 0.06 }}>
            <EvilIcons name="lock" size={48} />
          </View>
          <GeneratePinCode />
        </View>

        <View style={styles.loginButtonView}>
          <DesignButton name="Log In" />
          <Text style={styles.termTextStyle}>{"Term & Condition"}</Text>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
