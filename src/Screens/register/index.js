import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import TitleHeader from '../../common/TitleHeader';
import DesignButton from '../../common/Button';
import StartScreenIcon from '../../images/ZARNetwork_Logo.png';
import FloatLabelTextField from '../../common/updatedFloatLabel';
import { isEmailValid, isPasswordValid } from '../../utility/index';
import PasswordConstraints from '../../common/PasswordConstraints';
import { verifyUserEmail } from '../../controllers/api/auth';
import Loader from '../../common/Loader';
import StatusBar from '../../common/StatusBar';
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
        <StatusBar />
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
          <Image source={StartScreenIcon} style={styles.imageStyle} resizeMode="contain" />

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
              onSubmitEditing={() => this.lastNameInput.focus()}
            />
          </View>
          {/* Last Name field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              ref={input => {
                this.lastNameInput = input;
              }}
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
              onSubmitEditing={() => this.emailInput.focus()}
            />
          </View>
          {/* EMAIL field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              ref={input => {
                this.emailInput = input;
              }}
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
              onSubmitEditing={() => this.passwordInput.focus()}
            />
          </View>
          {/* Password field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              ref={input => {
                this.passwordInput = input;
              }}
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
              onSubmitEditing={() => this.confirmPasswordInput.focus()}
            />
          </View>
          {/* confirm Password field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              ref={input => {
                this.confirmPasswordInput = input;
              }}
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
              onSubmitEditing={() => this.nextBtnPressed()}
            />
          </View>
          {/* Next button */}
          <View style={{ marginTop: deviceHeight * 0.04, width: deviceWidth * 0.7 }}>
            <View>
              <DesignButton
                name="Next"
                callMethod={() => this.nextBtnPressed()}
                isClickable={isNextBtnClickable}
              />
            </View>
            <View
              style={{
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
                marginTop: deviceHeight * 0.02,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                width: deviceWidth * 0.8,
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                marginTop: deviceHeight * 0.02,
                marginBottom: deviceHeight * 0.02,
              }}
            >
              <Text>Ensure your new password is at least:</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> 8 characters</Text>
              <Text> long, combining</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> numbers</Text>
              <Text> with</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> lower and upper case</Text>
              <Text> letters.</Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
        {this.renderLoader()}
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
