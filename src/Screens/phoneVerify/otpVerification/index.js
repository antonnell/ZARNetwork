import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import CustomisedButton from "../../../common/Button";
import OtpInputs from "react-native-otp-inputs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class OtpVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  nextClick() {
    console.log("nextClick");
  }
  resendOTP() {
    console.log("resendOTP");
  }

  render() {
    return (
      <View style={styles.Container}>
        <View
          style={{
            width: deviceWidth,
            alignItems: "center",
            marginTop: deviceHeight * 0.1,
            flexDirection: "row"
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
            height: deviceHeight * 0.13
          }}
        >
          <OtpInputs
            handleChange={code => console.log(code)}
            numberOfInputs={6}
            keyboardType={"numeric"}
            inputContainerStyles={{
              backgroundColor: "#fff",
              margin: 7,
              height: 40
            }}
            inputStyles={{ color: "#000", width: 30, fontSize: 14 }}
            focusedBorderColor={"rgb(0,177,251)"}
            unFocusedBorderColor={"rgb(0,177,251)"}
          />
        </View>
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <CustomisedButton name="Next" callMethod={() => this.nextClick()} />
          <TouchableOpacity
            onPress={() => this.resendOTP()}
            style={styles.resendBtnMainView}
          >
            <Text style={styles.resenOtpTextStyle}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
