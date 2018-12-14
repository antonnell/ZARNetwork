import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  Dimensions,
  StatusBar,
  Button,
  TouchableHighlight,
  ViewStyle
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TouchID from "react-native-touch-id";
import PINCode from "@haskkor/react-native-pincode";

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
    console.log("isTouchIdisTouchId", this.state.isTouchId);
    return this.state.isTouchId ? (
      <View style={styles.Container}>
        <TouchableHighlight onPress={this._pressHandler}>
          <Text>Authenticate with Touch ID</Text>
        </TouchableHighlight>
      </View>
    ) : (
      // <View style={styles.Container}>
      //   <StatusBar barStyle="light-content" backgroundColor="black" />
      //   <View style={{ marginTop: deviceHeight * 0.08 }}>
      //     <Text style={styles.textStyle}>LOGIN</Text>
      //   </View>
      //   <View style={{ marginTop: deviceHeight * 0.08 }}>
      //     <MaterialCommunityIcons
      //       name="lock-outline"
      //       size={40}
      //     />
      //   </View>
      //   <View style={{ marginTop: deviceHeight * 0.001 }}>
      <PINCode
        status={"choose"}
        bottomLeftComponent={<Text>Forgot PIN?</Text>}
        //buttonComponentLockedPage={<Button>Log In</Button>}
        titleChoose="Enter your 4 digit PIN"
        //subtitleChoose=""
        colorPassword="rgb(0, 169, 252)"
        styleLockScreenColorIcon="email-outline"
        stylePinCodeColorTitle="rgb(1,1,1)"
        stylePinCodeColorSubtitle="red"
        stylePinCodeColorTitleError="red"
        buttonDeleteText="Remove"
        textPasswordVisibleFamily="red"
        stylePinCodeButtonNumber="red"
        styleLockScreenButton={<ViewStyle />}
        colorPasswordError="red"
        textPasswordVisibleSize={1}
        styleLockScreenSizeIcon={1}
        titleConfirmFailed="4 digit PIN don't match"
        stylePinCodeHiddenPasswordSizeFull={10}
        stylePinCodeHiddenPasswordSizeEmpty={10}
        styleLockScreenColorIcon="blue"
        titleConfirm="Confirm your 4 digit PIN"
        stylePinCodeDeleteButtonColorHideUnderlay="rgb(0,0,0)"
        stylePinCodeDeleteButtonColorShowUnderlay="black"
        numbersButtonOverlayColor="rgb(0, 169, 252)"
      />
      //   </View>
      // </View>
    );
  }
}

export default HomeScreen;
