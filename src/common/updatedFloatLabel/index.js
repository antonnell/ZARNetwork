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
import Web3 from 'web3';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Reference from '../../images/Reference.png';
import Email from '../../images/Email.png';
import Password from '../../images/Password.png';
import Mobile from '../../images/Mobile.png';
import AccountNumber from '../../images/AccountNumber.png';
import Wallet from '../../images/wallet.png';
import ProfileImg from '../../images/ProfileImg.png';
import { isEmailValid } from '../../utility/index';
// Styling
import styles from './styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

/**
 * @class FloatingLabel : For label floating with text input.
 */
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
      toValue: newProps.visible !== '' ? 3 : 9,
      duration: 150,
    }).start();

    return Animated.timing(opacityAnim, {
      toValue: newProps.visible !== '' ? 1 : 0,
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

/**
 * @class TextFieldHolder : For wrapper of text input.
 */
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

/**
 * @class FloatLabelTextField : Generic component for text inputs.
 */
class FloatLabelTextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      text: '',
      showPassword: false,
      passwordIcon: 'lock-outline', // "visibility-off",
      error: '',
      email: '',
      accountNumber: '',
    };

    this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
    this.checkType = this.checkType.bind(this);
    this.errorDisplay = this.errorDisplay.bind(this);
    this.iconDisplay = this.iconDisplay.bind(this);
  }

  onEndEditing(value, type) {
    // const { confirm, updateForm } = this.props;
    // if (!confirm) {
    //   updateForm(value, type);
    //   setTimeout(() => this.validate(value, type), 5);
    // }
    this.validate(value, type);
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
        });
      } else {
        updateForm(value, type);
        this.setState({
          text: value,
          error: '',
        });
      }
    }

    if (type === 'number') {
      this.setState({
        text: value,
        // phoneNumber: value,
      });
      updateForm(value, type);
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
      });
      updateForm(value, type);
    }
    if (type === 'name') {
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
    });
  }

  onBlurTextInput(value, type) {
    this.unsetFocus();
    if (type === 'email' && value === '') {
      this.setState({
        text: '',
        email: '',
      });
    } else if (type === 'username' && value === '') {
      this.setState({
        text: '',
      });
    } else if (type === 'confirmPassword' && value === '') {
      this.setState({
        text: '',
      });
    } else if (type === 'password' && value === '') {
      this.setState({
        text: '',
      });
    } else if (type === 'number' && value === '') {
      this.setState({
        text: '',
      });
    } else if (type === 'reference' && value === '') {
      this.setState({
        text: '',
      });
    } else if (type === 'account' && value === '') {
      this.setState({
        text: '',
        accountNumber: '',
      });
    } else if (type === 'name' && value === '') {
      this.setState({
        text: '',
      });
    }
  }

  validate(value, type) {
    const { email, text, accountNumber } = this.state;
    const { validate } = this.props;
    if (type === 'email') {
      if (email !== '' && email !== undefined) {
        if (isEmailValid(email) === false) {
          Alert.alert('Error', 'Invalid Email');
          validate(type);
          this.setState({
            text: '',
            email: '',
          });
        }
      }
    } else if (type === 'username') {
      // this.props.updateForm(value, type);
    } else if (type === 'confirmPassword') {
      const { passwordValue } = this.props;

      // this.props.updateForm(value, type);
      validate(type);
      if (passwordValue && passwordValue === '') {
        this.setState({
          text: '',
        });
      }
      if (passwordValue && passwordValue !== '' && passwordValue !== value) {
        this.setState({
          text: '',
        });
      }
    } else if (type === 'password') {
      if (value === '') {
        validate(type);
      }
    } else if (type === 'number') {
      validate(type);
    } else if (type === 'reference') {
      validate(type);
    } else if (type === 'account') {
      if (accountNumber !== '' && !Web3.utils.isAddress(accountNumber)) {
        Alert.alert('Error', 'Please enter valid account number.');
        validate(type);
        this.setState({
          text: '',
          accountNumber: '',
        });
      }
    } else if (type === 'name') {
      if (text === '') {
        Alert.alert('Error', 'Name field cannot be empty.');
        validate(type);
        this.setState({
          text: '',
        });
      } else {
        if (text.length > 20) {
          Alert.alert('Error', 'Number of characters cannot be more then 20.');
          validate(type);
          this.setState({
            text: '',
          });
        }
      }
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

  inputFieldProp(inputType, valueType) {
    let inputFieldSettings = {
      keyboardType: 'default',
    };
    if (inputType && inputType !== '' && valueType && valueType !== '') {
      if (inputType === 'text') {
        inputFieldSettings = {
          keyboardType: 'default',
        };
      } else if (inputType === 'number') {
        inputFieldSettings = {
          keyboardType: 'numeric',
        };
      } else if (inputType === 'email') {
        inputFieldSettings = {
          keyboardType: 'email',
        };
      } else if (inputType === 'password') {
        inputFieldSettings = {
          keyboardType: 'default',
        };
      }
    }
    return inputFieldSettings;
  }

  renderInputField() {
    const { text } = this.state;
    const {
      placeholder,
      autoCorrect,
      inputBackgroundColor,
      textFieldSize,
      defaultValue,
      value,
      maxLength,
      inputType,
      valueType,
    } = this.props;

    const inputFieldSettings = this.inputFieldProp(inputType, valueType);

    console.log('inputFieldSettings : ', inputFieldSettings);
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
                      backgroundColor: 'transparent',
                    },
                  ]}
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.onBlurTextInput(value, type)}
                  onChangeText={text => this.onChangeTextHandler(text, type)}
                  placeholderTextColor="grey"
                  keyboardType="email-address"
                  onEndEditing={() => this.onEndEditing(text, type)}
                />
              </View>
            </TextFieldHolder>
          </View>
        </View>
        {/* <View style={styles.underlineStyling} /> */}
      </View>
    );
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
                      backgroundColor: 'transparent',
                    },
                  ]}
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.onBlurTextInput(value, type)}
                  onChangeText={text => this.onChangeTextHandler(text, type)}
                  placeholderTextColor="grey"
                  keyboardType="email-address"
                  onEndEditing={() => this.onEndEditing(text, type)}
                />
              </View>
            </TextFieldHolder>
          </View>
        </View>
        {/* <View style={styles.underlineStyling} /> */}
      </View>
    );
  }

  nameField() {
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
                      backgroundColor: 'transparent',
                    },
                  ]}
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.onBlurTextInput(value, type)}
                  onChangeText={text1 => this.onChangeTextHandler(text1, type)}
                  placeholderTextColor="grey"
                  keyboardType="default"
                  onEndEditing={() => this.onEndEditing(text, type)}
                />
              </View>
            </TextFieldHolder>
          </View>
        </View>
        {/* <View style={styles.underlineStyling} /> */}
      </View>
    );
  }

  iconDisplay() {
    const { type, imageType } = this.props;
    if (type && type !== '' && type !== undefined) {
      if (type === 'email') {
        return (
          <View>
            <Image
              source={Email}
              style={{
                height: deviceHeight * 0.02,
                width: deviceWidth * 0.1,
              }}
              resizeMode="contain"
            />
          </View>
        );
      }
      if (type === 'username') {
        return (
          <View>
            <MaterialCommunityIcons
              name="person-outline"
              size={20}
              style={{
                height: deviceHeight * 0.025,
                width: deviceWidth * 0.1,
              }}
            />
          </View>
        );
      }
      if (type === 'name') {
        return (
          <View>
            <Image
              source={ProfileImg}
              style={{
                height: deviceHeight * 0.025,
                width: deviceWidth * 0.1,
              }}
              resizeMode="contain"
            />
          </View>
        );
      }
      if (type === 'password' || type === 'confirmPassword') {
        return (
          <View>
            <Image
              source={Password}
              style={{
                height: deviceHeight * 0.025,
                width: deviceWidth * 0.1,
              }}
              resizeMode="contain"
            />
          </View>
        );
      }
      if (type === 'number') {
        let imgName = Mobile;
        let imgStyle = {
          height: deviceHeight * 0.03,
          width: deviceWidth * 0.1,
        };
        if (imageType && imageType === 'amount') {
          imgName = Wallet;
        }
        return (
          <View>
            <Image source={imgName} resizeMode="contain" style={imgStyle} />
          </View>
        );
      }
      if (type === 'account') {
        return (
          <View>
            <Image
              source={AccountNumber}
              resizeMode="contain"
              style={{ height: deviceHeight * 0.03, width: deviceWidth * 0.1 }}
            />
          </View>
        );
      }
      if (type === 'reference') {
        return (
          <View>
            <Image
              resizeMode="contain"
              source={Reference}
              style={{ height: deviceHeight * 0.03, width: deviceWidth * 0.1 }}
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
      imageType,
    } = this.props;
    let keyboardType = 'phone-pad';
    if (imageType && imageType === 'amount') {
      keyboardType = 'numeric';
    }

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
                      backgroundColor: 'transparent',
                    },
                  ]}
                  keyboardType={keyboardType}
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.onBlurTextInput(value, type)}
                  onChangeText={text => this.onChangeTextHandler(text, type)}
                  placeholderTextColor="grey"
                  autoCapitalize="none"
                />
              </View>
            </TextFieldHolder>
          </View>
        </View>
        {/* <View style={styles.underlineStyling} /> */}
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
                      backgroundColor: 'transparent',
                    },
                  ]}
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.onBlurTextInput(value, type)}
                  onChangeText={text => this.onChangeTextHandler(text, type)}
                  placeholderTextColor="grey"
                  keyboardType="default"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  onEndEditing={() => this.onEndEditing(value, type)}
                />
                {/* <TouchableOpacity style={styles.iconStyle} onPress={() => this.setShowPassword()}>
                  <Image
                    source={Password}
                    resizeMode="contain"
                    style={{
                      height: deviceHeight * 0.03,
                    }}
                  />
                </TouchableOpacity> */}
              </View>
            </TextFieldHolder>
          </View>
        </View>
        {/* <View style={styles.underlineStyling} /> */}
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
      onPressRightBtn,
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
                      backgroundColor: 'transparent',
                    },
                  ]}
                  keyboardType="numeric"
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.onBlurTextInput(value, type)}
                  onChangeText={text => this.onChangeTextHandler(text, type)}
                  placeholderTextColor="grey"
                  autoCapitalize="none"
                  onEndEditing={() => this.onEndEditing(text, type)}
                />
                {isShowRightText && (
                  <TouchableOpacity style={rightTextStyle} onPress={onPressRightBtn}>
                    <Text style={rightTextValueStyle}>{rightTextValue}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TextFieldHolder>
          </View>
        </View>
        {/* <View style={styles.underlineStyling} /> */}
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
                      backgroundColor: 'transparent',
                    },
                  ]}
                  defaultValue={defaultValue}
                  value={value}
                  maxLength={maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.onBlurTextInput(value, type)}
                  onChangeText={text => this.onChangeTextHandler(text, type)}
                  placeholderTextColor="grey"
                  keyboardType="default"
                  autoCapitalize="none"
                />
              </View>
            </TextFieldHolder>
          </View>
        </View>
        {/* <View style={styles.underlineStyling} /> */}
      </View>
    );
  }

  checkType() {
    const { type } = this.props;
    if (type && type !== '' && type !== undefined) {
      return <View>{this.renderInputField()}</View>;
      // if (type === 'username' || type === 'email') {
      //   return <View>{this.emailField()}</View>;
      // }
      // if (type === 'password' || type === 'confirmPassword') {
      //   return <View>{this.passwordField()}</View>;
      // }
      // if (type === 'number') {
      //   return <View>{this.mobileField()}</View>;
      // }
      // if (type === 'account') {
      //   return <View>{this.accountField()}</View>;
      // }
      // if (type === 'reference') {
      //   return <View>{this.refernceField()}</View>;
      // }
      // if (type === 'name') {
      //   return <View>{this.nameField()}</View>;
      // }
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
