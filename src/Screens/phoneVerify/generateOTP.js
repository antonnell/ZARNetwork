import React, { Component } from "React";
import styles from "./styles";
import { View, Text, StatusBar, Dimensions } from "react-native";
import DesignButton from "../../common/Button";
import FloatLabelTextField from "../../common/FloatLabelTextField";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class GenerateOTP extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <View style={{ marginTop: deviceHeight * 0.08 }}>
          <Text style={styles.textStyle}>ONE TIME PIN</Text>
        </View>
        <View style={{ marginTop: deviceHeight * 0.1 }}>
          <Text style={styles.infoTextStyle}>
            Enter your mobile number and tap next to enter the code we send you
            via SMS
          </Text>
        </View>
        <View style={styles.mobileTextFieldStyle}>
          <FloatLabelTextField
            type="number"
            placeholder="Mobile Number"
            autoCorrect={false}
            value={this.props.phoneNumber}
            updateForm={this.props.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={deviceWidth * 0.73}
            validate={type => this.props.validate(type)}
          />
        </View>
        <View style={{ marginTop: deviceHeight * 0.04 }}>
          <DesignButton name="Next " callMethod={this.props.signIn} />
        </View>
      </View>
    );
  }
}
