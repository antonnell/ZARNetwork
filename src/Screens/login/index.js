/* eslint-disable no-console */
import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import DesignButton from '../../common/Button';
import SignIn from '../../images/SignIn.png';
import FloatLabelTextField from '../../common/FloatLabelTextField';

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
    };
    this.updateForm = this.updateForm.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
  }

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  validate(type) {
    if (type === 'email') {
      this.setState({
        email: '',
      });
    } else if (type === 'password')
      this.setState({
        password: '',
      });
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
    console.log('handleUserLogin clicked');
    const { email, password } = this.state;
    const { navigation } = this.props;

    if (email && email !== '' && password && password !== '') {
      const payload = {
        email,
        password,
      };

      if (login) {
        login(payload)
          .then(result => {
            console.log('result loginUserAction : ', result);
            if (result && result.payload && result.payload.status === 200) {
              console.log('go to home : ');
              navigation.navigate('Home');
            }
          })
          .catch(error => {
            console.log('error loginUserAction : ', error);
          });
      }
    }
  }

  render() {
    const { authDetail, errDetail, navigation } = this.props;
    console.log('authDetail in props : ', authDetail);
    console.log('errDetail in props : ', errDetail);
    const { email, password } = this.state;

    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <View style={{ marginTop: deviceHeight * 0.08 }}>
          <Text style={styles.textStyle}>LOGIN</Text>
        </View>
        <View
          style={{
            marginTop: deviceHeight * 0.1,
          }}
        >
          <Image source={SignIn} style={styles.signInImageStyle} />
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
        <View style={{ marginTop: deviceHeight * 0.08 }}>
          <DesignButton name="Log In" callMethod={this.handleUserLogin} isClickable />
        </View>
        <View style={{ marginTop: deviceHeight * 0.03 }}>
          <Text style={styles.textStyle}>Forgot Password</Text>
        </View>
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
};
/*eslint-disable*/
Login.propTypes = {
  authDetail: PropTypes.object,
  errDetail: PropTypes.object,
  navigation: PropTypes.object,
};
const mapStateToProps = state => ({
  authDetail: state.userAuthReducer.userDetail,
  errDetail: state.errorHandlerReducer,
});

export default connect(mapStateToProps)(Login);
