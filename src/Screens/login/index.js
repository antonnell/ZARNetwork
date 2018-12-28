/* eslint-disable no-console */
import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import DesignButton from '../../common/Button';
import TitleHeader from '../../common/TitleHeader';
import SignIn from '../../images/SignIn.png';
import FloatLabelTextField from '../../common/FloatLabelTextField';
import Loader from '../../common/Loader';
/**
 * Component to call login api.
 */
import { login } from '../../controllers/api/auth';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

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
  }

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  validate(type) {
    const { email } = this.state;
    if (type === 'email') {
      this.setState({
        email: '',
      });
    } else if (type === 'password' && email === '') {
      Alert.alert('Error', 'Enter Email first');
      this.setState({
        password: '',
      });
    }
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
          .then(result => {
            this.setState({
              isLoading: false,
            });
            if (result && result.payload && result.payload.status === 200) {
              navigation.navigate('TabBarView');
            } else if (
              result &&
              result.error &&
              result.error.response &&
              result.error.response.data &&
              result.error.response.data.message
            ) {
              const { message } = result.error.response.data;
              Alert.alert('Error', message);
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

  /**
   * @method renderLoader : To display loader indicator.
   */
  renderLoader() {
    const { isLoading } = this.state;
    if (isLoading === true) {
      return <Loader isLoading={isLoading} loaderStyle={0.25} />;
    }
    return null;
  }

  render() {
    const { authDetail, errDetail, navigation } = this.props;
    console.log('authDetail in props : ', authDetail);
    console.log('errDetail in props : ', errDetail);
    const { email, password } = this.state;

    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader title="LOGIN" />
        <View
          style={{
            marginTop: deviceHeight * 0.1,
          }}
        >
          <Image source={SignIn} style={styles.signInImageStyle} resizeMode="contain" />
        </View>
        <View style={{ marginTop: deviceHeight * 0.01 }}>
          <Text style={styles.signInTextStyle}>Sign in to continue</Text>
        </View>

        <View style={styles.emailTextFieldStyle}>
          <FloatLabelTextField
            type="email"
            placeholder="Email"
            autoCorrect={false}
            value={email}
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
            value={password}
            updateForm={this.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={deviceWidth * 0.73}
            validate={type => this.validate(type)}
          />
        </View>
        {this.renderLoader()}
        <View style={{ marginTop: deviceHeight * 0.08 }}>
          <DesignButton name="Log In" callMethod={this.handleUserLogin} isClickable />
        </View>
        <TouchableOpacity style={{ marginTop: deviceHeight * 0.03 }}>
          <Text style={styles.textStyle}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTextViewStyle}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.bottomTextStyle}>Sign Up for an account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
Login.defaultProps = {
  authDetail: {},
  errDetail: {},
  navigation: {},
};

Login.propTypes = {
  authDetail: PropTypes.objectOf(PropTypes.any),
  errDetail: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
};
const mapStateToProps = state => ({
  authDetail: state.userAuthReducer.userDetail,
  errDetail: state.errorHandlerReducer,
});

export default connect(mapStateToProps)(Login);
