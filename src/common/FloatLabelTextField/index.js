/* eslint-disable */
// libraries
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Reference from '../../images/Reference.png';
import Email from '../../images/Email.png';
import Password from '../../images/Password.png';
import Mobile from '../../images/Mobile.png';
import AccountNumber from '../../images/AccountNumber.png';
// Styling
import styles from './styles';

const deviceHeight = Dimensions.get('window').height;

class FloatingLabel extends Component {
  constructor(props) {
    super(props);
    const { visible } = this.props;
    let initialPadding = 9;
    let initialOpacity = 0;
    if (visible) {
      initialPadding = 5;
      initialOpacity = 1;
    }

    this.state = {
      paddingAnim: new Animated.Value(initialPadding),
      opacityAnim: new Animated.Value(initialOpacity),
    };
  }

  componentWillReceiveProps(newProps) {
    const { paddingAnim, opacityAnim } = this.state;
    Animated.timing(paddingAnim, {
      toValue: newProps.visible ? 3 : 9,
      duration: 150,
    }).start();

    return Animated.timing(opacityAnim, {
      toValue: newProps.visible ? 1 : 0,
      duration: 150,
    }).start();
  }

  render() {
    const { paddingAnim, opacityAnim } = this.state;
    const { children } = this.props;
    return (
      <Animated.View
        style={[
          styles.floatingLabel,
          {
            height: 80,
            paddingTop: paddingAnim,
            opacity: opacityAnim,
            paddingLeft: 10,
          },
        ]}
      >
        {children}
      </Animated.View>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class TextFieldHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginAnim: new Animated.Value(this.props.withValue ? 10 : 0),
    };
  }

  componentWillReceiveProps(newProps) {
    const { marginAnim } = this.state;
    return Animated.timing(marginAnim, {
      toValue: newProps.withValue ? 10 : 0,
      duration: 150,
    }).start();
  }

  render() {
    const { children } = this.props;
    const { marginAnim } = this.state;
    return <Animated.View style={{ marginTop: marginAnim }}>{children}</Animated.View>;
  }
}

class FloatLabelTextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      text: '',
      showPassword: false,
      passwordIcon: 'lock-outline', // "visibility-off",
      error: '',
    };
    this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
    this.checkType = this.checkType.bind(this);
    this.errorDisplay = this.errorDisplay.bind(this);
    this.iconDisplay = this.iconDisplay.bind(this);
  }

  onEndEditing(value, type) {
    const { confirm, updateForm } = this.props;
    if (!confirm) {
      updateForm(value, type);
      setTimeout(() => this.validate(value, type), 5);
    }
  }

  onChangeTextHandler(value, type) {
    const { email, updateForm } = this.props;
    if (type === 'password') {
      if (email === '') {
        updateForm(value, type);
        setTimeout(() => this.validate(value, type), 10);
        this.setState({
          text: value,
          error: '',
          password: value,
        });
      } else {
        updateForm(value, type);
        this.setState({
          text: value,
          error: '',
          password: value,
        });
      }
    }

    if (type === 'number') {
      this.setState({
        text: value,
        phoneNumber: value,
      });
      updateForm(value, 'phoneNumber');
    }
    if (type === 'account') {
      this.setState({
        text: value,
        accountNumber: value,
      });
      updateForm(value, 'accountNumber');
    }
    if (type === 'reference') {
      this.setState({
        text: value,
        reference: value,
      });
      updateForm(value, 'reference');
    }

    if (type === 'email') {
      this.setState({
        text: value,
        email: value,
      });
      updateForm(value, type);
    }
    if (type === 'username') {
      this.setState({
        text: value,
        email: value,
      });
      updateForm(value, type);
    }
    if (type === 'confirmPassword') {
      this.setState({
        text: value,
        error: '',
        password: value,
      });
      updateForm(value, type);
    }
    if (type === 'accountName') {
      this.setState({
        text: value,
        error: '',
      });
      updateForm(value, type);
    }
  }

  setFocus() {
    this.setState({
      focused: true,
    });
  }

  setShowPassword() {
    const { showPassword } = this.state;
    let passwordIconName = 'visibility-off';
    if (!showPassword) {
      passwordIconName = 'visibility';
    }
    this.setState({
      passwordIcon: passwordIconName,
      showPassword: !showPassword,
    });
  }

  clearState() {
    this.setState({
      text: '',
      error: '',
      password: '',
    });
  }

  validate(value, type) {
    const { email, text } = this.state;
    const { validate } = this.props;
    if (type === 'email') {
      const reg = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email !== '') {
        if (reg.test(email) === false) {
          Alert.alert('Error', 'Invalid Email');
          validate(type);
        }
      }
    } else if (type === 'username') {
      // this.props.updateForm(value, type);
    } else if (type === 'confirmPassword') {
      // this.props.updateForm(value, type);
      validate(type);
    } else if (type === 'password') {
      validate(type);
      // this.props.updateForm(value, type);
    } else if (type === 'number') {
      validate(type);
      // this.props.updateForm(value, type);
    } else if (type === 'reference') {
      validate(type);
    } else if (type === 'account') {
      validate(type);
    } else if (type === 'accountName') {
      if (text === '') {
        Alert.alert('Error', 'Account name cannot be empty');
        validate(type);
      }
    } else {
      Alert.alert('Error', 'Enter Email First');
      validate(type);
    }
  }

  placeholderValue(placeholder) {
    return placeholder;
  }

  labelStyle() {
    const { focused } = this.state;
    const { labelColor } = this.props;
    if (focused) {
      if (labelColor) return styles.focused;
    } else {
      return styles.focused;
    }
  }

  unsetFocus() {
    this.setState({
      focused: false,
    });
  }

  withBorder() {
    const { noBorder } = this.props;
    if (!noBorder) {
      return styles.withBorder;
    }
  }

  emailField() {
    const { text } = this.state;
    const {
      placeholder,
      autoCorrect,
      inputBackgroundColor,
      textFieldSize,
      defaultValue,
      value,
      maxLength,
      type,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={text}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>
                {this.placeholderValue(placeholder)}
              </Text>
            </FloatingLabel>
            <TextFieldHolder withValue={text}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.iconStyle}>{this.iconDisplay()}</View>

                <TextInput
                  {...this.props}
                  ref="input"
                  autoCorrect={autoCorrect}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  style={[
                    styles.valueText,
                    {
                      backgroundColor: inputBackgroundColor,
                      width: textFieldSize,
                    },
                  ]}
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.unsetFocus()}
                  onChangeText={text => this.onChangeTextHandler(text, type)}
                  placeholderTextColor="grey"
                  keyboardType="default"
                  onEndEditing={() => this.onEndEditing(text, type)}
                />
              </View>
            </TextFieldHolder>
          </View>
        </View>
        <View style={styles.underlineStyling} />
      </View>
    );
  }

  accountNameField() {
    const { text } = this.state;
    const {
      placeholder,
      autoCorrect,
      inputBackgroundColor,
      textFieldSize,
      defaultValue,
      value,
      maxLength,
      type,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={text}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>
                {this.placeholderValue(placeholder)}
              </Text>
            </FloatingLabel>
            <TextFieldHolder withValue={text}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.iconStyle}>{this.iconDisplay()}</View>

                <TextInput
                  {...this.props}
                  ref="input"
                  autoCorrect={autoCorrect}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  style={[
                    styles.valueText,
                    {
                      backgroundColor: inputBackgroundColor,
                      width: textFieldSize,
                    },
                  ]}
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.unsetFocus()}
                  onChangeText={text1 => this.onChangeTextHandler(text1, type)}
                  placeholderTextColor="grey"
                  keyboardType="default"
                  onEndEditing={() => this.onEndEditing(text, type)}
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
    const { type } = this.props;
    if (type && type !== '' && type !== undefined) {
      if (type === 'email') {
        return (
          <View>
            <Image source={Email} style={{ resizeMode: 'contain', height: deviceHeight * 0.02 }} />
          </View>
        );
      }
      if (type === 'username') {
        return (
          <View>
            <MaterialCommunityIcons name="person-outline" size={20} />
          </View>
        );
      }
      if (type === 'number') {
        return (
          <View>
            <Image
              source={Mobile}
              style={{ resizeMode: 'contain', height: deviceHeight * 0.03, color: 'black' }}
            />
          </View>
        );
      }
      if (type === 'account') {
        return (
          <View>
            <Image
              source={AccountNumber}
              style={{ resizeMode: 'contain', height: deviceHeight * 0.03, color: 'black' }}
            />
          </View>
        );
      }
      if (type === 'reference') {
        return (
          <View>
            <Image
              source={Reference}
              style={{ resizeMode: 'contain', height: deviceHeight * 0.03, color: 'black' }}
            />
          </View>
        );
      }
    }
  }

  mobileField() {
    const { text } = this.state;
    const {
      placeholder,
      autoCorrect,
      inputBackgroundColor,
      textFieldSize,
      defaultValue,
      value,
      maxLength,
      type,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={text}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>
                {this.placeholderValue(placeholder)}
              </Text>
            </FloatingLabel>

            <TextFieldHolder withValue={text}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.iconStyle}>{this.iconDisplay()}</View>
                <TextInput
                  {...this.props}
                  ref="input"
                  autoCorrect={autoCorrect}
                  underlineColorAndroid="transparent"
                  style={[
                    styles.valueText,
                    {
                      backgroundColor: inputBackgroundColor,
                      width: textFieldSize,
                    },
                  ]}
                  keyboardType="numeric"
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.unsetFocus()}
                  onChangeText={text => this.onChangeTextHandler(text, type)}
                  placeholderTextColor="grey"
                  keyboardType="default"
                  maxLength={21}
                  autoCapitalize="none"
                />
              </View>
            </TextFieldHolder>
          </View>
        </View>
        <View style={styles.underlineStyling} />
      </View>
    );
  }

  passwordField() {
    const { text, passwordIcon, showPassword } = this.state;
    const {
      placeholder,
      autoCorrect,
      inputBackgroundColor,
      textFieldSize,
      defaultValue,
      value,
      maxLength,
      type,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={text}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>
                {this.placeholderValue(placeholder)}
              </Text>
            </FloatingLabel>

            <TextFieldHolder withValue={text}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.iconStyle} onPress={() => this.setShowPassword()}>
                  <Image
                    source={Password}
                    style={{ resizeMode: 'contain', height: deviceHeight * 0.03 }}
                  />
                </TouchableOpacity>
                <TextInput
                  {...this.props}
                  ref="input"
                  autoCorrect={autoCorrect}
                  underlineColorAndroid="transparent"
                  style={[
                    styles.valueText,
                    {
                      backgroundColor: inputBackgroundColor,
                      width: textFieldSize,
                    },
                  ]}
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.unsetFocus()}
                  onChangeText={text => this.onChangeTextHandler(text, type)}
                  placeholderTextColor="grey"
                  keyboardType="default"
                  secureTextEntry={!showPassword}
                  maxLength={21}
                  autoCapitalize="none"
                  onEndEditing={() => this.onEndEditing(text, type)}
                />
              </View>
            </TextFieldHolder>
          </View>
        </View>
        <View style={styles.underlineStyling} />
      </View>
    );
  }

  accountField() {
    const { text } = this.state;
    const {
      placeholder,
      autoCorrect,
      inputBackgroundColor,
      textFieldSize,
      defaultValue,
      value,
      maxLength,
      type,
      rightTextStyle,
      isShowRightText,
      rightTextValue,
      rightTextValueStyle,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={text}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>
                {this.placeholderValue(placeholder)}
              </Text>
            </FloatingLabel>

            <TextFieldHolder withValue={text}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.iconStyle}>{this.iconDisplay()}</View>
                <TextInput
                  {...this.props}
                  ref="input"
                  autoCorrect={autoCorrect}
                  underlineColorAndroid="transparent"
                  style={[
                    styles.valueText,
                    {
                      backgroundColor: inputBackgroundColor,
                      width: textFieldSize,
                    },
                  ]}
                  keyboardType="numeric"
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.unsetFocus()}
                  onChangeText={text => this.onChangeTextHandler(text, type)}
                  placeholderTextColor="grey"
                  keyboardType="default"
                  maxLength={21}
                  autoCapitalize="none"
                />
                {isShowRightText && (
                  <View style={rightTextStyle}>
                    <Text style={rightTextValueStyle}>{rightTextValue}</Text>
                  </View>
                )}
              </View>
            </TextFieldHolder>
          </View>
        </View>
        <View style={styles.underlineStyling} />
      </View>
    );
  }

  refernceField() {
    const { text } = this.state;
    const {
      placeholder,
      autoCorrect,
      inputBackgroundColor,
      textFieldSize,
      defaultValue,
      value,
      maxLength,
      type,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={text}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>
                {this.placeholderValue(placeholder)}
              </Text>
            </FloatingLabel>

            <TextFieldHolder withValue={text}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.iconStyle}>{this.iconDisplay()}</View>
                <TextInput
                  {...this.props}
                  ref="input"
                  autoCorrect={autoCorrect}
                  underlineColorAndroid="transparent"
                  style={[
                    styles.valueText,
                    {
                      backgroundColor: inputBackgroundColor,
                      width: textFieldSize,
                    },
                  ]}
                  keyboardType="numeric"
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.unsetFocus()}
                  onChangeText={text => this.onChangeTextHandler(text, type)}
                  placeholderTextColor="grey"
                  keyboardType="default"
                  maxLength={21}
                  autoCapitalize="none"
                />
              </View>
            </TextFieldHolder>
          </View>
        </View>
        <View style={styles.underlineStyling} />
      </View>
    );
  }

  checkType() {
    const { type } = this.props;
    if (type && type !== '' && type !== undefined) {
      if (type === 'username' || type === 'email') {
        return <View>{this.emailField()}</View>;
      }
      if (type === 'password' || type === 'confirmPassword') {
        return <View>{this.passwordField()}</View>;
      }
      if (type === 'number') {
        return <View>{this.mobileField()}</View>;
      }
      if (type === 'account') {
        return <View>{this.accountField()}</View>;
      }
      if (type === 'reference') {
        return <View>{this.refernceField()}</View>;
      }
      if (type === 'accountName') {
        return <View>{this.accountNameField()}</View>;
      }
    }
  }

  errorDisplay() {
    const { error } = this.state;
    if (error !== '' && error !== undefined) {
      return (
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.passwordError}>{error}</Text>
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
