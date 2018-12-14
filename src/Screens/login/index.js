import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import styles from "./styles";
import SignIn from "../../images/SignIn.png";
import FloatLabelTextField from "../../common/FloatLabelTextField";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.updateForm = this.updateForm.bind(this);
  }
  updateForm(value, type) {
    this.setState({ [type]: value });
  }
  validate(type) {
    if (type === "email") {
      this.setState({
        email: ""
      });
    } else if (type === "password")
      this.setState({
        password: ""
      });
  }
  render() {
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <View style={{ marginTop: deviceHeight * 0.08 }}>
          <Text style={styles.textStyle}>LOGIN</Text>
        </View>
        <View
          style={{
            marginTop: deviceHeight * 0.1
          }}
        >
          <Image source={SignIn} style={styles.signInImageStyle} />
        </View>
        <View style={{ marginTop: deviceHeight * 0.01 }}>
          <Text style={styles.signInTextStyle}>Sign in to continue</Text>
        </View>
        <View style={styles.emailTextFieldStyle}>
          <FloatLabelTextField
            type="email"
            placeholder="Email"
            autoCorrect={false}
            value={this.state.email}
            updateForm={this.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={deviceWidth * 0.73}
            validate={type => this.validate(type)}
          />
        </View>
        <View style={styles.passwordTextFieldStyle}>
          <FloatLabelTextField
            type="password"
            placeholder="Password"
            autoCorrect={false}
            value={this.state.password}
            updateForm={this.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={deviceWidth * 0.73}
            validate={type => this.validate(type)}
          />
        </View>
        <View style={{ marginTop: deviceHeight * 0.08 }}>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: deviceHeight * 0.03 }}>
          <Text style={styles.textStyle}>Forgot Password</Text>
        </View>
        <View style={styles.bottomTextViewStyle}>
          <Text style={styles.bottomTextStyle}>Sign Up for an account</Text>
        </View>
      </View>
    );
  }
}
