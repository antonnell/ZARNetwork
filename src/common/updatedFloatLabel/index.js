/* eslint-disable */
// libraries
import React, { Component } from 'react';
import { Text, View, TextInput, Animated, TouchableOpacity, Dimensions, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Reference from '../../images/Reference.png';
import Email from '../../images/Email.png';
import Password from '../../images/Password.png';
import Mobile from '../../images/Mobile.png';
import AccountNumber from '../../images/AccountNumber.png';
import Wallet from '../../images/wallet.png';
import ProfileImg from '../../images/ProfileImg.png';
import UserImg from '../../images/User.png';
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
  }

  onChangeTextHandler(value, type) {
    console.log('onChangeTextHandler  ------>  value :', value);
    console.log('onChangeTextHandler  ------>  type :', type);
    const { updateForm } = this.props;
    if (type === 'password') {
      updateForm(value, type);
      this.setState({
        text: value,
        error: '',
      });
    }

    if (type === 'firstname') {
      this.setState({
        text: value,
      });
      updateForm(value, 'firstName');
    }
    if (type === 'lastname') {
      this.setState({
        text: value,
      });
      updateForm(value, 'lastName');
    }
    if (type === 'number') {
      this.setState({
        text: value,
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
      });
      updateForm(value, type);
    }
    if (type === 'username') {
      this.setState({
        text: value,
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
    if (type === 'oldpassword') {
      this.setState({
        text: value,
        error: '',
      });
      updateForm(value, 'oldPassword');
    }
  }

  setFocus() {
    this.setState({
      focused: true,
    });
  }

  // setShowPassword() {
  //   const { showPassword } = this.state;
  //   let passwordIconName = 'visibility-off';
  //   if (!showPassword) {
  //     passwordIconName = 'visibility';
  //   }
  //   this.setState({
  //     passwordIcon: passwordIconName,
  //     showPassword: !showPassword,
  //   });
  // }

  clearState() {
    this.setState({
      text: '',
      error: '',
    });
  }
  // validateValues(value, type) {
  //   const { email, text, accountNumber } = this.state;
  //   if (type === 'email') {
  //     if (email !== '' && email !== undefined) {
  //       if (isEmailValid(email) === false) {
  //         Alert.alert('Error', 'Invalid Email');
  //         validate(type);
  //         this.setState({
  //           text: '',
  //           email: '',
  //         });
  //       }
  //     }
  //   }
  // }

  onBlurTextInput(value, type) {
    console.log('onBlurTextInput  ------>  value :', value);
    console.log('onBlurTextInput  ------>  type :', type);
    const { validateFields, checkEmptyFields } = this.props;
    this.unsetFocus();
    if (type === 'email') {
      if (value === '') {
        // checkEmptyFields(type);
        // this.setState({
        //   text: '',
        // });
      } else {
        validateFields(type);
        this.setState({
          text: '',
        });
      }
    } else if (type === 'firstname' && value === '') {
      checkEmptyFields(type);
      this.setState({
        text: '',
      });
    } else if (type === 'lastname' && value === '') {
      checkEmptyFields(type);
      this.setState({
        text: '',
      });
    } else if (type === 'username' && value === '') {
      this.setState({
        text: '',
      });
    } else if (type === 'confirmPassword') {
      if (value === '') {
        checkEmptyFields(type);
        this.setState({
          text: '',
        });
      } else {
        validateFields(type);
        this.setState({
          text: '',
        });
      }
    } else if (type === 'password' && value === '') {
      checkEmptyFields(type);
      this.setState({
        text: '',
      });
    } else if (type === 'oldpassword' && value === '') {
      checkEmptyFields(type);
      this.setState({
        test: '',
      });
    } else if (type === 'number' && value === '') {
      checkEmptyFields(type);
      this.setState({
        text: '',
      });
    } else if (type === 'reference' && value === '') {
      checkEmptyFields(type);
      this.setState({
        text: '',
      });
    } else if (type === 'account') {
      if (value === '') {
        checkEmptyFields(type);
        this.setState({
          text: '',
        });
      } else {
        validateFields(type);
        this.setState({
          text: '',
        });
      }
    } else if (type === 'name' && value === '') {
      checkEmptyFields(type);
      this.setState({
        text: '',
      });
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
      secureTextEntry: false,
    };
    if (inputType && inputType !== '') {
      if (inputType === 'text' && valueType && valueType !== '') {
        if (valueType === 'password') {
          inputFieldSettings = {
            keyboardType: 'default',
            secureTextEntry: true,
          };
        }
      }
      if (inputType === 'email') {
        inputFieldSettings = {
          keyboardType: 'email-address',
          secureTextEntry: false,
        };
      }
      if (inputType === 'number') {
        inputFieldSettings = {
          keyboardType: 'numeric',
          secureTextEntry: false,
        };
      }
    }
    return inputFieldSettings;
  }

  renderInputField() {
    const { text, passwordIcon, showPassword } = this.state;
    const {
      placeholder,
      autoCorrect,
      inputBackgroundColor,
      textFieldSize,
      defaultValue,
      value,
      type,
      maxLength,
      inputType,
      valueType,
      editable,
      rightTextStyle,
      isShowRightText,
      rightTextValue,
      rightTextValueStyle,
      onPressRightBtn,
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
                  editable={editable}
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
                  onBlur={() => this.onBlurTextInput(text, type)}
                  onChangeText={text => this.onChangeTextHandler(text, type)}
                  placeholderTextColor="grey"
                  keyboardType={inputFieldSettings.keyboardType}
                  secureTextEntry={inputFieldSettings.secureTextEntry}
                  onEndEditing={() => this.onEndEditing(text, type)}
                />
                {isShowRightText && (
                  <TouchableOpacity style={rightTextStyle} onPress={onPressRightBtn}>
                    <Text style={rightTextValueStyle}>{rightTextValue}</Text>
                  </TouchableOpacity>
                )}
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
      // if (type === 'name') {
      //   return (
      //     <View>
      //       <Image
      //         source={ProfileImg}
      //         style={{
      //           height: deviceHeight * 0.025,
      //           width: deviceWidth * 0.1,
      //         }}
      //         resizeMode="contain"
      //       />
      //     </View>
      //   );
      // }
      if (type === 'firstname' || type === 'lastname' || type === 'name') {
        return (
          <View>
            <Image
              source={UserImg}
              style={{
                height: deviceHeight * 0.025,
                width: deviceWidth * 0.1,
              }}
              resizeMode="contain"
            />
          </View>
        );
      }
      if (type === 'password' || type === 'confirmPassword' || type === 'oldpassword') {
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

  checkType() {
    const { type } = this.props;
    if (type && type !== '' && type !== undefined) {
      return <View>{this.renderInputField()}</View>;
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
