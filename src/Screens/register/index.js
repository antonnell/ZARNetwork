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
import { verifyUserEmail } from '../../controllers/api/auth';
import Loader from '../../common/Loader';
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
      isLoading: false,
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
    this.setState({
      isLoading: true,
    });
    const payload = {
      email,
    };
    verifyUserEmail(payload)
      .then(response => {
        this.setState({
          isLoading: false,
        });

        if (
          response.payload &&
          response.payload.data &&
          response.payload.data.status &&
          response.payload.data.status === 200
        ) {
          Alert.alert('Error', response.payload.data.result);
          return false;
        }
        if (
          response.error &&
          response.error.response &&
          response.error.response.data &&
          response.error.response.data.status &&
          response.error.response.data.status === 404
        ) {
          navigation.navigate('Phone', { firstName, lastName, emailId: email, password });
          return true;
        }
        return true;
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  /**
   * @method renderLoader : To display loader indicator.
   */
  renderLoader() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader isLoading={isLoading} loaderStyle={0.25} />;
    }
    return null;
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
      isLoading,
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
      moreThanOneNumber &&
      !isLoading
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
          {this.renderLoader()}
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
