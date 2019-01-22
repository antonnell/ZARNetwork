import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import TitleHeader from '../../common/TitleHeader';
import DesignButton from '../../common/Button';
import FantomPayLogo from '../../images/FantomPay.png';
import FloatLabelTextField from '../../common/updatedFloatLabel';
import { isEmailValid, isPasswordValid } from '../../utility/index';
import PasswordConstraints from '../../common/PasswordConstraints';

import {
  deviceWidth,
  deviceHeight,
  invalid,
  valid,
  invalidEmail,
  invalidPassword,
  invalidConfirmPassword,
} from '../../common/constants';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      eightPlusCharacter: false,
      moreThanOneCapital: false,
      moreThanOneLower: false,
      moreThanOneNumber: false,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  updateForm(value, type) {
    if (type === 'password') {
      isPasswordValid(value, (key, updatedState) => {
        this.setState({
          [key]: updatedState,
        });
      });
    }
    this.setState({ [type]: value });
  }

  validateFields(type) {
    const {
      email,
      password,
      confirmPassword,
      eightPlusCharacter,
      moreThanOneCapital,
      moreThanOneLower,
      moreThanOneNumber,
    } = this.state;
    if (type === 'email') {
      if (email !== '' && email !== undefined) {
        if (isEmailValid(email) === false) {
          Alert.alert('Invalid email', invalidEmail);
          this.setState({
            email: '',
          });
          return invalid;
        }
      }
    } else if (type === 'password') {
      if (
        (password && !eightPlusCharacter) ||
        !moreThanOneCapital ||
        !moreThanOneLower ||
        !moreThanOneNumber
      ) {
        Alert.alert('Invalid Password', invalidPassword);
        this.setState({
          password: '',
        });
        return invalid;
      }
    } else if (type === 'confirmPassword') {
      if (password !== '' && confirmPassword !== '' && password !== confirmPassword) {
        Alert.alert('Invalid Password', invalidConfirmPassword);
        this.setState({
          confirmPassword: '',
        });
        return invalid;
      }
    }
    return valid;
  }

  // checkEmptyFields(type) {
  //   const { firstName, lastName, email, password } = this.state;
  //   if (type === 'firstname') {
  //     Alert.alert('Error', 'Enter first name!');
  //   } else if (type === 'lastname') {
  //     if (firstName !== '') {
  //       Alert.alert('Error', 'Enter last name!');
  //     }
  //   } else if (type === 'email') {
  //     if (lastName !== '') {
  //       Alert.alert('Error', 'Enter email!');
  //     }
  //   } else if (type === 'password') {
  //     if (email !== '' && isEmailValid(email)) {
  //       Alert.alert('Error', 'Enter password!');
  //     }
  //   } else if (type === 'confirmPassword') {
  //     if (password !== '') {
  //       Alert.alert('Error', 'Enter confirm password!');
  //     }
  //   }
  // }

  handleGoBack() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.goBack();
    }
  }

  nextBtnPressed() {
    const { navigation } = this.props;
    const { email, password, firstName, confirmPassword, lastName } = this.state;
    if (isEmailValid(email) === false) {
      Alert.alert('Invalid Email', invalidEmail);
      return;
    }
    if (password !== '' && confirmPassword !== '' && password !== confirmPassword) {
      Alert.alert('Invalid Password', invalidConfirmPassword);
      return;
    }
    navigation.navigate('Phone', { firstName, lastName, emailId: email, password });
  }

  render() {
    let isNextBtnClickable = false;
    const { navigation } = this.props;
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      eightPlusCharacter,
      moreThanOneCapital,
      moreThanOneLower,
      moreThanOneNumber,
    } = this.state;
    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      eightPlusCharacter &&
      moreThanOneCapital &&
      moreThanOneLower &&
      moreThanOneNumber
    ) {
      isNextBtnClickable = true;
    }

    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        {/* header */}

        <TitleHeader
          iconName="keyboard-arrow-left"
          title="REGISTER"
          isBackArrow
          onBtnPress={this.handleGoBack}
        />

        <KeyboardAwareScrollView
          style={{
            height: deviceHeight,
            width: deviceWidth,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {/* Fantom Pay icon */}
          <View style={styles.FantomPayLogoContainer}>
            <Image
              source={FantomPayLogo}
              style={styles.FantomPayLogoImageStyle}
              resizeMode="contain"
            />
          </View>

          {/* First Name field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              type="firstName"
              inputType="text"
              valueType="name"
              placeholder="First Name"
              autoCorrect={false}
              value={firstName}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
          </View>
          {/* Last Name field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              type="lastName"
              inputType="text"
              valueType="name"
              placeholder="Last Name"
              autoCorrect={false}
              value={lastName}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
          </View>
          {/* EMAIL field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              type="email"
              inputType="email"
              valueType="email"
              placeholder="Email"
              autoCorrect={false}
              value={email}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
          </View>
          {/* Password field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              type="password"
              inputType="text"
              valueType="password"
              placeholder="Password"
              autoCorrect={false}
              value={password}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
          </View>
          {/* confirm Password field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              type="confirmPassword"
              inputType="text"
              valueType="password"
              placeholder="Confirm Password"
              autoCorrect={false}
              value={confirmPassword}
              passwordValue={password}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
          </View>
          {/* Password Match */}
          <PasswordConstraints
            eightPlusCharacter={eightPlusCharacter}
            moreThanOneCapital={moreThanOneCapital}
            moreThanOneLower={moreThanOneLower}
            moreThanOneNumber={moreThanOneNumber}
          />
          {/* Next button */}
          <View style={{ marginTop: deviceHeight * 0.08 }}>
            <DesignButton
              name="Next"
              callMethod={() => this.nextBtnPressed()}
              isClickable={isNextBtnClickable}
            />
          </View>
          {/* Login text */}
          <View style={styles.loginButtonContainer}>
            <Text style={[styles.textStyle, { color: 'rgb(3,3,3)' }]}>Already registered?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textStyle}> Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: deviceHeight * 0.05 }} />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
Register.defaultProps = {
  navigation: null,
};
Register.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};
