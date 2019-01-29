/* eslint-disable no-console */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import DesignButton from '../../common/Button';
import TitleHeader from '../../common/TitleHeader';
// import SignIn from '../../images/SignIn.png';
import FantomPayLogo from '../../images/FantomPay.png';
import FloatLabelTextField from '../../common/updatedFloatLabel';
import Loader from '../../common/Loader';
import { isEmailValid } from '../../utility/index';
import { deviceWidth, deviceHeight, invalid, valid, invalidEmail } from '../../common/constants';
import StatusBar from '../../common/StatusBar';
/**
 * Component to call login api.
 */
import { login } from '../../controllers/api/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  validateFields(type) {
    const { email } = this.state;
    if (type === 'email') {
      if (email !== '' && email !== undefined) {
        if (isEmailValid(email) === false) {
          Alert.alert('Invalid Email', invalidEmail);
          this.setState({
            email: '',
          });
          return invalid;
        }
      }
    }
    return valid;
  }

  /**
   * ******************************************************************************
   * @method handleUserLogin : To perform action for user login.
   * ******************************************************************************
   * @method login : To call login api to authenticate user.
   * @param payload : Payload for login .
   * ******************************************************************************
   */
  handleUserLogin() {
    const { email, password } = this.state;
    const { navigation } = this.props;

    if (email && email !== '' && password && password !== '') {
      const payload = {
        email,
        password,
      };
      this.setState({
        isLoading: true,
      });

      if (login) {
        login(payload)
          .then(res => {
            this.setState({
              isLoading: false,
            });
            if (res && res.payload && res.payload.status === 200) {
              navigation.navigate('Home');
            } else if (
              res &&
              res.error &&
              res.error.response &&
              res.error.response.data &&
              res.error.response.data.result
            ) {
              const { result } = res.error.response.data;
              Alert.alert('Error', result);
            }
          })
          .catch(error => {
            this.setState({
              isLoading: false,
            });
            Alert.alert('Error', error);
          });
      }
    }
  }

  handleGoBack() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.goBack();
    }
  }

  /**
   * @method handleForgotPassword : To render forgot password screen.
   */
  handleForgotPassword() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('ResetPassword');
    }
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
    const { navigation } = this.props;

    const { email, password } = this.state;

    let isClickable = false;
    if (email && email !== '' && password && password !== '' && isEmailValid(email) === true) {
      isClickable = true;
    }
    return (
      <View style={styles.Container}>
        <StatusBar />
        <TitleHeader
          title="SIGN IN"
          isBackArrow
          iconName="keyboard-arrow-left"
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
          <View style={styles.fantomPayLogoContainer}>
            <Image
              source={FantomPayLogo}
              style={styles.fantomPayLogoImageStyle}
              resizeMode="contain"
            />
          </View>
          {/* <View style={{ marginTop: deviceHeight * 0.01 }}>
          <Text style={styles.signInTextStyle}>Sign in to continue</Text>
        </View> */}

          <View style={styles.emailTextFieldStyle}>
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

          <View style={styles.passwordTextFieldStyle}>
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

          <View style={{ marginTop: deviceHeight * 0.08 }}>
            <DesignButton
              name="Sign In"
              callMethod={this.handleUserLogin}
              isClickable={isClickable}
            />
          </View>
          <TouchableOpacity
            style={{ marginTop: deviceHeight * 0.03 }}
            onPress={this.handleForgotPassword}
          >
            <Text style={styles.textStyle}>Forgot Password</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <TouchableOpacity
          style={styles.bottomTextViewStyle}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.bottomTextStyle}>Sign Up for an account</Text>
        </TouchableOpacity>

        {this.renderLoader()}
      </View>
    );
  }
}
Login.defaultProps = {
  navigation: null,
};

Login.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

export default Login;
