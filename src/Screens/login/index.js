/* eslint-disable no-console */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, AsyncStorage, Image } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import DesignButton from '../../common/Button';
import TitleHeader from '../../common/TitleHeader';
import StartScreenIcon from '../../images/ZARNetwork_Logo.png';
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
      email: 'anton.nell@fantom.foundation',
      password: '123123As',
      isLoading: false,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.inputEmail = React.createRef();
    this.inputPassword = React.createRef();
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    const pushRequestString = await AsyncStorage.getItem('pushRequest');
    if (pushRequestString && pushRequestString != '' && pushRequestString != null) {
      const pushRequest = JSON.parse(pushRequestString);
      this.setState({ pushRequest });
    }
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
        pin: 'dummy',
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
              if (this.state.pushRequest != null) {
                navigation.navigate('Request');
              } else {
                navigation.navigate('Home');
              }
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
          <Image source={StartScreenIcon} style={styles.imageStyle} resizeMode="contain" />

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
              validateFields={type => this.validateFields(type)}
              autoFocus
              ref={this.inputEmail}
              onSubmitEditing={() => this.inputPassword.current.focus()}
              blurOnSubmit={false}
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
              validateFields={type => this.validateFields(type)}
              ref={this.inputPassword}
              onSubmitEditing={() => this.handleUserLogin()}
              blurOnSubmit={false}
            />
          </View>
          <View style={{ marginTop: deviceHeight * 0.02, bottom: 45, width: deviceWidth * 0.7 }}>
            <View style={{ marginTop: deviceHeight * 0.08, marginBottom: deviceHeight * 0.03 }}>
              <DesignButton name="GO" callMethod={this.handleUserLogin} isClickable={isClickable} />
            </View>
            <View
              style={{
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                marginTop: deviceHeight * 0.02,
              }}
            >
              Forgot your password?
            </Text>
            <View style={{ marginTop: deviceHeight * 0.04 }}>
              <DesignButton
                btnTextColor={styles.textBtnTextColor}
                name="REQUEST RESET"
                isClickable
                callMethod={this.handleForgotPassword}
                btnMainStyle={styles.textBtnStyle}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
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
