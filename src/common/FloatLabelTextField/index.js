//libraries
import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  Alert
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//Styling
import styles from "./styles";

class FloatingLabel extends Component {
  constructor(props) {
    super(props);

    let initialPadding = 9;
    let initialOpacity = 0;
    if (this.props.visible) {
      initialPadding = 5;
      initialOpacity = 1;
    }

    this.state = {
      paddingAnim: new Animated.Value(initialPadding),
      opacityAnim: new Animated.Value(initialOpacity)
    };
  }

  componentWillReceiveProps(newProps) {
    Animated.timing(this.state.paddingAnim, {
      toValue: newProps.visible ? 3 : 9,
      duration: 150
    }).start();

    return Animated.timing(this.state.opacityAnim, {
      toValue: newProps.visible ? 1 : 0,
      duration: 150
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.floatingLabel,
          {
            height: 80,
            paddingTop: this.state.paddingAnim,
            opacity: this.state.opacityAnim,
            paddingLeft: 10
          }
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class TextFieldHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginAnim: new Animated.Value(this.props.withValue ? 10 : 0)
    };
  }

  componentWillReceiveProps(newProps) {
    return Animated.timing(this.state.marginAnim, {
      toValue: newProps.withValue ? 10 : 0,
      duration: 150
    }).start();
  }

  render() {
    return (
      <Animated.View style={{ marginTop: this.state.marginAnim }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class FloatLabelTextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      text: "",
      showPassword: false,
      passwordIcon: "lock-outline", //"visibility-off",
      error: ""
    };
    this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
    this.checkType = this.checkType.bind(this);
    this.errorDisplay = this.errorDisplay.bind(this);
    this.iconDisplay = this.iconDisplay.bind(this);
  }

  setFocus() {
    this.setState({
      focused: true
    });
  }

  unsetFocus() {
    this.setState({
      focused: false
    });
  }

  labelStyle() {
    if (this.state.focused) {
      if (this.props.labelColor) return styles.focused;
    } else {
      return styles.focused;
    }
  }

  placeholderValue(placeholder) {
    return placeholder;
  }

  validate(value, type) {
    if (type === "email") {
      let reg = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.state.email != "") {
        if (reg.test(this.state.email) === false) {
          Alert.alert("Error", "Invalid Email");
          this.props.validate(type);
        }
      }
    } else if (type === "username") {
      this.props.updateForm(value, type);
    } else if (type === "confirmPassword") {
      this.props.updateForm(value, type);
    } else if (type === "number") {
      this.props.updateForm(value, type);
    } else {
      Alert.alert("Error", "Enter Email First");
      this.props.validate(type);
    }
  }
  onEndEditing(value, type) {
    if (!this.props.confirm) {
      this.props.updateForm(value, type);
      setTimeout(() => this.validate(value, type), 5);
    }
  }

  clearState() {
    this.setState({
      text: "",
      error: "",
      password: ""
    });
  }

  onChangeTextHandler(value, type) {
    if (type === "password") {
      if (this.props.email === "") {
        this.props.updateForm(value, type);
        setTimeout(() => this.validate(value, type), 10);
        this.setState({
          text: value,
          error: "",
          password: value
        });
      } else {
        this.props.updateForm(value, type);
        this.setState({
          text: value,
          error: "",
          password: value
        });
      }
    }

    if (type === "number") {
      this.setState({
        text: value,
        phoneNumber: value
      });
      this.props.updateForm(value, "phoneNumber");
    }

    if (type === "email") {
      this.setState({
        text: value,
        email: value
      });
      this.props.updateForm(value, type);
    }
    if (type === "username") {
      this.setState({
        text: value,
        email: value
      });
      this.props.updateForm(value, type);
    }
    if (type === "confirmPassword") {
      this.setState({
        text: value,
        error: "",
        password: value
      });
      this.props.updateForm(value, type);
    }
  }
  setShowPassword() {
    const { showPassword } = this.state;
    let passwordIconName = "visibility-off";
    if (!showPassword) {
      passwordIconName = "visibility";
    }
    this.setState({
      passwordIcon: passwordIconName,
      showPassword: !showPassword
    });
  }

  withBorder() {
    if (!this.props.noBorder) {
      return styles.withBorder;
    }
  }

  emailField() {
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={this.state.text}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>
                {this.placeholderValue(this.props.placeholder)}
              </Text>
            </FloatingLabel>
            <TextFieldHolder withValue={this.state.text}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.iconStyle}>{this.iconDisplay()}</View>

                <TextInput
                  {...this.props}
                  ref="input"
                  autoCorrect={this.props.autoCorrect}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  style={[
                    styles.valueText,
                    {
                      backgroundColor: this.props.inputBackgroundColor,
                      width: this.props.textFieldSize
                    }
                  ]}
                  defaultValue={this.props.defaultValue}
                  value={this.props.value}
                  maxLength={this.props.maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.unsetFocus()}
                  onChangeText={text =>
                    this.onChangeTextHandler(text, this.props.type)
                  }
                  placeholderTextColor="grey"
                  keyboardType="default"
                  onEndEditing={() =>
                    this.onEndEditing(this.state.text, this.props.type)
                  }
                />
              </View>
            </TextFieldHolder>
          </View>
        </View>
        <View style={styles.underlineStyling} />
      </View>
    );
  }
  iconDisplay() {
    if (
      this.props.type &&
      this.props.type !== "" &&
      this.props.type !== undefined
    ) {
      if (this.props.type === "email") {
        return (
          <View>
            <MaterialCommunityIcons name="email-outline" size={20} />
          </View>
        );
      }
      if (this.props.type === "username") {
        return (
          <View>
            <MaterialCommunityIcons name="person-outline" size={20} />
          </View>
        );
      }
      if (this.props.type === "number") {
        return (
          <View>
            <MaterialCommunityIcons name="cellphone" size={20} />
          </View>
        );
      }
    }
  }
  mobileField() {
    {
      return (
        <View style={styles.container}>
          <View style={styles.viewContainer}>
            <View style={[styles.fieldContainer, this.withBorder()]}>
              <FloatingLabel visible={this.state.text}>
                <Text style={[styles.fieldLabel, this.labelStyle()]}>
                  {this.placeholderValue(this.props.placeholder)}
                </Text>
              </FloatingLabel>

              <TextFieldHolder withValue={this.state.text}>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.iconStyle}>{this.iconDisplay()}</View>
                  <TextInput
                    {...this.props}
                    ref="input"
                    autoCorrect={this.props.autoCorrect}
                    underlineColorAndroid="transparent"
                    style={[
                      styles.valueText,
                      {
                        backgroundColor: this.props.inputBackgroundColor,
                        width: this.props.textFieldSize
                      }
                    ]}
                    keyboardType={"numeric"}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
                    maxLength={this.props.maxLength}
                    onFocus={() => this.setFocus()}
                    onBlur={() => this.unsetFocus()}
                    onChangeText={text =>
                      this.onChangeTextHandler(text, this.props.type)
                    }
                    placeholderTextColor="grey"
                    keyboardType="default"
                    //secureTextEntry={!this.state.showPassword}
                    maxLength={21}
                    autoCapitalize="none"
                  />
                  {/* <TouchableOpacity
                  style={styles.iconStyle}
                  onPress={() => this.setShowPassword()}
                >
                  <MaterialIcon name={this.state.passwordIcon} size={20} />
                </TouchableOpacity> */}
                </View>
              </TextFieldHolder>
            </View>
          </View>
          <View style={styles.underlineStyling} />
        </View>
      );
    }
  }

  passwordField() {
    {
      return (
        <View style={styles.container}>
          <View style={styles.viewContainer}>
            <View style={[styles.fieldContainer, this.withBorder()]}>
              <FloatingLabel visible={this.state.text}>
                <Text style={[styles.fieldLabel, this.labelStyle()]}>
                  {this.placeholderValue(this.props.placeholder)}
                </Text>
              </FloatingLabel>

              <TextFieldHolder withValue={this.state.text}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.iconStyle}
                    onPress={() => this.setShowPassword()}
                  >
                    <MaterialCommunityIcons
                      name={this.state.passwordIcon}
                      size={20}
                    />
                  </TouchableOpacity>
                  <TextInput
                    {...this.props}
                    ref="input"
                    autoCorrect={this.props.autoCorrect}
                    underlineColorAndroid="transparent"
                    style={[
                      styles.valueText,
                      {
                        backgroundColor: this.props.inputBackgroundColor,
                        width: this.props.textFieldSize
                      }
                    ]}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
                    maxLength={this.props.maxLength}
                    onFocus={() => this.setFocus()}
                    onBlur={() => this.unsetFocus()}
                    onChangeText={text =>
                      this.onChangeTextHandler(text, this.props.type)
                    }
                    placeholderTextColor="grey"
                    keyboardType="default"
                    secureTextEntry={!this.state.showPassword}
                    maxLength={21}
                    autoCapitalize="none"
                  />
                  {/* <TouchableOpacity
                  style={styles.iconStyle}
                  onPress={() => this.setShowPassword()}
                >
                  <MaterialIcon name={this.state.passwordIcon} size={20} />
                </TouchableOpacity> */}
                </View>
              </TextFieldHolder>
            </View>
          </View>
          <View style={styles.underlineStyling} />
        </View>
      );
    }
  }
  checkType() {
    if (
      this.props.type &&
      this.props.type !== "" &&
      this.props.type !== undefined
    ) {
      if (this.props.type == "username" || this.props.type == "email") {
        return <View>{this.emailField()}</View>;
      }
      if (
        this.props.type == "password" ||
        this.props.type == "confirmPassword"
      ) {
        return <View>{this.passwordField()}</View>;
      }
      if (this.props.type === "number") {
        return <View>{this.mobileField()}</View>;
      }
    }
  }
  errorDisplay() {
    if (this.state.error !== "" && this.state.error !== undefined) {
      return (
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.passwordError}>{this.state.error}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View>
        {this.checkType()}

        {this.errorDisplay()}
      </View>
    );
  }
}

export default FloatLabelTextField;
